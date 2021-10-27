// Copyright © 2021 The Things Network Foundation, The Things Industries B.V.
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

// Package grpc contains an implementation of the EventsServer, which is used to
// stream all events published for a set of identifiers.
package grpc

import (
	"context"
	"os"
	"time"

	grpc_runtime "github.com/grpc-ecosystem/grpc-gateway/runtime"
	"go.thethings.network/lorawan-stack/v3/pkg/auth/rights"
	"go.thethings.network/lorawan-stack/v3/pkg/auth/rights/rightsutil"
	"go.thethings.network/lorawan-stack/v3/pkg/errors"
	"go.thethings.network/lorawan-stack/v3/pkg/events"
	"go.thethings.network/lorawan-stack/v3/pkg/log"
	"go.thethings.network/lorawan-stack/v3/pkg/rpcmiddleware/warning"
	"go.thethings.network/lorawan-stack/v3/pkg/ttnpb"
	"golang.org/x/sync/errgroup"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

const workersPerCPU = 2

// NewEventsServer returns a new EventsServer on the given PubSub.
func NewEventsServer(ctx context.Context, pubsub events.PubSub) *EventsServer {
	if _, ok := pubsub.(events.Store); ok {
		log.FromContext(ctx).Infof("Events PubSub: %T is also a Store!", pubsub)
	}
	return &EventsServer{
		ctx:    ctx,
		pubsub: pubsub,
	}
}

// EventsServer streams events from a PubSub over gRPC.
type EventsServer struct {
	ctx    context.Context
	pubsub events.PubSub
}

var errNoIdentifiers = errors.DefineInvalidArgument("no_identifiers", "no identifiers")

// Stream implements the EventsServer interface.
func (srv *EventsServer) Stream(req *ttnpb.StreamEventsRequest, stream ttnpb.Events_StreamServer) error {
	if len(req.Identifiers) == 0 {
		return errNoIdentifiers
	}
	ctx := stream.Context()

	if err := rights.RequireAny(ctx, req.Identifiers...); err != nil {
		return err
	}

	ch := make(events.Channel, 8)
	handler := events.ContextHandler(ctx, ch)

	store, hasStore := srv.pubsub.(events.Store)
	var group *errgroup.Group
	if hasStore && (req.Tail > 0 || req.After != nil) {
		group, ctx = errgroup.WithContext(ctx)
		group.Go(func() error {
			return store.SubscribeWithHistory(ctx, nil, req.Identifiers, req.After, int(req.Tail), handler)
		})
	} else {
		if req.Tail > 0 || req.After != nil {
			warning.Add(ctx, "Events storage is not enabled")
		}
		if err := srv.pubsub.Subscribe(ctx, nil, req.Identifiers, handler); err != nil {
			return err
		}
	}

	if err := stream.SendHeader(metadata.MD{}); err != nil {
		return err
	}

	hostname, err := os.Hostname()
	if err != nil {
		return err
	}
	if err := stream.Send(&ttnpb.Event{
		UniqueId:       events.NewCorrelationID(),
		Name:           "events.stream.start",
		Time:           time.Now().UTC(),
		Identifiers:    req.Identifiers,
		Origin:         hostname,
		CorrelationIds: events.CorrelationIDsFromContext(ctx),
	}); err != nil {
		return err
	}

	for {
		select {
		case <-ctx.Done():
			if group != nil {
				return group.Wait()
			}
			return ctx.Err()
		case evt := <-ch:
			isVisible, err := rightsutil.EventIsVisible(ctx, evt)
			if err != nil {
				if err := rights.RequireAny(ctx, req.Identifiers...); err != nil {
					return err
				}
				log.FromContext(ctx).WithError(err).Warn("Failed to check event visibility")
				continue
			}
			if !isVisible {
				continue
			}
			proto, err := events.Proto(evt)
			if err != nil {
				log.FromContext(ctx).WithError(err).Warn("Failed to convert event to proto")
				continue
			}
			if err := stream.Send(proto); err != nil {
				return err
			}
		}
	}
}

var errStorageDisabled = errors.DefineFailedPrecondition("storage_disabled", "events storage is not not enabled")

// FindRelated implements the EventsServer interface.
func (srv *EventsServer) FindRelated(ctx context.Context, req *ttnpb.FindRelatedEventsRequest) (*ttnpb.FindRelatedEventsResponse, error) {
	store, hasStore := srv.pubsub.(events.Store)
	if !hasStore {
		return nil, errStorageDisabled.New()
	}
	_, err := rights.AuthInfo(ctx)
	if err != nil {
		return nil, err
	}

	evts, err := store.FindRelated(ctx, req.GetCorrelationId())
	if err != nil {
		return nil, err
	}

	var res ttnpb.FindRelatedEventsResponse

	for _, evt := range evts {
		evtProto, err := events.Proto(evt)
		if err != nil {
			log.FromContext(ctx).WithError(err).Warn("Failed to convert event to proto")
			continue
		}
		isVisible, err := rightsutil.EventIsVisible(ctx, evt)
		if err != nil {
			log.FromContext(ctx).WithError(err).Warn("Failed to check event visibility")
			continue
		}
		if isVisible {
			res.Events = append(res.Events, evtProto)
		} else {
			res.Events = append(res.Events, &ttnpb.Event{
				Name:        evtProto.Name,
				Time:        evtProto.Time,
				Identifiers: evtProto.Identifiers,
				// Data is private
				// CorrelationIDs is private
				Origin: evtProto.Origin,
				// Context is private
				Visibility: evtProto.Visibility,
				// Authentication is private
				// RemoteIP is private
				// UserAgent is private
				UniqueId: evtProto.UniqueId,
			})
		}
	}
	return &res, nil
}

// Roles implements rpcserver.Registerer.
func (srv *EventsServer) Roles() []ttnpb.ClusterRole {
	return nil
}

// RegisterServices implements rpcserver.Registerer.
func (srv *EventsServer) RegisterServices(s *grpc.Server) {
	ttnpb.RegisterEventsServer(s, srv)
}

// RegisterHandlers implements rpcserver.Registerer.
func (srv *EventsServer) RegisterHandlers(s *grpc_runtime.ServeMux, conn *grpc.ClientConn) {
	ttnpb.RegisterEventsHandler(srv.ctx, s, conn)
}
