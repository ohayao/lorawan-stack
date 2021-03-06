// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: lorawan-stack/api/mqtt.proto

package ttnpb

import (
	fmt "fmt"
	_ "github.com/envoyproxy/protoc-gen-validate/validate"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	golang_proto "github.com/golang/protobuf/proto"
	math "math"
	reflect "reflect"
	strings "strings"
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

// The connection information of an MQTT frontend.
type MQTTConnectionInfo struct {
	// The public listen address of the frontend.
	PublicAddress string `protobuf:"bytes,1,opt,name=public_address,json=publicAddress,proto3" json:"public_address,omitempty"`
	// The public listen address of the TLS frontend.
	PublicTlsAddress string `protobuf:"bytes,2,opt,name=public_tls_address,json=publicTlsAddress,proto3" json:"public_tls_address,omitempty"`
	// The username to be used for authentication.
	Username             string   `protobuf:"bytes,3,opt,name=username,proto3" json:"username,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *MQTTConnectionInfo) Reset()      { *m = MQTTConnectionInfo{} }
func (*MQTTConnectionInfo) ProtoMessage() {}
func (*MQTTConnectionInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_dbbf9b6b10797b61, []int{0}
}
func (m *MQTTConnectionInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_MQTTConnectionInfo.Unmarshal(m, b)
}
func (m *MQTTConnectionInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_MQTTConnectionInfo.Marshal(b, m, deterministic)
}
func (m *MQTTConnectionInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MQTTConnectionInfo.Merge(m, src)
}
func (m *MQTTConnectionInfo) XXX_Size() int {
	return xxx_messageInfo_MQTTConnectionInfo.Size(m)
}
func (m *MQTTConnectionInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_MQTTConnectionInfo.DiscardUnknown(m)
}

var xxx_messageInfo_MQTTConnectionInfo proto.InternalMessageInfo

func (m *MQTTConnectionInfo) GetPublicAddress() string {
	if m != nil {
		return m.PublicAddress
	}
	return ""
}

func (m *MQTTConnectionInfo) GetPublicTlsAddress() string {
	if m != nil {
		return m.PublicTlsAddress
	}
	return ""
}

func (m *MQTTConnectionInfo) GetUsername() string {
	if m != nil {
		return m.Username
	}
	return ""
}

func init() {
	proto.RegisterType((*MQTTConnectionInfo)(nil), "ttn.lorawan.v3.MQTTConnectionInfo")
	golang_proto.RegisterType((*MQTTConnectionInfo)(nil), "ttn.lorawan.v3.MQTTConnectionInfo")
}

func init() { proto.RegisterFile("lorawan-stack/api/mqtt.proto", fileDescriptor_dbbf9b6b10797b61) }
func init() {
	golang_proto.RegisterFile("lorawan-stack/api/mqtt.proto", fileDescriptor_dbbf9b6b10797b61)
}

var fileDescriptor_dbbf9b6b10797b61 = []byte{
	// 387 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x92, 0xc9, 0xc9, 0x2f, 0x4a,
	0x2c, 0x4f, 0xcc, 0xd3, 0x2d, 0x2e, 0x49, 0x4c, 0xce, 0xd6, 0x4f, 0x2c, 0xc8, 0xd4, 0xcf, 0x2d,
	0x2c, 0x29, 0xd1, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0xe2, 0x2b, 0x29, 0xc9, 0xd3, 0x83, 0xaa,
	0xd0, 0x2b, 0x33, 0x96, 0x72, 0x4c, 0xcf, 0x2c, 0xc9, 0x28, 0x4d, 0xd2, 0x4b, 0xce, 0xcf, 0xd5,
	0x4f, 0xcd, 0x2b, 0xcb, 0xaf, 0x2c, 0x28, 0xca, 0xaf, 0xa8, 0xd4, 0x07, 0x2b, 0x4e, 0xd6, 0x4d,
	0x4f, 0xcd, 0xd3, 0x2d, 0x4b, 0xcc, 0xc9, 0x4c, 0x49, 0x2c, 0x49, 0xd5, 0xc7, 0x60, 0x40, 0x8c,
	0x94, 0xd2, 0x45, 0x32, 0x22, 0x3d, 0x3f, 0x3d, 0x1f, 0xa2, 0x39, 0xa9, 0x34, 0x0d, 0xcc, 0x03,
	0x73, 0xc0, 0x2c, 0x88, 0x72, 0xa5, 0x95, 0xcc, 0x5c, 0x42, 0xbe, 0x81, 0x21, 0x21, 0xce, 0xf9,
	0x79, 0x79, 0xa9, 0xc9, 0x25, 0x99, 0xf9, 0x79, 0x9e, 0x79, 0x69, 0xf9, 0x42, 0xdb, 0x18, 0xb9,
	0xf8, 0x0a, 0x4a, 0x93, 0x72, 0x32, 0x93, 0xe3, 0x13, 0x53, 0x52, 0x8a, 0x52, 0x8b, 0x8b, 0x25,
	0x18, 0x15, 0x18, 0x35, 0x38, 0x9d, 0xfa, 0x18, 0x7f, 0x39, 0x75, 0x31, 0x16, 0xb5, 0x33, 0x1a,
	0xb5, 0x30, 0xc6, 0x69, 0xd8, 0x5b, 0x69, 0xd8, 0x5b, 0x45, 0x27, 0xea, 0x56, 0x39, 0xea, 0x46,
	0x19, 0xe8, 0x5a, 0xc6, 0xd6, 0x20, 0xb1, 0x11, 0xcc, 0x18, 0xdd, 0x58, 0x2d, 0x24, 0x09, 0xcd,
	0x18, 0x3d, 0x4d, 0x2d, 0x90, 0x3e, 0x47, 0xdd, 0xa8, 0x44, 0xdd, 0x2a, 0x88, 0x3e, 0x04, 0x1b,
	0xc1, 0x04, 0xeb, 0x43, 0x48, 0x68, 0x6a, 0xd8, 0x5b, 0x59, 0x45, 0x83, 0x58, 0xd5, 0x86, 0x3a,
	0xa6, 0xb5, 0x9a, 0xf6, 0x2a, 0x35, 0x71, 0x2a, 0x41, 0xbc, 0x10, 0x67, 0x3a, 0x42, 0x5c, 0x29,
	0xb4, 0x97, 0x91, 0x4b, 0x08, 0xea, 0xf0, 0x92, 0x9c, 0x62, 0xb8, 0xe3, 0x99, 0x06, 0xa7, 0xe3,
	0x05, 0x20, 0x4e, 0x0d, 0xc9, 0x29, 0x86, 0xb9, 0x5f, 0x8a, 0x8b, 0xa3, 0xb4, 0x38, 0xb5, 0x28,
	0x2f, 0x31, 0x37, 0x55, 0x82, 0x19, 0xe4, 0xe8, 0x20, 0x38, 0xdf, 0xc9, 0xf7, 0xc6, 0x43, 0x39,
	0x86, 0x86, 0x47, 0x72, 0x8c, 0x2b, 0x1e, 0xc9, 0x31, 0xbe, 0x78, 0x24, 0xc7, 0xf0, 0xe1, 0x91,
	0x1c, 0xe3, 0x84, 0xc7, 0x72, 0x0c, 0x07, 0x1e, 0xcb, 0x31, 0x46, 0xe9, 0xa7, 0xe7, 0xeb, 0x95,
	0x64, 0xa4, 0x96, 0x64, 0x64, 0xe6, 0xa5, 0x17, 0xeb, 0xe5, 0xa5, 0x96, 0x94, 0xe7, 0x17, 0x65,
	0xeb, 0xa3, 0x26, 0xbf, 0x32, 0x63, 0xfd, 0x82, 0xec, 0x74, 0xfd, 0x92, 0x92, 0xbc, 0x82, 0xa4,
	0x24, 0x36, 0x70, 0x0a, 0x30, 0x06, 0x04, 0x00, 0x00, 0xff, 0xff, 0x52, 0xc1, 0x3d, 0xbf, 0xa3,
	0x02, 0x00, 0x00,
}

func (this *MQTTConnectionInfo) Equal(that interface{}) bool {
	if that == nil {
		return this == nil
	}

	that1, ok := that.(*MQTTConnectionInfo)
	if !ok {
		that2, ok := that.(MQTTConnectionInfo)
		if ok {
			that1 = &that2
		} else {
			return false
		}
	}
	if that1 == nil {
		return this == nil
	} else if this == nil {
		return false
	}
	if this.PublicAddress != that1.PublicAddress {
		return false
	}
	if this.PublicTlsAddress != that1.PublicTlsAddress {
		return false
	}
	if this.Username != that1.Username {
		return false
	}
	return true
}
func (this *MQTTConnectionInfo) String() string {
	if this == nil {
		return "nil"
	}
	s := strings.Join([]string{`&MQTTConnectionInfo{`,
		`PublicAddress:` + fmt.Sprintf("%v", this.PublicAddress) + `,`,
		`PublicTlsAddress:` + fmt.Sprintf("%v", this.PublicTlsAddress) + `,`,
		`Username:` + fmt.Sprintf("%v", this.Username) + `,`,
		`}`,
	}, "")
	return s
}
func valueToStringMqtt(v interface{}) string {
	rv := reflect.ValueOf(v)
	if rv.IsNil() {
		return "nil"
	}
	pv := reflect.Indirect(rv).Interface()
	return fmt.Sprintf("*%v", pv)
}
