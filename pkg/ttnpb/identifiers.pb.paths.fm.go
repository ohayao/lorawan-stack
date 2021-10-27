// Code generated by protoc-gen-fieldmask. DO NOT EDIT.

package ttnpb

var ApplicationIdentifiersFieldPathsNested = []string{
	"application_id",
}

var ApplicationIdentifiersFieldPathsTopLevel = []string{
	"application_id",
}
var ClientIdentifiersFieldPathsNested = []string{
	"client_id",
}

var ClientIdentifiersFieldPathsTopLevel = []string{
	"client_id",
}
var EndDeviceIdentifiersFieldPathsNested = []string{
	"application_ids",
	"application_ids.application_id",
	"dev_addr",
	"dev_eui",
	"device_id",
	"join_eui",
}

var EndDeviceIdentifiersFieldPathsTopLevel = []string{
	"application_ids",
	"dev_addr",
	"dev_eui",
	"device_id",
	"join_eui",
}
var GatewayIdentifiersFieldPathsNested = []string{
	"eui",
	"gateway_id",
}

var GatewayIdentifiersFieldPathsTopLevel = []string{
	"eui",
	"gateway_id",
}
var OrganizationIdentifiersFieldPathsNested = []string{
	"organization_id",
}

var OrganizationIdentifiersFieldPathsTopLevel = []string{
	"organization_id",
}
var UserIdentifiersFieldPathsNested = []string{
	"email",
	"user_id",
}

var UserIdentifiersFieldPathsTopLevel = []string{
	"email",
	"user_id",
}
var OrganizationOrUserIdentifiersFieldPathsNested = []string{
	"ids",
	"ids.organization_ids",
	"ids.organization_ids.organization_id",
	"ids.user_ids",
	"ids.user_ids.email",
	"ids.user_ids.user_id",
}

var OrganizationOrUserIdentifiersFieldPathsTopLevel = []string{
	"ids",
}
var EntityIdentifiersFieldPathsNested = []string{
	"ids",
	"ids.application_ids",
	"ids.application_ids.application_id",
	"ids.client_ids",
	"ids.client_ids.client_id",
	"ids.device_ids",
	"ids.device_ids.application_ids",
	"ids.device_ids.application_ids.application_id",
	"ids.device_ids.dev_addr",
	"ids.device_ids.dev_eui",
	"ids.device_ids.device_id",
	"ids.device_ids.join_eui",
	"ids.gateway_ids",
	"ids.gateway_ids.eui",
	"ids.gateway_ids.gateway_id",
	"ids.organization_ids",
	"ids.organization_ids.organization_id",
	"ids.user_ids",
	"ids.user_ids.email",
	"ids.user_ids.user_id",
}

var EntityIdentifiersFieldPathsTopLevel = []string{
	"ids",
}
var EndDeviceVersionIdentifiersFieldPathsNested = []string{
	"band_id",
	"brand_id",
	"firmware_version",
	"hardware_version",
	"model_id",
}

var EndDeviceVersionIdentifiersFieldPathsTopLevel = []string{
	"band_id",
	"brand_id",
	"firmware_version",
	"hardware_version",
	"model_id",
}
var NetworkIdentifiersFieldPathsNested = []string{
	"cluster_id",
	"net_id",
	"tenant_id",
}

var NetworkIdentifiersFieldPathsTopLevel = []string{
	"cluster_id",
	"net_id",
	"tenant_id",
}
