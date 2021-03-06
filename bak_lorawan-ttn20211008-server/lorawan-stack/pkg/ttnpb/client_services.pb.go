// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: lorawan-stack/api/client_services.proto

package ttnpb

import (
	context "context"
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	types "github.com/gogo/protobuf/types"
	golang_proto "github.com/golang/protobuf/proto"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = golang_proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

func init() {
	proto.RegisterFile("lorawan-stack/api/client_services.proto", fileDescriptor_80815ba053239a77)
}
func init() {
	golang_proto.RegisterFile("lorawan-stack/api/client_services.proto", fileDescriptor_80815ba053239a77)
}

var fileDescriptor_80815ba053239a77 = []byte{
	// 694 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xac, 0x55, 0x41, 0x6b, 0x13, 0x4f,
	0x14, 0xef, 0xf4, 0xff, 0x6f, 0x2a, 0x83, 0xb4, 0x38, 0x48, 0x85, 0x6d, 0xba, 0xda, 0x6d, 0xa1,
	0x10, 0xec, 0x8c, 0xb4, 0x08, 0xe2, 0x4d, 0xab, 0x56, 0x51, 0x41, 0x5b, 0xbc, 0xe4, 0x52, 0x36,
	0xdb, 0xe9, 0x66, 0xcc, 0x76, 0x67, 0x3b, 0xf3, 0xd2, 0x52, 0x4b, 0xa1, 0x78, 0xd0, 0x93, 0xa0,
	0x78, 0xf2, 0x1b, 0xf8, 0x01, 0xfc, 0x00, 0xe2, 0x4d, 0x10, 0x3c, 0xf4, 0xe2, 0xd5, 0xd4, 0x83,
	0x47, 0x3f, 0x82, 0xec, 0xec, 0x6e, 0xdd, 0x24, 0x1b, 0x9b, 0x50, 0x6f, 0x93, 0xf7, 0xde, 0xfc,
	0x7e, 0xef, 0xfd, 0xf6, 0xfd, 0x26, 0x78, 0x2e, 0x90, 0xca, 0xdd, 0x71, 0xc3, 0x79, 0x0d, 0xae,
	0xd7, 0x60, 0x6e, 0x24, 0x98, 0x17, 0x08, 0x1e, 0xc2, 0x9a, 0xe6, 0x6a, 0x5b, 0x78, 0x5c, 0xd3,
	0x48, 0x49, 0x90, 0x64, 0x0c, 0x20, 0xa4, 0x69, 0x31, 0xdd, 0x5e, 0xb4, 0xe6, 0x7d, 0x01, 0xf5,
	0x66, 0x8d, 0x7a, 0x72, 0x93, 0xf9, 0xd2, 0x97, 0xcc, 0x94, 0xd5, 0x9a, 0x1b, 0xe6, 0x97, 0xf9,
	0x61, 0x4e, 0xc9, 0x75, 0xab, 0xec, 0x4b, 0xe9, 0x07, 0xdc, 0x10, 0xb8, 0x61, 0x28, 0xc1, 0x05,
	0x21, 0xc3, 0x14, 0xdc, 0x9a, 0x4c, 0xb3, 0xc7, 0x18, 0x7c, 0x33, 0x82, 0xdd, 0x34, 0x69, 0xf7,
	0x6a, 0x31, 0xcd, 0xcf, 0x74, 0xe7, 0xc5, 0x3a, 0x0f, 0x41, 0x6c, 0x08, 0xae, 0x74, 0x6f, 0x10,
	0x25, 0xfc, 0x3a, 0xa4, 0xf9, 0x85, 0x2f, 0xa3, 0x78, 0x6c, 0xc9, 0xa0, 0xae, 0x70, 0x5f, 0x68,
	0x50, 0xbb, 0xe4, 0x2b, 0xc2, 0xa5, 0x25, 0xc5, 0x5d, 0xe0, 0x64, 0x86, 0xb6, 0x4f, 0x4f, 0x93,
	0x78, 0x76, 0x61, 0xab, 0xc9, 0x35, 0x58, 0x13, 0x5d, 0x45, 0x26, 0xed, 0xbc, 0x44, 0xcf, 0x0f,
	0x7f, 0xbc, 0x1d, 0x3e, 0x40, 0x0e, 0x65, 0x4d, 0xcd, 0x95, 0x66, 0x7b, 0x9e, 0x0c, 0x02, 0xb7,
	0x26, 0x95, 0x0b, 0x52, 0xd1, 0x38, 0xb6, 0x26, 0xd6, 0x75, 0x76, 0xd8, 0x4f, 0xc7, 0xd3, 0xd7,
	0x51, 0xa5, 0x7a, 0xdf, 0xb9, 0xc3, 0xa4, 0xf2, 0xdd, 0x50, 0x3c, 0x4b, 0x14, 0xeb, 0xb8, 0x9c,
	0xcf, 0x19, 0x90, 0x8e, 0x40, 0x1e, 0x8c, 0xd4, 0xf1, 0x7f, 0xcb, 0x1c, 0xc8, 0xa5, 0xce, 0x46,
	0x97, 0x39, 0xf4, 0x37, 0xca, 0x9c, 0x99, 0x64, 0x9a, 0x5c, 0xcc, 0x50, 0xd9, 0x5e, 0xba, 0x2d,
	0x31, 0xf5, 0xf1, 0x71, 0x9f, 0x1c, 0x22, 0xfc, 0xff, 0x03, 0xa1, 0x81, 0x38, 0x9d, 0x48, 0x71,
	0x34, 0x41, 0xd3, 0x19, 0xdb, 0x85, 0x62, 0x36, 0xed, 0xbc, 0x4a, 0x94, 0x7b, 0x81, 0xc8, 0x99,
	0x8c, 0xb0, 0x7a, 0x85, 0x0c, 0xa8, 0x62, 0xf5, 0x2e, 0xf9, 0x47, 0x12, 0x92, 0x2d, 0x5c, 0x7a,
	0x12, 0xad, 0x17, 0x2e, 0x44, 0x12, 0xef, 0x4f, 0xc5, 0x8a, 0x99, 0x6a, 0xd6, 0xea, 0x52, 0x91,
	0xb6, 0xab, 0x18, 0x7f, 0x32, 0x17, 0x97, 0x6e, 0xf1, 0x80, 0x03, 0x27, 0xd3, 0xc5, 0x68, 0xf7,
	0xfe, 0xac, 0xba, 0x35, 0x41, 0x13, 0x1f, 0xd1, 0xcc, 0x47, 0xf4, 0x76, 0xec, 0x23, 0xa7, 0x6c,
	0x08, 0x27, 0x2a, 0xe7, 0x0b, 0x3e, 0xdb, 0x3e, 0x79, 0x8a, 0x47, 0x57, 0xb8, 0x06, 0xa9, 0x4e,
	0xc5, 0x31, 0x6b, 0x38, 0x6c, 0xa7, 0x5c, 0xc4, 0xc1, 0x54, 0x4a, 0xb0, 0x81, 0x47, 0x1e, 0x35,
	0x95, 0x7f, 0x2a, 0x26, 0xc7, 0x30, 0x95, 0x2b, 0x56, 0x21, 0x53, 0x14, 0xc3, 0x2f, 0x1c, 0x8d,
	0xe0, 0xb3, 0x09, 0xe2, 0x0d, 0xcf, 0xe3, 0x5a, 0x93, 0x00, 0xe3, 0x78, 0xf3, 0x56, 0x8c, 0xe7,
	0xfb, 0x63, 0xef, 0x28, 0x49, 0xae, 0x3a, 0x33, 0x86, 0x7d, 0x8a, 0x4c, 0x16, 0xcf, 0x99, 0xe0,
	0x7f, 0x18, 0xc6, 0xe3, 0xb1, 0xa9, 0x72, 0x6b, 0x46, 0x2e, 0xf7, 0x74, 0x5d, 0xbe, 0x2c, 0xdb,
	0x9d, 0xb9, 0xa2, 0xea, 0xb6, 0x3a, 0x1d, 0xc9, 0x50, 0x73, 0xe7, 0x73, 0xe2, 0x91, 0x4f, 0xa8,
	0xba, 0x4a, 0x1e, 0x9f, 0x60, 0x4b, 0x96, 0xdf, 0x7b, 0xe3, 0xa2, 0x93, 0x4c, 0x54, 0x6d, 0x10,
	0x31, 0x10, 0x68, 0xde, 0x3b, 0x83, 0xfa, 0x8c, 0xbc, 0x41, 0x78, 0x7c, 0xf5, 0x24, 0xd9, 0x56,
	0xff, 0x26, 0x5b, 0xaf, 0x9d, 0xb9, 0x66, 0x44, 0x5a, 0xb0, 0xe6, 0x07, 0x19, 0xc6, 0xbc, 0x99,
	0xef, 0x10, 0x3e, 0x67, 0xde, 0xac, 0x7c, 0x82, 0xd0, 0xde, 0xcf, 0x5a, 0x5b, 0x61, 0xd6, 0xd7,
	0x54, 0xd7, 0xc2, 0xe5, 0xab, 0x9c, 0xab, 0xa6, 0x3d, 0x46, 0x06, 0x6b, 0xef, 0xe6, 0xc3, 0x6f,
	0xdf, 0xed, 0xa1, 0x83, 0x96, 0x8d, 0xde, 0xb7, 0x6c, 0xf4, 0xb3, 0x65, 0x0f, 0xfd, 0x6a, 0xd9,
	0xe8, 0xf5, 0x91, 0x3d, 0xf4, 0xf1, 0xc8, 0x46, 0x55, 0xe6, 0x4b, 0x0a, 0x75, 0x0e, 0x75, 0x11,
	0xfa, 0x9a, 0x86, 0x1c, 0x76, 0xa4, 0x6a, 0xb0, 0xf6, 0xff, 0xc1, 0xed, 0x45, 0x16, 0x35, 0x7c,
	0x06, 0x10, 0x46, 0xb5, 0x5a, 0xc9, 0x88, 0xb6, 0xf8, 0x3b, 0x00, 0x00, 0xff, 0xff, 0xda, 0x66,
	0x2b, 0xb0, 0x14, 0x08, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// ClientRegistryClient is the client API for ClientRegistry service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type ClientRegistryClient interface {
	// Create a new OAuth client. This also sets the given organization or user as
	// first collaborator with all possible rights.
	Create(ctx context.Context, in *CreateClientRequest, opts ...grpc.CallOption) (*Client, error)
	// Get the OAuth client with the given identifiers, selecting the fields specified
	// in the field mask.
	// More or less fields may be returned, depending on the rights of the caller.
	Get(ctx context.Context, in *GetClientRequest, opts ...grpc.CallOption) (*Client, error)
	// List OAuth clients where the given user or organization is a direct collaborator.
	// If no user or organization is given, this returns the OAuth clients the caller
	// has access to.
	// Similar to Get, this selects the fields specified in the field mask.
	// More or less fields may be returned, depending on the rights of the caller.
	List(ctx context.Context, in *ListClientsRequest, opts ...grpc.CallOption) (*Clients, error)
	// Update the OAuth client, changing the fields specified by the field mask to the provided values.
	Update(ctx context.Context, in *UpdateClientRequest, opts ...grpc.CallOption) (*Client, error)
	// Delete the OAuth client. This may not release the client ID for reuse.
	Delete(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*types.Empty, error)
	// Restore a recently deleted client.
	//
	// Deployment configuration may specify if, and for how long after deletion,
	// entities can be restored.
	Restore(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*types.Empty, error)
	// Purge the client. This will release the client ID for reuse.
	Purge(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*types.Empty, error)
}

type clientRegistryClient struct {
	cc *grpc.ClientConn
}

func NewClientRegistryClient(cc *grpc.ClientConn) ClientRegistryClient {
	return &clientRegistryClient{cc}
}

func (c *clientRegistryClient) Create(ctx context.Context, in *CreateClientRequest, opts ...grpc.CallOption) (*Client, error) {
	out := new(Client)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/Create", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientRegistryClient) Get(ctx context.Context, in *GetClientRequest, opts ...grpc.CallOption) (*Client, error) {
	out := new(Client)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/Get", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientRegistryClient) List(ctx context.Context, in *ListClientsRequest, opts ...grpc.CallOption) (*Clients, error) {
	out := new(Clients)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/List", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientRegistryClient) Update(ctx context.Context, in *UpdateClientRequest, opts ...grpc.CallOption) (*Client, error) {
	out := new(Client)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/Update", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientRegistryClient) Delete(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*types.Empty, error) {
	out := new(types.Empty)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/Delete", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientRegistryClient) Restore(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*types.Empty, error) {
	out := new(types.Empty)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/Restore", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientRegistryClient) Purge(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*types.Empty, error) {
	out := new(types.Empty)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientRegistry/Purge", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ClientRegistryServer is the server API for ClientRegistry service.
type ClientRegistryServer interface {
	// Create a new OAuth client. This also sets the given organization or user as
	// first collaborator with all possible rights.
	Create(context.Context, *CreateClientRequest) (*Client, error)
	// Get the OAuth client with the given identifiers, selecting the fields specified
	// in the field mask.
	// More or less fields may be returned, depending on the rights of the caller.
	Get(context.Context, *GetClientRequest) (*Client, error)
	// List OAuth clients where the given user or organization is a direct collaborator.
	// If no user or organization is given, this returns the OAuth clients the caller
	// has access to.
	// Similar to Get, this selects the fields specified in the field mask.
	// More or less fields may be returned, depending on the rights of the caller.
	List(context.Context, *ListClientsRequest) (*Clients, error)
	// Update the OAuth client, changing the fields specified by the field mask to the provided values.
	Update(context.Context, *UpdateClientRequest) (*Client, error)
	// Delete the OAuth client. This may not release the client ID for reuse.
	Delete(context.Context, *ClientIdentifiers) (*types.Empty, error)
	// Restore a recently deleted client.
	//
	// Deployment configuration may specify if, and for how long after deletion,
	// entities can be restored.
	Restore(context.Context, *ClientIdentifiers) (*types.Empty, error)
	// Purge the client. This will release the client ID for reuse.
	Purge(context.Context, *ClientIdentifiers) (*types.Empty, error)
}

// UnimplementedClientRegistryServer can be embedded to have forward compatible implementations.
type UnimplementedClientRegistryServer struct {
}

func (*UnimplementedClientRegistryServer) Create(ctx context.Context, req *CreateClientRequest) (*Client, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Create not implemented")
}
func (*UnimplementedClientRegistryServer) Get(ctx context.Context, req *GetClientRequest) (*Client, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Get not implemented")
}
func (*UnimplementedClientRegistryServer) List(ctx context.Context, req *ListClientsRequest) (*Clients, error) {
	return nil, status.Errorf(codes.Unimplemented, "method List not implemented")
}
func (*UnimplementedClientRegistryServer) Update(ctx context.Context, req *UpdateClientRequest) (*Client, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Update not implemented")
}
func (*UnimplementedClientRegistryServer) Delete(ctx context.Context, req *ClientIdentifiers) (*types.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Delete not implemented")
}
func (*UnimplementedClientRegistryServer) Restore(ctx context.Context, req *ClientIdentifiers) (*types.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Restore not implemented")
}
func (*UnimplementedClientRegistryServer) Purge(ctx context.Context, req *ClientIdentifiers) (*types.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Purge not implemented")
}

func RegisterClientRegistryServer(s *grpc.Server, srv ClientRegistryServer) {
	s.RegisterService(&_ClientRegistry_serviceDesc, srv)
}

func _ClientRegistry_Create_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateClientRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).Create(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/Create",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).Create(ctx, req.(*CreateClientRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientRegistry_Get_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetClientRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).Get(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/Get",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).Get(ctx, req.(*GetClientRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientRegistry_List_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListClientsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).List(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/List",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).List(ctx, req.(*ListClientsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientRegistry_Update_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateClientRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).Update(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/Update",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).Update(ctx, req.(*UpdateClientRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientRegistry_Delete_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ClientIdentifiers)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).Delete(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/Delete",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).Delete(ctx, req.(*ClientIdentifiers))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientRegistry_Restore_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ClientIdentifiers)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).Restore(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/Restore",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).Restore(ctx, req.(*ClientIdentifiers))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientRegistry_Purge_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ClientIdentifiers)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientRegistryServer).Purge(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientRegistry/Purge",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientRegistryServer).Purge(ctx, req.(*ClientIdentifiers))
	}
	return interceptor(ctx, in, info, handler)
}

var _ClientRegistry_serviceDesc = grpc.ServiceDesc{
	ServiceName: "ttn.lorawan.v3.ClientRegistry",
	HandlerType: (*ClientRegistryServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Create",
			Handler:    _ClientRegistry_Create_Handler,
		},
		{
			MethodName: "Get",
			Handler:    _ClientRegistry_Get_Handler,
		},
		{
			MethodName: "List",
			Handler:    _ClientRegistry_List_Handler,
		},
		{
			MethodName: "Update",
			Handler:    _ClientRegistry_Update_Handler,
		},
		{
			MethodName: "Delete",
			Handler:    _ClientRegistry_Delete_Handler,
		},
		{
			MethodName: "Restore",
			Handler:    _ClientRegistry_Restore_Handler,
		},
		{
			MethodName: "Purge",
			Handler:    _ClientRegistry_Purge_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "lorawan-stack/api/client_services.proto",
}

// ClientAccessClient is the client API for ClientAccess service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type ClientAccessClient interface {
	// List the rights the caller has on this application.
	ListRights(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*Rights, error)
	// Get the rights of a collaborator (member) of the client.
	// Pseudo-rights in the response (such as the "_ALL" right) are not expanded.
	GetCollaborator(ctx context.Context, in *GetClientCollaboratorRequest, opts ...grpc.CallOption) (*GetCollaboratorResponse, error)
	// Set the rights of a collaborator (member) on the OAuth client.
	// This method can also be used to delete the collaborator, by giving them no rights.
	// The caller is required to have all assigned or/and removed rights.
	SetCollaborator(ctx context.Context, in *SetClientCollaboratorRequest, opts ...grpc.CallOption) (*types.Empty, error)
	// List the collaborators on this OAuth client.
	ListCollaborators(ctx context.Context, in *ListClientCollaboratorsRequest, opts ...grpc.CallOption) (*Collaborators, error)
}

type clientAccessClient struct {
	cc *grpc.ClientConn
}

func NewClientAccessClient(cc *grpc.ClientConn) ClientAccessClient {
	return &clientAccessClient{cc}
}

func (c *clientAccessClient) ListRights(ctx context.Context, in *ClientIdentifiers, opts ...grpc.CallOption) (*Rights, error) {
	out := new(Rights)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientAccess/ListRights", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientAccessClient) GetCollaborator(ctx context.Context, in *GetClientCollaboratorRequest, opts ...grpc.CallOption) (*GetCollaboratorResponse, error) {
	out := new(GetCollaboratorResponse)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientAccess/GetCollaborator", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientAccessClient) SetCollaborator(ctx context.Context, in *SetClientCollaboratorRequest, opts ...grpc.CallOption) (*types.Empty, error) {
	out := new(types.Empty)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientAccess/SetCollaborator", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *clientAccessClient) ListCollaborators(ctx context.Context, in *ListClientCollaboratorsRequest, opts ...grpc.CallOption) (*Collaborators, error) {
	out := new(Collaborators)
	err := c.cc.Invoke(ctx, "/ttn.lorawan.v3.ClientAccess/ListCollaborators", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ClientAccessServer is the server API for ClientAccess service.
type ClientAccessServer interface {
	// List the rights the caller has on this application.
	ListRights(context.Context, *ClientIdentifiers) (*Rights, error)
	// Get the rights of a collaborator (member) of the client.
	// Pseudo-rights in the response (such as the "_ALL" right) are not expanded.
	GetCollaborator(context.Context, *GetClientCollaboratorRequest) (*GetCollaboratorResponse, error)
	// Set the rights of a collaborator (member) on the OAuth client.
	// This method can also be used to delete the collaborator, by giving them no rights.
	// The caller is required to have all assigned or/and removed rights.
	SetCollaborator(context.Context, *SetClientCollaboratorRequest) (*types.Empty, error)
	// List the collaborators on this OAuth client.
	ListCollaborators(context.Context, *ListClientCollaboratorsRequest) (*Collaborators, error)
}

// UnimplementedClientAccessServer can be embedded to have forward compatible implementations.
type UnimplementedClientAccessServer struct {
}

func (*UnimplementedClientAccessServer) ListRights(ctx context.Context, req *ClientIdentifiers) (*Rights, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListRights not implemented")
}
func (*UnimplementedClientAccessServer) GetCollaborator(ctx context.Context, req *GetClientCollaboratorRequest) (*GetCollaboratorResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetCollaborator not implemented")
}
func (*UnimplementedClientAccessServer) SetCollaborator(ctx context.Context, req *SetClientCollaboratorRequest) (*types.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SetCollaborator not implemented")
}
func (*UnimplementedClientAccessServer) ListCollaborators(ctx context.Context, req *ListClientCollaboratorsRequest) (*Collaborators, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListCollaborators not implemented")
}

func RegisterClientAccessServer(s *grpc.Server, srv ClientAccessServer) {
	s.RegisterService(&_ClientAccess_serviceDesc, srv)
}

func _ClientAccess_ListRights_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ClientIdentifiers)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientAccessServer).ListRights(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientAccess/ListRights",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientAccessServer).ListRights(ctx, req.(*ClientIdentifiers))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientAccess_GetCollaborator_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetClientCollaboratorRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientAccessServer).GetCollaborator(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientAccess/GetCollaborator",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientAccessServer).GetCollaborator(ctx, req.(*GetClientCollaboratorRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientAccess_SetCollaborator_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetClientCollaboratorRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientAccessServer).SetCollaborator(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientAccess/SetCollaborator",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientAccessServer).SetCollaborator(ctx, req.(*SetClientCollaboratorRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ClientAccess_ListCollaborators_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListClientCollaboratorsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ClientAccessServer).ListCollaborators(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/ttn.lorawan.v3.ClientAccess/ListCollaborators",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ClientAccessServer).ListCollaborators(ctx, req.(*ListClientCollaboratorsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _ClientAccess_serviceDesc = grpc.ServiceDesc{
	ServiceName: "ttn.lorawan.v3.ClientAccess",
	HandlerType: (*ClientAccessServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListRights",
			Handler:    _ClientAccess_ListRights_Handler,
		},
		{
			MethodName: "GetCollaborator",
			Handler:    _ClientAccess_GetCollaborator_Handler,
		},
		{
			MethodName: "SetCollaborator",
			Handler:    _ClientAccess_SetCollaborator_Handler,
		},
		{
			MethodName: "ListCollaborators",
			Handler:    _ClientAccess_ListCollaborators_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "lorawan-stack/api/client_services.proto",
}
