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

package types

import (
	"encoding/hex"
	"strings"

	"go.thethings.network/lorawan-stack/v3/pkg/errors"
)

var errInvalidJoinNonce = errors.DefineInvalidArgument("invalid_join_nonce", "invalid JoinNonce")

// JoinNonce is Join Server nonce used in the join procedure.
// - If LoRaWAN version <1.1 - it is randomly generated.
// - If LoRaWAN version >=1.1 - it is a scrictly increasing counter.
type JoinNonce [3]byte

// IsZero returns true iff the type is zero.
func (jn JoinNonce) IsZero() bool { return jn == [3]byte{} }

// String implements the Stringer interface.
func (jn JoinNonce) String() string { return strings.ToUpper(hex.EncodeToString(jn[:])) }

// GoString implements the GoStringer interface.
func (jn JoinNonce) GoString() string { return jn.String() }

// Size implements the Sizer interface.
func (jn JoinNonce) Size() int { return 3 }

// Equal returns true iff nonces are equal.
func (jn JoinNonce) Equal(other JoinNonce) bool { return jn == other }

// Marshal implements the proto.Marshaler interface.
func (jn JoinNonce) Marshal() ([]byte, error) { return jn.MarshalBinary() }

// MarshalTo implements the MarshalerTo function required by generated protobuf.
func (jn JoinNonce) MarshalTo(data []byte) (int, error) { return marshalBinaryBytesTo(data, jn[:]) }

// Unmarshal implements the proto.Unmarshaler interface.
func (jn *JoinNonce) Unmarshal(data []byte) error { return jn.UnmarshalBinary(data) }

// MarshalJSON implements the json.Marshaler interface.
func (jn JoinNonce) MarshalJSON() ([]byte, error) { return marshalJSONHexBytes(jn[:]) }

// UnmarshalJSON implements the json.Unmarshaler interface.
func (jn *JoinNonce) UnmarshalJSON(data []byte) error {
	*jn = [3]byte{}
	if err := unmarshalJSONHexBytes(jn[:], data); err != nil {
		return errInvalidJoinNonce.WithCause(err)
	}
	return nil
}

// MarshalBinary implements the encoding.BinaryMarshaler interface.
func (jn JoinNonce) MarshalBinary() ([]byte, error) { return marshalBinaryBytes(jn[:]) }

// UnmarshalBinary implements the encoding.BinaryUnmarshaler interface.
func (jn *JoinNonce) UnmarshalBinary(data []byte) error {
	*jn = [3]byte{}
	if err := unmarshalBinaryBytes(jn[:], data); err != nil {
		return errInvalidJoinNonce.WithCause(err)
	}
	return nil
}

// MarshalText implements the encoding.TextMarshaler interface.
func (jn JoinNonce) MarshalText() ([]byte, error) { return marshalTextBytes(jn[:]) }

// UnmarshalText implements the encoding.TextUnmarshaler interface.
func (jn *JoinNonce) UnmarshalText(data []byte) error {
	*jn = [3]byte{}
	if err := unmarshalTextBytes(jn[:], data); err != nil {
		return errInvalidJoinNonce.WithCause(err)
	}
	return nil
}
