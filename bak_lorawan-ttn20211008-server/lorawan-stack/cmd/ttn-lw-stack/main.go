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

// ttn-lw-stack is the binary that runs the entire The Things Stack for LoRaWAN.
package main

import (
	"os"

	"go.thethings.network/lorawan-stack/v3/cmd/internal/errors"
	"go.thethings.network/lorawan-stack/v3/cmd/ttn-lw-stack/commands"
)

func main() {
	cmd, err := commands.Root.ExecuteC()
	if err != nil {
		errors.PrintStack(os.Stderr, err)
		os.Exit(-1)
	}
	if cmd.Run == nil && cmd.RunE == nil {
		os.Exit(2)
	}
}
