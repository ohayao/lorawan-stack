// Copyright © 2020 The Things Network Foundation, The Things Industries B.V.
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

package redis

import (
	"testing"
	"time"

	"go.thethings.network/lorawan-stack/v3/pkg/errors"
	"go.thethings.network/lorawan-stack/v3/pkg/ttnpb"
	"go.thethings.network/lorawan-stack/v3/pkg/types"
	"go.thethings.network/lorawan-stack/v3/pkg/util/test"
	"go.thethings.network/lorawan-stack/v3/pkg/util/test/assertions/should"
)

var Timeout = 10 * test.Delay

func TestRegistry(t *testing.T) {
	_, ctx := test.New(t)
	cl, flush := test.NewRedis(ctx, "redis_test")
	defer flush()
	defer cl.Close()

	ids := ttnpb.GatewayIdentifiers{
		GatewayId: "gtw1",
		Eui:       &types.EUI64{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01},
	}
	ids2 := ttnpb.GatewayIdentifiers{
		GatewayId: "gtw2",
		Eui:       &types.EUI64{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01},
	}
	ids3 := ttnpb.GatewayIdentifiers{
		GatewayId: "gtw3",
		Eui:       &types.EUI64{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02},
	}
	registry := &GatewayConnectionStatsRegistry{
		Redis: cl,
	}

	now := time.Now().UTC()
	initialStats := &ttnpb.GatewayConnectionStats{
		ConnectedAt:            &now,
		Protocol:               "dummy",
		LastDownlinkReceivedAt: &now,
		DownlinkCount:          1,
		LastUplinkReceivedAt:   &now,
		UplinkCount:            1,
	}

	t.Run("GetNonExisting", func(t *testing.T) {
		a, ctx := test.New(t)
		stats, err := registry.Get(ctx, ids)
		a.So(stats, should.BeNil)
		a.So(errors.IsNotFound(err), should.BeTrue)
	})

	t.Run("EmptyStats", func(t *testing.T) {
		a, ctx := test.New(t)
		err := registry.Set(ctx, ids3, nil, []string{})
		a.So(err, should.BeNil)
		retrieved, err := registry.Get(ctx, ids3)
		a.So(retrieved, should.BeNil)
		a.So(errors.IsNotFound(err), should.BeTrue)
	})

	t.Run("SetAndClear", func(t *testing.T) {
		a, ctx := test.New(t)
		err := registry.Set(ctx, ids, initialStats, []string{
			"connected_at",
			"protocol",
			"last_downlink_received_at",
			"downlink_count",
			"last_uplink_received_at",
			"uplink_count",
		})
		a.So(err, should.BeNil)
		retrieved, err := registry.Get(ctx, ids)
		a.So(err, should.BeNil)
		a.So(retrieved, should.Resemble, initialStats)

		// Other gateways not affected
		stats, err := registry.Get(ctx, ids2)
		a.So(stats, should.BeNil)
		a.So(errors.IsNotFound(err), should.BeTrue)

		// Unset
		err = registry.Set(ctx, ids, nil, nil)
		a.So(err, should.BeNil)
		retrieved, err = registry.Get(ctx, ids)
		a.So(errors.IsNotFound(err), should.BeTrue)
		a.So(retrieved, should.BeNil)
	})

	t.Run("ClearManyTimes", func(t *testing.T) {
		a, ctx := test.New(t)
		a.So(registry.Set(ctx, ids, nil, nil), should.BeNil)
		a.So(registry.Set(ctx, ids, nil, nil), should.BeNil)
	})

	t.Run("UpdateFieldMask", func(t *testing.T) {
		a, ctx := test.New(t)

		stats := &ttnpb.GatewayConnectionStats{
			LastUplinkReceivedAt: &now,
			UplinkCount:          1,
			DownlinkCount:        1,
		}

		err := registry.Set(ctx, ids, stats, []string{
			"uplink_count",
			"last_uplink_received_at",
		})
		a.So(err, should.BeNil)
		retrieved, err := registry.Get(ctx, ids)
		a.So(err, should.BeNil)
		a.So(retrieved, should.Resemble, &ttnpb.GatewayConnectionStats{
			LastUplinkReceivedAt: &now,
			UplinkCount:          1,
		})

		// Now update downlink also
		err = registry.Set(ctx, ids, stats, []string{"downlink_count"})
		a.So(err, should.BeNil)
		retrieved, err = registry.Get(ctx, ids)
		a.So(err, should.BeNil)
		a.So(retrieved, should.Resemble, &ttnpb.GatewayConnectionStats{
			LastUplinkReceivedAt: &now,
			UplinkCount:          1,
			DownlinkCount:        1,
		})

		// Unset
		stats.LastUplinkReceivedAt = nil
		stats.UplinkCount = 0
		stats.DownlinkCount = 2
		err = registry.Set(ctx, ids, stats, []string{
			"uplink_count",
			"last_uplink_received_at",
			"downlink_count",
		})
		a.So(err, should.BeNil)
		retrieved, err = registry.Get(ctx, ids)
		a.So(err, should.BeNil)
		a.So(retrieved, should.Resemble, &ttnpb.GatewayConnectionStats{
			DownlinkCount: 2,
		})
	})
}
