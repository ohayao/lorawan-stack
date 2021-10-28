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

package commands

import (
	"fmt"
	"sort"
	"strings"

	pbtypes "github.com/gogo/protobuf/types"
	"github.com/spf13/pflag"
	"go.thethings.network/lorawan-stack/v3/cmd/ttn-lw-cli/internal/util"
	"go.thethings.network/lorawan-stack/v3/pkg/ttnpb"
)

var applicationUpFlags = util.FieldMaskFlags(&ttnpb.ApplicationUp{})

func getStoredUpFlags() *pflag.FlagSet {
	flags := &pflag.FlagSet{}

	flags.Bool("stream-output", false, "print output as JSON stream")

	flags.Uint32("f-port", 0, "query upstream messages with specific FPort")
	flags.String("order", "", "order results (received_at|-received_at)")
	flags.Uint32("limit", 0, "limit number of upstream messages to fetch")
	flags.AddFlagSet(timestampFlags("after", "query upstream messages after specified timestamp"))
	flags.AddFlagSet(timestampFlags("before", "query upstream messages before specified timestamp"))
	flags.Duration("last", 0, "query upstream messages in the last hours or minutes")

	flags.AddFlagSet(applicationUpFlags)

	types := make([]string, 0, len(ttnpb.StoredApplicationUpTypes))
	for k := range ttnpb.StoredApplicationUpTypes {
		types = append(types, k)
	}
	sort.Strings(types)
	flags.String("type", "", fmt.Sprintf("message type (allowed values: %s)", strings.Join(types, ", ")))

	return flags
}

func getStoredUpRequest(flags *pflag.FlagSet) (*ttnpb.GetStoredApplicationUpRequest, error) {
	before, after, last, err := timeRangeFromFlags(flags)
	if err != nil {
		return nil, err
	}
	req := &ttnpb.GetStoredApplicationUpRequest{
		Before: before,
		After:  after,
		Last:   last,
	}

	req.Order, _ = flags.GetString("order")
	req.Type, _ = flags.GetString("type")

	if flags.Changed("f-port") {
		fport, _ := flags.GetUint32("f-port")
		req.FPort = &pbtypes.UInt32Value{
			Value: fport,
		}
	}
	req.FieldMask = &pbtypes.FieldMask{
		Paths: ttnpb.AllowedFields(
			util.SelectFieldMask(flags, applicationUpFlags),
			ttnpb.RPCFieldMaskPaths["/ttn.lorawan.v3.ApplicationUpStorage/GetStoredApplicationUp"].Allowed,
		),
	}

	if flags.Changed("limit") {
		limit, _ := flags.GetUint32("limit")
		req.Limit = &pbtypes.UInt32Value{
			Value: limit,
		}
	}
	return req, nil
}

func countStoredUpFlags() *pflag.FlagSet {
	flags := &pflag.FlagSet{}

	flags.Uint32("f-port", 0, "query upstream messages with specific FPort")
	flags.AddFlagSet(timestampFlags("after", "query upstream messages after specified timestamp"))
	flags.AddFlagSet(timestampFlags("before", "query upstream messages before specified timestamp"))
	flags.Duration("last", 0, "query upstream messages in the last hours or minutes")

	types := make([]string, 0, len(ttnpb.StoredApplicationUpTypes))
	for k := range ttnpb.StoredApplicationUpTypes {
		types = append(types, k)
	}
	sort.Strings(types)
	flags.String("type", "", fmt.Sprintf("message type (allowed values: %s)", strings.Join(types, ", ")))

	return flags
}

func countStoredUpRequest(flags *pflag.FlagSet) (*ttnpb.GetStoredApplicationUpCountRequest, error) {
	before, after, last, err := timeRangeFromFlags(flags)
	if err != nil {
		return nil, err
	}
	req := &ttnpb.GetStoredApplicationUpCountRequest{
		Before: before,
		After:  after,
		Last:   last,
	}
	if flags.Changed("f-port") {
		fport, _ := flags.GetUint32("f-port")
		req.FPort = &pbtypes.UInt32Value{
			Value: fport,
		}
	}
	req.Type, _ = flags.GetString("type")

	return req, nil
}

func timeRangeFromFlags(flags *pflag.FlagSet) (beforePB *pbtypes.Timestamp, afterPB *pbtypes.Timestamp, lastPB *pbtypes.Duration, err error) {
	if flags.Changed("last") && (hasTimestampFlags(flags, "after") || hasTimestampFlags(flags, "before")) {
		return nil, nil, nil, fmt.Errorf("--last cannot be used with --after or --before flags")
	}
	after, err := getTimestampFlags(flags, "after")
	if err != nil {
		return nil, nil, nil, err
	}
	if after != nil {
		if afterPB, err = pbtypes.TimestampProto(*after); err != nil {
			return nil, nil, nil, err
		}
	}
	before, err := getTimestampFlags(flags, "before")
	if err != nil {
		return nil, nil, nil, err
	}
	if before != nil {
		if beforePB, err = pbtypes.TimestampProto(*before); err != nil {
			return nil, nil, nil, err
		}
	}

	if flags.Changed("last") {
		d, err := flags.GetDuration("last")
		if err != nil {
			return nil, nil, nil, err
		}
		lastPB = pbtypes.DurationProto(d)
	}
	return
}
