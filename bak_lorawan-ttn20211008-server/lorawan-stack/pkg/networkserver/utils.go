// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package networkserver

import (
	"context"
	"fmt"

	"go.thethings.network/lorawan-stack/v3/pkg/band"
	"go.thethings.network/lorawan-stack/v3/pkg/component"
	"go.thethings.network/lorawan-stack/v3/pkg/events"
	"go.thethings.network/lorawan-stack/v3/pkg/log"
	. "go.thethings.network/lorawan-stack/v3/pkg/networkserver/internal"
	"go.thethings.network/lorawan-stack/v3/pkg/networkserver/internal/time"
	"go.thethings.network/lorawan-stack/v3/pkg/networkserver/mac"
	"go.thethings.network/lorawan-stack/v3/pkg/ttnpb"
	"go.thethings.network/lorawan-stack/v3/pkg/unique"
)

// nsScheduleWindow returns minimum time.Duration between downlink being added to the queue and it being sent to GS for transmission.
func nsScheduleWindow() time.Duration {
	// TODO: Observe this value at runtime https://github.com/TheThingsNetwork/lorawan-stack/issues/1552.
	return 200 * time.Millisecond
}

func searchUplinkChannel(freq uint64, macState *ttnpb.MACState) (uint8, error) {
	for i, ch := range macState.CurrentParameters.Channels {
		if ch.UplinkFrequency == freq {
			return uint8(i), nil
		}
	}
	return 0, errUplinkChannelNotFound.WithAttributes("frequency", freq)
}

type downlinkSlot interface {
	From() time.Time
	IsContinuous() bool
}

type classADownlinkSlot struct {
	Uplink  *ttnpb.UplinkMessage
	RxDelay time.Duration
}

func (s classADownlinkSlot) From() time.Time {
	return time.Time{}
}

func (s classADownlinkSlot) RX1() time.Time {
	return s.Uplink.ReceivedAt.Add(s.RxDelay)
}

func (s classADownlinkSlot) RX2() time.Time {
	return s.RX1().Add(time.Second)
}

func (s classADownlinkSlot) IsContinuous() bool {
	return false
}

type networkInitiatedDownlinkSlot struct {
	Time              time.Time
	Class             ttnpb.Class
	IsApplicationTime bool
}

func (s networkInitiatedDownlinkSlot) From() time.Time {
	return s.Time
}

func (s networkInitiatedDownlinkSlot) IsContinuous() bool {
	return !s.IsApplicationTime && s.Class == ttnpb.CLASS_C
}

// lastClassADataDownlinkSlot returns the latest class A downlink slot in current session
// if such exists and true, otherwise it returns nil and false.
func lastClassADataDownlinkSlot(dev *ttnpb.EndDevice, phy *band.Band) (*classADownlinkSlot, bool) {
	if dev.GetMacState() == nil || len(dev.MacState.RecentUplinks) == 0 || dev.Multicast {
		return nil, false
	}
	var rxDelay time.Duration
	up := LastUplink(dev.MacState.RecentUplinks...)
	switch up.Payload.MHDR.MType {
	case ttnpb.MType_CONFIRMED_UP, ttnpb.MType_UNCONFIRMED_UP:
		rxDelay = dev.MacState.CurrentParameters.Rx1Delay.Duration()

	case ttnpb.MType_REJOIN_REQUEST:
		rxDelay = phy.JoinAcceptDelay1

	default:
		return nil, false
	}
	return &classADownlinkSlot{
		RxDelay: rxDelay,
		Uplink:  up,
	}, true
}

// nextUnconfirmedNetworkInitiatedDownlinkAt returns the earliest possible time instant when next unconfirmed
// network-initiated data downlink can be transmitted to the device given the data known by Network Server and true,
// if such time instant exists, otherwise it returns time.Time{} and false.
func nextUnconfirmedNetworkInitiatedDownlinkAt(ctx context.Context, dev *ttnpb.EndDevice, phy *band.Band, defaults ttnpb.MACSettings) (time.Time, bool) {
	switch {
	case dev.GetMacState() == nil:
		log.FromContext(ctx).Warn("Insufficient data to compute next network-initiated unconfirmed downlink slot")
		return time.Time{}, false

	case dev.MacState.DeviceClass == ttnpb.CLASS_A:
		return time.Time{}, false

	case dev.MacState.LastDownlinkAt == nil:
		classA, hasClassA := lastClassADataDownlinkSlot(dev, phy)
		if !hasClassA {
			return time.Time{}, true
		}
		return classA.RX2(), true

	case dev.MacState.LastNetworkInitiatedDownlinkAt == nil:
		classA, hasClassA := lastClassADataDownlinkSlot(dev, phy)
		if !hasClassA {
			return *dev.MacState.LastDownlinkAt, true
		}
		return latestTime(classA.RX2(), *dev.MacState.LastDownlinkAt), true
	}
	classA, hasClassA := lastClassADataDownlinkSlot(dev, phy)
	classBCDownlinkInterval := mac.DeviceClassBCDownlinkInterval(dev, defaults)
	if !hasClassA {
		return dev.MacState.LastNetworkInitiatedDownlinkAt.Add(classBCDownlinkInterval), true
	}
	if classA.Uplink.ReceivedAt.After(*dev.MacState.LastNetworkInitiatedDownlinkAt) {
		return classA.RX2(), true
	}
	return latestTime(classA.RX2(), dev.MacState.LastNetworkInitiatedDownlinkAt.Add(classBCDownlinkInterval)), true
}

// nextConfirmedNetworkInitiatedDownlinkAt returns the earliest possible time instant when a confirmed
// network-initiated data downlink can be transmitted to the device given the data known by Network Server and true,
// if such time instant exists, otherwise it returns time.Time{} and false.
func nextConfirmedNetworkInitiatedDownlinkAt(ctx context.Context, dev *ttnpb.EndDevice, phy *band.Band, defaults ttnpb.MACSettings) (time.Time, bool) {
	if dev.GetMacState() == nil {
		log.FromContext(ctx).Warn("Insufficient data to compute next network-initiated confirmed downlink slot")
		return time.Time{}, false
	}
	if dev.Multicast {
		return time.Time{}, false
	}

	unconfAt, ok := nextUnconfirmedNetworkInitiatedDownlinkAt(ctx, dev, phy, defaults)
	switch {
	case !ok:
		return time.Time{}, false

	case dev.MacState.LastConfirmedDownlinkAt == nil,
		len(dev.MacState.RecentUplinks) > 0 && LastUplink(dev.MacState.RecentUplinks...).ReceivedAt.After(*dev.MacState.LastConfirmedDownlinkAt):
		return unconfAt, true
	}

	var timeout time.Duration
	switch dev.MacState.DeviceClass {
	case ttnpb.CLASS_B:
		timeout = mac.DeviceClassBTimeout(dev, defaults)

	case ttnpb.CLASS_C:
		timeout = mac.DeviceClassCTimeout(dev, defaults)
	default:
		panic(fmt.Errorf("unmatched class: %v", dev.MacState.DeviceClass))
	}
	if t := dev.MacState.LastConfirmedDownlinkAt.Add(timeout); t.After(unconfAt) {
		return t, true
	}
	return unconfAt, true
}

func latestTime(ts ...time.Time) time.Time {
	if len(ts) == 0 {
		return time.Time{}
	}
	max := ts[0]
	for _, t := range ts {
		if t.After(max) {
			max = t
		}
	}
	return max
}

func deviceHasPathForDownlink(ctx context.Context, dev *ttnpb.EndDevice, down *ttnpb.ApplicationDownlink) bool {
	if dev.GetMulticast() || dev.GetMacState() == nil {
		return len(down.GetClassBC().GetGateways()) > 0
	}
	switch dev.MacState.DeviceClass {
	case ttnpb.CLASS_A:
		return down.GetClassBC() == nil && len(downlinkPathsFromRecentUplinks(dev.GetMacState().GetRecentUplinks()...)) > 0
	case ttnpb.CLASS_B, ttnpb.CLASS_C:
		return len(downlinkPathsFromRecentUplinks(dev.GetMacState().GetRecentUplinks()...)) > 0 || len(down.GetClassBC().GetGateways()) > 0
	default:
		panic(fmt.Errorf("unmatched class: %v", dev.MacState.DeviceClass))
	}
}

// nextDataDownlinkSlot returns the next downlinkSlot before or at earliestAt when next data downlink can be transmitted to the device
// given the data known by Network Server and true, if such downlinkSlot and downlink exist, otherwise it returns nil and false.
func nextDataDownlinkSlot(ctx context.Context, dev *ttnpb.EndDevice, phy *band.Band, defaults ttnpb.MACSettings, earliestAt time.Time) (downlinkSlot, bool) {
	if dev.GetMacState() == nil {
		return nil, false
	}
	earliestAt = latestTime(earliestAt, time.Now())
	if dev.MacState.LastDownlinkAt != nil {
		earliestAt = latestTime(earliestAt, *dev.MacState.LastDownlinkAt)
	}
	logger := log.FromContext(ctx).WithField("earliest_at", earliestAt)

	var needsAck bool
	classA, hasClassA := lastClassADataDownlinkSlot(dev, phy)
	if hasClassA {
		switch classA.Uplink.Payload.MHDR.MType {
		case ttnpb.MType_UNCONFIRMED_UP:
			if classA.Uplink.Payload.GetMacPayload().FCtrl.AdrAckReq {
				logger.Debug("Acknowledgment required for ADRAckReq")
				needsAck = dev.MacState.LastDownlinkAt == nil || dev.MacState.LastDownlinkAt.Before(classA.Uplink.ReceivedAt)
			}
		case ttnpb.MType_CONFIRMED_UP:
			logger.Debug("Acknowledgment required for confirmed uplink")
			needsAck = dev.MacState.LastDownlinkAt == nil || dev.MacState.LastDownlinkAt.Before(classA.Uplink.ReceivedAt)
		}
		rx2 := classA.RX2()
		switch hasClassA = dev.MacState.RxWindowsAvailable && !rx2.Before(earliestAt) && deviceHasPathForDownlink(ctx, dev, nil); {
		case !hasClassA:
		case len(dev.MacState.QueuedResponses) > 0:
			logger.Debug("MAC responses enqueued, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsADRParamSetupReq(dev, phy):
			logger.Debug("Device needs ADRParamSetupReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsBeaconFreqReq(dev):
			logger.Debug("Device needs BeaconFreqReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsBeaconTimingReq(dev):
			logger.Debug("Device needs BeaconTimingReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsDevStatusReq(dev, defaults, rx2):
			logger.Debug("Device needs DevStatusReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsDLChannelReq(dev):
			logger.Debug("Device needs DLChannelReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsDutyCycleReq(dev):
			logger.Debug("Device needs DutyCycleReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsLinkADRReq(ctx, dev, phy):
			logger.Debug("Device needs LinkADRReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsNewChannelReq(dev):
			logger.Debug("Device needs NewChannelReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsPingSlotChannelReq(dev):
			logger.Debug("Device needs PingSlotChannelReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsRejoinParamSetupReq(dev):
			logger.Debug("Device needs RejoinParamSetupReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsRxParamSetupReq(dev):
			logger.Debug("Device needs RxParamSetupReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsRxTimingSetupReq(dev):
			logger.Debug("Device needs RxTimingSetupReq, choose class A downlink slot")
			return classA, true
		case mac.DeviceNeedsTxParamSetupReq(dev, phy):
			logger.Debug("Device needs TxParamSetupReq, choose class A downlink slot")
			return classA, true
		}
	}

	nwkUnconf, hasNwkUnconf := nextUnconfirmedNetworkInitiatedDownlinkAt(ctx, dev, phy, defaults)
	if hasNwkUnconf && dev.MacState.DeviceClass == ttnpb.CLASS_B {
		nwkUnconf, hasNwkUnconf = mac.NextPingSlotAt(ctx, dev, latestTime(nwkUnconf, earliestAt))
	}

	nwkConf, hasNwkConf := nextConfirmedNetworkInitiatedDownlinkAt(ctx, dev, phy, defaults)
	if hasNwkConf {
		nwkConf = latestTime(nwkConf, nwkUnconf)
	}
	if hasNwkConf && dev.MacState.DeviceClass == ttnpb.CLASS_B {
		nwkConf, hasNwkConf = mac.NextPingSlotAt(ctx, dev, latestTime(nwkConf, earliestAt))
	}

	if !hasClassA && !hasNwkUnconf && !hasNwkConf {
		logger.Debug("No downlink slot available, skip downlink slot")
		return nil, false
	}
	if needsAck && deviceHasPathForDownlink(ctx, dev, nil) {
		switch {
		case hasClassA:
			return classA, true
		case hasNwkUnconf:
			return &networkInitiatedDownlinkSlot{
				Time:  nwkUnconf,
				Class: dev.MacState.DeviceClass,
			}, true
		case hasNwkConf:
			return &networkInitiatedDownlinkSlot{
				Time:  nwkConf,
				Class: dev.MacState.DeviceClass,
			}, true
		}
	}
	for _, down := range dev.GetSession().GetQueuedApplicationDownlinks() {
		if !deviceHasPathForDownlink(ctx, dev, down) {
			logger.Debug("Skip downlink, for which no path is available")
			continue
		}
		// NOTE: In case at time t, where t is before earliestConfirmedAt, device requires MAC requests,
		// Network Server will have to wait until earliestConfirmedAt, since MAC commands have priority.
		switch absTime := down.GetClassBC().GetAbsoluteTime(); {
		case absTime == nil:
			switch {
			case hasClassA && down.ClassBC == nil:
				logger.Debug("Non-constrained application downlink, choose class A downlink slot")
				return classA, true

			case hasNwkUnconf &&
				!down.Confirmed:
				logger.Debug("Application downlink with no absolute time, choose unconfirmed network-initiated downlink slot")
				return &networkInitiatedDownlinkSlot{
					Time:  nwkUnconf,
					Class: dev.MacState.DeviceClass,
				}, true
			case hasNwkConf:
				return &networkInitiatedDownlinkSlot{
					Time:  nwkConf,
					Class: dev.MacState.DeviceClass,
				}, true

			default:
				logger.Debug("Skip application with no absolute time and no available downlink slot")
				continue
			}

		case absTime.Before(earliestAt):
			logger.WithField("absolute_time", absTime).Debug("Skip application downlink with expired absolute time")
			continue

		case hasNwkUnconf && !down.Confirmed && !absTime.Before(nwkUnconf),
			hasNwkConf && !absTime.Before(nwkConf):
			logger.WithField("absolute_time", absTime).Debug("Application downlink with absolute time, choose absolute time downlink slot")
			return &networkInitiatedDownlinkSlot{
				Time:              absTime.UTC(),
				Class:             dev.MacState.DeviceClass,
				IsApplicationTime: true,
			}, true

		default:
			logger.WithField("absolute_time", absTime).Debug("Skip application with absolute time and no available downlink slot")
			continue
		}
	}
	logger.Debug("No available downlink to send, skip downlink slot")
	return nil, false
}

func publishEvents(ctx context.Context, evs ...events.Event) {
	n := len(evs)
	if n == 0 {
		return
	}
	log.FromContext(ctx).WithField("event_count", n).Debug("Publish events")
	events.Publish(evs...)
}

func (ns *NetworkServer) enqueueApplicationUplinks(ctx context.Context, ups ...*ttnpb.ApplicationUp) {
	n := len(ups)
	if n == 0 {
		return
	}

	enqueue := func(ctx context.Context, ups ...*ttnpb.ApplicationUp) {
		log.FromContext(ctx).Debug("Enqueue application uplinks for sending to Application Server")
		if err := ns.applicationUplinks.Add(ctx, ups...); err != nil {
			log.FromContext(ctx).WithError(err).Warn("Failed to enqueue application uplinks for sending to Application Server")
		}
	}

	send := func(ctx context.Context, appID ttnpb.ApplicationIdentifiers, ups ...*ttnpb.ApplicationUp) error {
		conn, err := ns.GetPeerConn(ctx, ttnpb.ClusterRole_APPLICATION_SERVER, &appID)
		if err != nil {
			log.FromContext(ctx).WithError(err).Warn("Failed to get Application Server peer")
			return err
		}
		if err := ns.sendApplicationUplinks(ctx, ttnpb.NewNsAsClient(conn), appID, ups...); err != nil {
			return err
		}
		return nil
	}

	partitionAndSend := func(ctx context.Context) error {
		registerUplinkSenderStarted()
		defer registerUplinkSenderFinished()

		m := make(map[string][]*ttnpb.ApplicationUp)
		for _, up := range ups {
			appID := up.ApplicationIdentifiers.ApplicationId
			m[appID] = append(m[appID], up)
		}
		for id, ups := range m {
			appID := ttnpb.ApplicationIdentifiers{
				ApplicationId: id,
			}
			ctx := log.NewContextWithFields(ctx, log.Fields(
				"application_uid", unique.ID(ctx, appID),
				"uplink_count", len(ups),
			))
			if err := send(ctx, appID, ups...); err != nil {
				log.FromContext(ctx).WithError(err).Warn("Failed to send application uplinks to Application Server")
				enqueue(ctx, ups...)
			}
		}
		return nil
	}

	if !ns.uplinkQueueSemaphore.TryAcquire(1) {
		enqueue(ctx, ups...)
		return
	}

	ns.StartTask(&component.TaskConfig{
		Context: ns.FromRequestContext(ctx),
		ID:      sendApplicationUplinkTaskName,
		Func:    partitionAndSend,
		Done:    func() { ns.uplinkQueueSemaphore.Release(1) },
		Restart: component.TaskRestartNever,
		Backoff: component.DialTaskBackoffConfig,
	})
}
