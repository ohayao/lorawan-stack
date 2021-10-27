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

package version

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/blang/semver"
	"go.thethings.network/lorawan-stack/v3/pkg/errors"
	"go.thethings.network/lorawan-stack/v3/pkg/log"
)

type timestamp struct {
	time.Time
}

// UnmarshalJSON implements the json.Unmarshaler interface.
// Time is expected in RFC3339 or Unix format.
func (t *timestamp) UnmarshalJSON(data []byte) (err error) {
	str := string(data)
	i, err := strconv.ParseInt(str, 10, 64)
	if err == nil {
		t.Time = time.Unix(i, 0)
		if t.Time.Year() > 3000 {
			t.Time = time.Unix(0, i*1e6)
		}
	} else {
		t.Time, err = time.Parse(`"`+time.RFC3339+`"`, str)
	}
	return
}

type release struct {
	TagName     string    `json:"tag_name"`
	PublishedAt timestamp `json:"published_at"`
	Body        string    `json:"body"`
}

var errNoRemote = errors.DefineNotFound("no_remote", "no remote version found at `{url}`")

// latest returns the latest version listed in url, according to semver, expecting an array of release.
// latest skips version strings that cannot be parsed.
// latest returns an error when there are no correct versions.
func latest(ctx context.Context, client *http.Client, url string) (semver.Version, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return semver.Version{}, err
	}
	resp, err := client.Do(req)
	if err != nil {
		return semver.Version{}, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return semver.Version{}, err
	}
	var releases []release
	err = json.Unmarshal(body, &releases)
	if err != nil {
		return semver.Version{}, err
	}
	var maxVersion *semver.Version
	for _, r := range releases {
		versionString := strings.TrimPrefix(r.TagName, "v")
		rv, err := semver.Parse(versionString)
		if err != nil {
			continue
		}
		if maxVersion == nil || rv.GT(*maxVersion) {
			maxVersion = &rv
		}
	}
	if maxVersion == nil {
		return semver.Version{}, errNoRemote.WithAttributes("url", url)
	}
	return *maxVersion, nil
}

// Update is the latest version.
type Update struct {
	Current,
	Latest semver.Version
	DocsURL      string
	Minor, Patch bool
}

type checkOptions struct {
	client  *http.Client
	current semver.Version
	sourceURL,
	docsURL string
}

// CheckOption customizes the version check.
type CheckOption interface {
	apply(*checkOptions)
}

type checkOptionFunc func(*checkOptions)

func (f checkOptionFunc) apply(o *checkOptions) {
	f(o)
}

// WithClient configures a custom HTTP client.
func WithClient(client *http.Client) CheckOption {
	return checkOptionFunc(func(o *checkOptions) {
		o.client = client
	})
}

// WithURLs configures custom URLs for source and documentation.
func WithURLs(sourceURL, docsURL string) CheckOption {
	return checkOptionFunc(func(o *checkOptions) {
		o.sourceURL, o.docsURL = sourceURL, docsURL
	})
}

// WithReference configures a custom reference version.
func WithReference(current semver.Version) CheckOption {
	return checkOptionFunc(func(o *checkOptions) {
		o.current = current
	})
}

// CheckUpdate checks whether there is a version update available.
// If there is no update, this function returns nil.
func CheckUpdate(ctx context.Context, opts ...CheckOption) (*Update, error) {
	current, err := semver.Parse(strings.TrimPrefix(TTN, "v"))
	if err != nil {
		return nil, err
	}
	o := &checkOptions{
		client:    http.DefaultClient,
		current:   current,
		sourceURL: TTSVersionCheckURL,
		docsURL:   TTSUpgradingDocsURL,
	}
	for _, opt := range opts {
		opt.apply(o)
	}
	latest, err := latest(ctx, o.client, o.sourceURL)
	if err != nil {
		return nil, err
	}
	var minor, patch bool
	switch {
	case o.current.Minor < latest.Minor:
		minor = true
	case o.current.Minor > latest.Minor:
		return nil, nil
	case o.current.Patch < latest.Patch:
		patch = true
	default:
		return nil, nil
	}
	return &Update{
		Current: o.current,
		Latest:  latest,
		DocsURL: o.docsURL,
		Minor:   minor,
		Patch:   patch,
	}, nil
}

// LogUpdate logs an Warn level message when there is a newer minor, and a Log level message when there is a newer patch.
// When there is no new minor or patch version, this function does nothing.
func LogUpdate(ctx context.Context, update *Update) {
	if update == nil {
		return
	}
	logger := log.FromContext(ctx).WithFields(log.Fields(
		"current", update.Current,
		"latest", update.Latest,
		"docs_url", update.DocsURL,
	))
	switch {
	case update.Minor:
		logger.Warn("New minor version available")
	case update.Patch:
		logger.Info("New patch version available")
	}
}
