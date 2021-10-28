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

package identityserver

import (
	"testing"

	pbtypes "github.com/gogo/protobuf/types"
	"github.com/smartystreets/assertions"
	"github.com/smartystreets/assertions/should"
	"go.thethings.network/lorawan-stack/v3/pkg/errors"
	"go.thethings.network/lorawan-stack/v3/pkg/ttnpb"
	"go.thethings.network/lorawan-stack/v3/pkg/util/test"
	"google.golang.org/grpc"
)

func init() {
	gatewayAccessUser.Admin = false
	gatewayAccessUser.State = ttnpb.STATE_APPROVED
	for _, apiKey := range userAPIKeys(&gatewayAccessUser.UserIdentifiers).ApiKeys {
		apiKey.Rights = []ttnpb.Right{
			ttnpb.RIGHT_GATEWAY_LINK,
			ttnpb.RIGHT_GATEWAY_SETTINGS_API_KEYS,
			ttnpb.RIGHT_GATEWAY_SETTINGS_COLLABORATORS,
		}
	}
	gtwAccessCollaboratorUser.Admin = false
	gtwAccessCollaboratorUser.State = ttnpb.STATE_APPROVED
	for _, apiKey := range userAPIKeys(&gtwAccessCollaboratorUser.UserIdentifiers).ApiKeys {
		apiKey.Rights = []ttnpb.Right{
			ttnpb.RIGHT_GATEWAY_ALL,
		}
	}
	userGateways(&defaultUser.UserIdentifiers).Gateways[0].StatusPublic = false
	userGateways(&defaultUser.UserIdentifiers).Gateways[0].LocationPublic = false
}

func TestGatewayAccessNotFound(t *testing.T) {
	a := assertions.New(t)
	ctx := test.Context()

	testWithIdentityServer(t, func(is *IdentityServer, cc *grpc.ClientConn) {
		userID, creds := defaultUser.UserIdentifiers, userCreds(defaultUserIdx)
		gatewayID := userGateways(&userID).Gateways[0].GatewayIdentifiers

		reg := ttnpb.NewGatewayAccessClient(cc)

		apiKey := ttnpb.APIKey{
			Id:   "does-not-exist-id",
			Name: "test-gateway-api-key-name",
		}

		got, err := reg.GetAPIKey(ctx, &ttnpb.GetGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			KeyId:              apiKey.Id,
		}, creds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsNotFound(err), should.BeTrue)
		}
		a.So(got, should.BeNil)

		updated, err := reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey:             apiKey,
			FieldMask:          &pbtypes.FieldMask{Paths: []string{"name"}},
		}, creds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsNotFound(err), should.BeTrue)
		}
		a.So(updated, should.BeNil)
	})
}

func TestGatewayAccessRightsPermissionDenied(t *testing.T) {
	a := assertions.New(t)
	ctx := test.Context()

	testWithIdentityServer(t, func(is *IdentityServer, cc *grpc.ClientConn) {
		userID, creds := gatewayAccessUser.UserIdentifiers, userCreds(gatewayAccessUserIdx)
		gatewayID := userGateways(&userID).Gateways[0].GatewayIdentifiers
		collaboratorID := collaboratorUser.UserIdentifiers.OrganizationOrUserIdentifiers()

		reg := ttnpb.NewGatewayAccessClient(cc)

		APIKeyName := "test-gateway-api-key-name"
		APIKey, err := reg.CreateAPIKey(ctx, &ttnpb.CreateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			Name:               APIKeyName,
			Rights:             []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
		}, creds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
		a.So(APIKey, should.BeNil)

		// Choose right that the user does not have and hence cannot add
		right := ttnpb.RIGHT_GATEWAY_SETTINGS_BASIC
		APIKey = gatewayAPIKeys(&gatewayID).ApiKeys[0]

		updated, err := reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey: ttnpb.APIKey{
				Id:     APIKey.Id,
				Name:   APIKey.Name,
				Rights: []ttnpb.Right{right},
			},
			FieldMask: &pbtypes.FieldMask{Paths: []string{"rights", "name"}},
		}, creds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
		a.So(updated, should.BeNil)

		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *collaboratorID,
				Rights:                        []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
			},
		}, creds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
	})
}

func TestGatewayAccessPermissionDenied(t *testing.T) {
	a := assertions.New(t)
	ctx := test.Context()

	testWithIdentityServer(t, func(is *IdentityServer, cc *grpc.ClientConn) {
		userID := defaultUser.UserIdentifiers
		gatewayID := userGateways(&userID).Gateways[0].GatewayIdentifiers
		collaboratorID := collaboratorUser.UserIdentifiers.OrganizationOrUserIdentifiers()
		APIKeyID := gatewayAPIKeys(&gatewayID).ApiKeys[0].Id

		reg := ttnpb.NewGatewayAccessClient(cc)

		rights, err := reg.ListRights(ctx, &gatewayID)

		a.So(err, should.BeNil)
		if a.So(rights, should.NotBeNil) {
			a.So(rights.Rights, should.BeEmpty)
		}

		APIKey, err := reg.GetAPIKey(ctx, &ttnpb.GetGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			KeyId:              APIKeyID,
		})

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
		a.So(APIKey, should.BeNil)

		APIKeys, err := reg.ListAPIKeys(ctx, &ttnpb.ListGatewayAPIKeysRequest{
			GatewayIdentifiers: gatewayID,
		})

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
		a.So(APIKeys, should.BeNil)

		collaborators, err := reg.ListCollaborators(ctx, &ttnpb.ListGatewayCollaboratorsRequest{
			GatewayIdentifiers: gatewayID,
		})

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsUnauthenticated(err), should.BeTrue)
		}
		a.So(collaborators, should.BeNil)

		APIKeyName := "test-gateway-api-key-name"
		APIKey, err = reg.CreateAPIKey(ctx, &ttnpb.CreateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			Name:               APIKeyName,
			Rights:             []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
		})

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
		a.So(APIKey, should.BeNil)

		APIKey = gatewayAPIKeys(&gatewayID).ApiKeys[0]

		updated, err := reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey:             *APIKey,
			FieldMask:          &pbtypes.FieldMask{Paths: []string{"rights", "name"}},
		})

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
		a.So(updated, should.BeNil)

		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *collaboratorID,
				Rights:                        []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
			},
		})

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}
	})
}

func TestGatewayAccessClusterAuth(t *testing.T) {
	a := assertions.New(t)
	ctx := test.Context()

	testWithIdentityServer(t, func(is *IdentityServer, cc *grpc.ClientConn) {
		userID := defaultUser.UserIdentifiers
		gatewayID := userGateways(&userID).Gateways[0].GatewayIdentifiers

		reg := ttnpb.NewGatewayAccessClient(cc)

		rights, err := reg.ListRights(ctx, &gatewayID, is.WithClusterAuth())

		a.So(err, should.BeNil)
		if a.So(rights, should.NotBeNil) {
			a.So(ttnpb.AllClusterRights.Intersect(ttnpb.AllGatewayRights).Sub(rights).Rights, should.BeEmpty)
		}
	})
}

func TestGatewayAccessCRUD(t *testing.T) {
	a := assertions.New(t)
	ctx := test.Context()

	testWithIdentityServer(t, func(is *IdentityServer, cc *grpc.ClientConn) {
		userID, creds := defaultUser.UserIdentifiers, userCreds(defaultUserIdx)
		gatewayID := userGateways(&userID).Gateways[0].GatewayIdentifiers
		collaboratorID := collaboratorUser.UserIdentifiers.OrganizationOrUserIdentifiers()

		reg := ttnpb.NewGatewayAccessClient(cc)

		rights, err := reg.ListRights(ctx, &gatewayID, creds)

		a.So(err, should.BeNil)
		if a.So(rights, should.NotBeNil) {
			a.So(rights.Rights, should.Contain, ttnpb.RIGHT_GATEWAY_ALL)
		}

		modifiedGatewayID := gatewayID
		modifiedGatewayID.GatewayId = reverse(modifiedGatewayID.GatewayId)

		rights, err = reg.ListRights(ctx, &modifiedGatewayID, creds)

		a.So(err, should.BeNil)
		if a.So(rights, should.NotBeNil) {
			a.So(rights.Rights, should.BeEmpty)
		}

		gatewayAPIKeys := gatewayAPIKeys(&gatewayID)
		gatewayKey := gatewayAPIKeys.ApiKeys[0]

		APIKey, err := reg.GetAPIKey(ctx, &ttnpb.GetGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			KeyId:              gatewayKey.Id,
		}, creds)

		a.So(err, should.BeNil)
		if a.So(APIKey, should.NotBeNil) {
			a.So(APIKey.Id, should.Equal, gatewayKey.Id)
			a.So(APIKey.Key, should.BeEmpty)
		}

		APIKeys, err := reg.ListAPIKeys(ctx, &ttnpb.ListGatewayAPIKeysRequest{
			GatewayIdentifiers: gatewayID,
		}, creds)

		a.So(err, should.BeNil)
		if a.So(APIKeys, should.NotBeNil) {
			a.So(len(APIKeys.ApiKeys), should.Equal, len(gatewayAPIKeys.ApiKeys))
			for i, APIkey := range APIKeys.ApiKeys {
				a.So(APIkey.Name, should.Equal, gatewayAPIKeys.ApiKeys[i].Name)
				a.So(APIkey.Id, should.Equal, gatewayAPIKeys.ApiKeys[i].Id)
			}
		}

		collaborators, err := reg.ListCollaborators(ctx, &ttnpb.ListGatewayCollaboratorsRequest{
			GatewayIdentifiers: gatewayID,
		}, creds)

		a.So(err, should.BeNil)
		if a.So(collaborators, should.NotBeNil) {
			a.So(collaborators.Collaborators, should.NotBeEmpty)
		}

		APIKeyName := "test-gateway-api-key-name"
		APIKey, err = reg.CreateAPIKey(ctx, &ttnpb.CreateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			Name:               APIKeyName,
			Rights:             []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
		}, creds)

		a.So(err, should.BeNil)
		if a.So(APIKey, should.NotBeNil) {
			a.So(APIKey.Name, should.Equal, APIKeyName)
		}

		newAPIKeyName := "test-new-gateway-api-key"
		APIKey.Name = newAPIKeyName
		updated, err := reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey:             *APIKey,
			FieldMask:          &pbtypes.FieldMask{Paths: []string{"name"}},
		}, creds)

		a.So(err, should.BeNil)
		if a.So(updated, should.NotBeNil) {
			a.So(updated.Name, should.Equal, newAPIKeyName)
		}

		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *collaboratorID,
				Rights:                        []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
			},
		}, creds)

		a.So(err, should.BeNil)

		res, err := reg.GetCollaborator(ctx, &ttnpb.GetGatewayCollaboratorRequest{
			GatewayIdentifiers:            gatewayID,
			OrganizationOrUserIdentifiers: *collaboratorID,
		}, creds)

		a.So(err, should.BeNil)
		if a.So(res, should.NotBeNil) {
			a.So(res.Rights, should.Resemble, []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL})
		}

		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *collaboratorID,
			},
		}, creds)

		a.So(err, should.BeNil)

		res, err = reg.GetCollaborator(ctx, &ttnpb.GetGatewayCollaboratorRequest{
			GatewayIdentifiers:            gatewayID,
			OrganizationOrUserIdentifiers: *collaboratorID,
		}, creds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsNotFound(err), should.BeTrue)
		}
	})
}

func TestGatewayAccessRights(t *testing.T) {
	a := assertions.New(t)
	ctx := test.Context()

	testWithIdentityServer(t, func(is *IdentityServer, cc *grpc.ClientConn) {
		userID, usrCreds := defaultUser.UserIdentifiers, userCreds(defaultUserIdx)
		gatewayID := userGateways(&userID).Gateways[0].GatewayIdentifiers
		collaboratorID := gatewayAccessUser.UserIdentifiers.OrganizationOrUserIdentifiers()
		collaboratorCreds := userCreds(gatewayAccessUserIdx)
		removedCollaboratorID := gtwAccessCollaboratorUser.UserIdentifiers.OrganizationOrUserIdentifiers()

		reg := ttnpb.NewGatewayAccessClient(cc)

		_, err := reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *collaboratorID,
				Rights: []ttnpb.Right{
					ttnpb.RIGHT_GATEWAY_LINK,
					ttnpb.RIGHT_GATEWAY_SETTINGS_API_KEYS,
					ttnpb.RIGHT_GATEWAY_SETTINGS_COLLABORATORS,
				},
			},
		}, usrCreds)

		a.So(err, should.BeNil)

		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *removedCollaboratorID,
				Rights: []ttnpb.Right{
					ttnpb.RIGHT_GATEWAY_ALL,
				},
			},
		}, usrCreds)

		a.So(err, should.BeNil)

		APIKey, err := reg.CreateAPIKey(ctx, &ttnpb.CreateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			Rights:             []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL},
		}, usrCreds)

		a.So(err, should.BeNil)
		if a.So(APIKey, should.NotBeNil) && a.So(APIKey.Rights, should.NotBeNil) {
			a.So(APIKey.Rights, should.Resemble, []ttnpb.Right{ttnpb.RIGHT_GATEWAY_ALL})
		}

		// Try revoking rights for the collaborator with RIGHT_GATEWAY_ALL without having it
		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *removedCollaboratorID,
				Rights: []ttnpb.Right{
					ttnpb.RIGHT_GATEWAY_LINK,
					ttnpb.RIGHT_GATEWAY_SETTINGS_API_KEYS,
					ttnpb.RIGHT_GATEWAY_SETTINGS_COLLABORATORS,
				},
			},
		}, collaboratorCreds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}

		// Try revoking rights for the api key with RIGHT_GATEWAY_ALL without having it
		_, err = reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey: ttnpb.APIKey{
				Id: APIKey.Id,
				Rights: []ttnpb.Right{
					ttnpb.RIGHT_GATEWAY_LINK,
					ttnpb.RIGHT_GATEWAY_SETTINGS_API_KEYS,
					ttnpb.RIGHT_GATEWAY_SETTINGS_COLLABORATORS,
				},
			},
			FieldMask: &pbtypes.FieldMask{Paths: []string{"rights"}},
		}, collaboratorCreds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}

		// Remove RIGHT_GATEWAY_ALL from collaborator to be removed
		newRights := ttnpb.AllGatewayRights.Sub(ttnpb.RightsFrom(ttnpb.RIGHT_GATEWAY_ALL))
		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *removedCollaboratorID,
				Rights:                        newRights.Rights,
			},
		}, usrCreds)

		a.So(err, should.BeNil)

		// Remove RIGHT_GATEWAY_ALL from api key to be removed
		key, err := reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey: ttnpb.APIKey{
				Id:     APIKey.Id,
				Rights: newRights.Rights,
			},
			FieldMask: &pbtypes.FieldMask{Paths: []string{"rights"}},
		}, usrCreds)

		a.So(err, should.BeNil)
		if a.So(key, should.NotBeNil) && a.So(key.Rights, should.NotBeNil) {
			a.So(key.Rights, should.Resemble, newRights.Rights)
		}

		newRights = newRights.Sub(ttnpb.RightsFrom(ttnpb.RIGHT_GATEWAY_LINK))
		key, err = reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey: ttnpb.APIKey{
				Id:     APIKey.Id,
				Rights: newRights.Rights,
			},
			FieldMask: &pbtypes.FieldMask{Paths: []string{"rights"}},
		}, collaboratorCreds)

		a.So(err, should.BeNil)
		if a.So(key, should.NotBeNil) && a.So(key.Rights, should.NotBeNil) {
			a.So(key.Rights, should.Resemble, newRights.Rights)
		}

		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *removedCollaboratorID,
				Rights:                        newRights.Rights,
			},
		}, collaboratorCreds)

		a.So(err, should.BeNil)

		// Try revoking RIGHT_GATEWAY_DELETE without having it
		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *removedCollaboratorID,
				Rights:                        newRights.Sub(ttnpb.RightsFrom(ttnpb.RIGHT_GATEWAY_DELETE)).Rights,
			},
		}, collaboratorCreds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}

		// Try revoking RIGHT_GATEWAY_DELETE from api key without having it
		_, err = reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey: ttnpb.APIKey{
				Id:     APIKey.Id,
				Rights: newRights.Sub(ttnpb.RightsFrom(ttnpb.RIGHT_GATEWAY_DELETE)).Rights,
			},
			FieldMask: &pbtypes.FieldMask{Paths: []string{"rights"}},
		}, collaboratorCreds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsPermissionDenied(err), should.BeTrue)
		}

		res, err := reg.GetCollaborator(ctx, &ttnpb.GetGatewayCollaboratorRequest{
			GatewayIdentifiers:            gatewayID,
			OrganizationOrUserIdentifiers: *removedCollaboratorID,
		}, collaboratorCreds)

		if a.So(err, should.BeNil) {
			a.So(res.Rights, should.Resemble, newRights.Rights)
		}

		// Delete collaborator with more rights
		_, err = reg.SetCollaborator(ctx, &ttnpb.SetGatewayCollaboratorRequest{
			GatewayIdentifiers: gatewayID,
			Collaborator: ttnpb.Collaborator{
				OrganizationOrUserIdentifiers: *removedCollaboratorID,
				Rights:                        []ttnpb.Right{},
			},
		}, collaboratorCreds)

		a.So(err, should.BeNil)

		_, err = reg.GetCollaborator(ctx, &ttnpb.GetGatewayCollaboratorRequest{
			GatewayIdentifiers:            gatewayID,
			OrganizationOrUserIdentifiers: *removedCollaboratorID,
		}, collaboratorCreds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsNotFound(err), should.BeTrue)
		}

		// Delete api key with more rights
		_, err = reg.UpdateAPIKey(ctx, &ttnpb.UpdateGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			APIKey: ttnpb.APIKey{
				Id:     APIKey.Id,
				Rights: []ttnpb.Right{},
			},
			FieldMask: &pbtypes.FieldMask{Paths: []string{"rights"}},
		}, collaboratorCreds)

		a.So(err, should.BeNil)

		_, err = reg.GetAPIKey(ctx, &ttnpb.GetGatewayAPIKeyRequest{
			GatewayIdentifiers: gatewayID,
			KeyId:              APIKey.Id,
		}, collaboratorCreds)

		if a.So(err, should.NotBeNil) {
			a.So(errors.IsNotFound(err), should.BeTrue)
		}
	})
}
