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

	pbtypes "github.com/gogo/protobuf/types"
	"go.thethings.network/lorawan-stack/v3/pkg/encoding/lorawan"
	. "go.thethings.network/lorawan-stack/v3/pkg/networkserver/internal"
	"go.thethings.network/lorawan-stack/v3/pkg/networkserver/mac"
	"go.thethings.network/lorawan-stack/v3/pkg/ttnpb"
)

// GenerateDevAddr returns a device address assignment in the device address
// range of the network server.
func (ns *NetworkServer) GenerateDevAddr(ctx context.Context, req *pbtypes.Empty) (*ttnpb.GenerateDevAddrResponse, error) {
	devAddr := ns.newDevAddr(ctx, nil)
	return &ttnpb.GenerateDevAddrResponse{DevAddr: &devAddr}, nil
}

func (ns *NetworkServer) GetDefaultMACSettings(ctx context.Context, req *ttnpb.GetDefaultMACSettingsRequest) (*ttnpb.MACSettings, error) {
	fp, phy, err := FrequencyPlanAndBand(req.FrequencyPlanId, req.LorawanPhyVersion, ns.FrequencyPlans)
	if err != nil {
		return nil, err
	}
	classBTimeout := mac.DeviceClassBTimeout(nil, ns.defaultMACSettings)
	classCTimeout := mac.DeviceClassCTimeout(nil, ns.defaultMACSettings)
	adrMargin := mac.DeviceADRMargin(nil, ns.defaultMACSettings)
	statusTimePeriodicity := mac.DeviceStatusTimePeriodicity(nil, ns.defaultMACSettings)
	statusCountPeriodicity := mac.DeviceStatusCountPeriodicity(nil, ns.defaultMACSettings)
	settings := &ttnpb.MACSettings{
		ClassBTimeout:                &classBTimeout,
		PingSlotPeriodicity:          mac.DeviceDefaultPingSlotPeriodicity(nil, ns.defaultMACSettings),
		PingSlotDataRateIndex:        mac.DeviceDefaultPingSlotDataRateIndexValue(nil, phy, ns.defaultMACSettings),
		PingSlotFrequency:            &ttnpb.FrequencyValue{Value: mac.DeviceDefaultPingSlotFrequency(nil, phy, ns.defaultMACSettings)},
		BeaconFrequency:              ns.defaultMACSettings.GetBeaconFrequency(),
		ClassCTimeout:                &classCTimeout,
		Rx1Delay:                     &ttnpb.RxDelayValue{Value: mac.DeviceDefaultRX1Delay(nil, phy, ns.defaultMACSettings)},
		Rx1DataRateOffset:            &ttnpb.DataRateOffsetValue{Value: mac.DeviceDefaultRX1DataRateOffset(nil, ns.defaultMACSettings)},
		Rx2DataRateIndex:             &ttnpb.DataRateIndexValue{Value: mac.DeviceDefaultRX2DataRateIndex(nil, phy, ns.defaultMACSettings)},
		Rx2Frequency:                 &ttnpb.FrequencyValue{Value: mac.DeviceDefaultRX2Frequency(nil, phy, ns.defaultMACSettings)},
		MaxDutyCycle:                 &ttnpb.AggregatedDutyCycleValue{Value: mac.DeviceDefaultMaxDutyCycle(nil, ns.defaultMACSettings)},
		Supports_32BitFCnt:           &ttnpb.BoolValue{Value: mac.DeviceSupports32BitFCnt(nil, ns.defaultMACSettings)},
		UseAdr:                       &ttnpb.BoolValue{Value: mac.DeviceUseADR(nil, ns.defaultMACSettings, phy)},
		AdrMargin:                    &pbtypes.FloatValue{Value: adrMargin},
		ResetsFCnt:                   &ttnpb.BoolValue{Value: mac.DeviceResetsFCnt(nil, ns.defaultMACSettings)},
		StatusTimePeriodicity:        &statusTimePeriodicity,
		StatusCountPeriodicity:       &pbtypes.UInt32Value{Value: statusCountPeriodicity},
		DesiredRx1Delay:              &ttnpb.RxDelayValue{Value: mac.DeviceDesiredRX1Delay(nil, phy, ns.defaultMACSettings)},
		DesiredRx1DataRateOffset:     &ttnpb.DataRateOffsetValue{Value: mac.DeviceDesiredRX1DataRateOffset(nil, ns.defaultMACSettings)},
		DesiredRx2DataRateIndex:      &ttnpb.DataRateIndexValue{Value: mac.DeviceDesiredRX2DataRateIndex(nil, phy, fp, ns.defaultMACSettings)},
		DesiredRx2Frequency:          &ttnpb.FrequencyValue{Value: mac.DeviceDesiredRX2Frequency(nil, phy, fp, ns.defaultMACSettings)},
		DesiredMaxDutyCycle:          &ttnpb.AggregatedDutyCycleValue{Value: mac.DeviceDesiredMaxDutyCycle(nil, ns.defaultMACSettings)},
		DesiredAdrAckLimitExponent:   mac.DeviceDesiredADRAckLimitExponent(nil, phy, ns.defaultMACSettings),
		DesiredAdrAckDelayExponent:   mac.DeviceDesiredADRAckDelayExponent(nil, phy, ns.defaultMACSettings),
		DesiredPingSlotDataRateIndex: mac.DeviceDesiredPingSlotDataRateIndexValue(nil, phy, fp, ns.defaultMACSettings),
		DesiredPingSlotFrequency:     &ttnpb.FrequencyValue{Value: mac.DeviceDesiredPingSlotFrequency(nil, phy, fp, ns.defaultMACSettings)},
		DesiredBeaconFrequency:       ns.defaultMACSettings.GetBeaconFrequency(),
		DesiredMaxEirp:               &ttnpb.DeviceEIRPValue{Value: lorawan.Float32ToDeviceEIRP(mac.DeviceDesiredMaxEIRP(nil, phy, fp, ns.defaultMACSettings))},
	}
	return settings, nil
}
