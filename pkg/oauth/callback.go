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

package oauth

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	echo "github.com/labstack/echo/v4"
)

func (s *server) redirectToLocal(c echo.Context) error {
	port, err := strconv.Atoi(c.QueryParam("port"))
	if err != nil {
		port = 11885
	}

	params := make(url.Values)
	for k, v := range c.QueryParams() {
		params[k] = v
	}
	delete(params, "port")

	url := url.URL{
		Scheme:   "http",
		Host:     fmt.Sprintf("192.168.1.82:%d", port),
		Path:     "/oauth/callback",
		RawQuery: params.Encode(),
	}

	return c.Redirect(http.StatusFound, url.String())
}
