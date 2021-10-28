// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: lorawan-stack/api/error.proto

package ttnpb

import (
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	types "github.com/gogo/protobuf/types"
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

// Error details that are communicated over gRPC (and HTTP) APIs.
// The messages (for translation) are stored as "error:<namespace>:<name>".
type ErrorDetails struct {
	// Namespace of the error (typically the package name in The Things Stack).
	Namespace string `protobuf:"bytes,1,opt,name=namespace,proto3" json:"namespace,omitempty"`
	// Name of the error.
	Name string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	// The default (fallback) message format that should be used for the error.
	// This is also used if the client does not have a translation for the error.
	MessageFormat string `protobuf:"bytes,3,opt,name=message_format,json=messageFormat,proto3" json:"message_format,omitempty"`
	// Attributes that should be filled into the message format. Any extra attributes
	// can be displayed as error details.
	Attributes *types.Struct `protobuf:"bytes,4,opt,name=attributes,proto3" json:"attributes,omitempty"`
	// The correlation ID of the error can be used to correlate the error to stack
	// traces the network may (or may not) store about recent errors.
	CorrelationId string `protobuf:"bytes,5,opt,name=correlation_id,json=correlationId,proto3" json:"correlation_id,omitempty"`
	// The error that caused this error.
	Cause *ErrorDetails `protobuf:"bytes,6,opt,name=cause,proto3" json:"cause,omitempty"`
	// The status code of the error.
	Code uint32 `protobuf:"varint,7,opt,name=code,proto3" json:"code,omitempty"`
	// The details of the error.
	Details              []*types.Any `protobuf:"bytes,8,rep,name=details,proto3" json:"details,omitempty"`
	XXX_NoUnkeyedLiteral struct{}     `json:"-"`
	XXX_sizecache        int32        `json:"-"`
}

func (m *ErrorDetails) Reset()      { *m = ErrorDetails{} }
func (*ErrorDetails) ProtoMessage() {}
func (*ErrorDetails) Descriptor() ([]byte, []int) {
	return fileDescriptor_e3054776e06fb477, []int{0}
}
func (m *ErrorDetails) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ErrorDetails.Unmarshal(m, b)
}
func (m *ErrorDetails) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ErrorDetails.Marshal(b, m, deterministic)
}
func (m *ErrorDetails) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ErrorDetails.Merge(m, src)
}
func (m *ErrorDetails) XXX_Size() int {
	return xxx_messageInfo_ErrorDetails.Size(m)
}
func (m *ErrorDetails) XXX_DiscardUnknown() {
	xxx_messageInfo_ErrorDetails.DiscardUnknown(m)
}

var xxx_messageInfo_ErrorDetails proto.InternalMessageInfo

func (m *ErrorDetails) GetNamespace() string {
	if m != nil {
		return m.Namespace
	}
	return ""
}

func (m *ErrorDetails) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *ErrorDetails) GetMessageFormat() string {
	if m != nil {
		return m.MessageFormat
	}
	return ""
}

func (m *ErrorDetails) GetAttributes() *types.Struct {
	if m != nil {
		return m.Attributes
	}
	return nil
}

func (m *ErrorDetails) GetCorrelationId() string {
	if m != nil {
		return m.CorrelationId
	}
	return ""
}

func (m *ErrorDetails) GetCause() *ErrorDetails {
	if m != nil {
		return m.Cause
	}
	return nil
}

func (m *ErrorDetails) GetCode() uint32 {
	if m != nil {
		return m.Code
	}
	return 0
}

func (m *ErrorDetails) GetDetails() []*types.Any {
	if m != nil {
		return m.Details
	}
	return nil
}

func init() {
	proto.RegisterType((*ErrorDetails)(nil), "ttn.lorawan.v3.ErrorDetails")
	golang_proto.RegisterType((*ErrorDetails)(nil), "ttn.lorawan.v3.ErrorDetails")
}

func init() { proto.RegisterFile("lorawan-stack/api/error.proto", fileDescriptor_e3054776e06fb477) }
func init() {
	golang_proto.RegisterFile("lorawan-stack/api/error.proto", fileDescriptor_e3054776e06fb477)
}

var fileDescriptor_e3054776e06fb477 = []byte{
	// 388 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x64, 0x92, 0xb1, 0xae, 0xd3, 0x30,
	0x14, 0x86, 0xeb, 0x7b, 0x7b, 0xef, 0xe5, 0xfa, 0xd2, 0x0e, 0x16, 0x12, 0xa6, 0x2a, 0x21, 0x42,
	0x42, 0xca, 0x52, 0x5b, 0x6a, 0x07, 0x24, 0x36, 0x10, 0x20, 0x31, 0xb0, 0x84, 0x8d, 0xa5, 0x72,
	0x12, 0xd7, 0x8d, 0x9a, 0xd8, 0x91, 0x7d, 0xd2, 0xaa, 0x1b, 0x8f, 0xc0, 0x23, 0x30, 0xf2, 0x08,
	0x8c, 0x2c, 0xbc, 0x03, 0x2b, 0xe9, 0xc2, 0xc8, 0x23, 0xa0, 0x38, 0xad, 0xda, 0xc2, 0x76, 0xce,
	0xff, 0x7f, 0x3e, 0xfe, 0x8f, 0x65, 0xfc, 0xb8, 0x30, 0x56, 0x6c, 0x84, 0x9e, 0x38, 0x10, 0xe9,
	0x8a, 0x8b, 0x2a, 0xe7, 0xd2, 0x5a, 0x63, 0x59, 0x65, 0x0d, 0x18, 0x32, 0x04, 0xd0, 0x6c, 0x8f,
	0xb0, 0xf5, 0x6c, 0x34, 0x51, 0x39, 0x2c, 0xeb, 0x84, 0xa5, 0xa6, 0xe4, 0xca, 0x28, 0xc3, 0x3d,
	0x96, 0xd4, 0x0b, 0xdf, 0xf9, 0xc6, 0x57, 0xdd, 0xf1, 0xd1, 0x23, 0x65, 0x8c, 0x2a, 0xe4, 0x91,
	0x12, 0x7a, 0xbb, 0xb7, 0xc6, 0xff, 0x5a, 0x0e, 0x6c, 0x9d, 0x42, 0xe7, 0x3e, 0xfd, 0x71, 0x81,
	0xef, 0xbf, 0x69, 0x73, 0xbc, 0x96, 0x20, 0xf2, 0xc2, 0x91, 0x31, 0xbe, 0xd5, 0xa2, 0x94, 0xae,
	0x12, 0xa9, 0xa4, 0x28, 0x44, 0xd1, 0x6d, 0x7c, 0x14, 0x08, 0xc1, 0xfd, 0xb6, 0xa1, 0x17, 0xde,
	0xf0, 0x35, 0x79, 0x86, 0x87, 0xa5, 0x74, 0x4e, 0x28, 0x39, 0x5f, 0x18, 0x5b, 0x0a, 0xa0, 0x97,
	0xde, 0x1d, 0xec, 0xd5, 0xb7, 0x5e, 0x24, 0xcf, 0x31, 0x16, 0x00, 0x36, 0x4f, 0x6a, 0x90, 0x8e,
	0xf6, 0x43, 0x14, 0xdd, 0x4d, 0x1f, 0xb2, 0x2e, 0x1c, 0x3b, 0x84, 0x63, 0x1f, 0x7c, 0xb8, 0xf8,
	0x04, 0x6d, 0xe7, 0xa7, 0xc6, 0x5a, 0x59, 0x08, 0xc8, 0x8d, 0x9e, 0xe7, 0x19, 0xbd, 0xea, 0xe6,
	0x9f, 0xa8, 0xef, 0x32, 0x32, 0xc5, 0x57, 0xa9, 0xa8, 0x9d, 0xa4, 0xd7, 0x7e, 0xf4, 0x98, 0x9d,
	0xbf, 0x28, 0x3b, 0xdd, 0x32, 0xee, 0xd0, 0x76, 0x9d, 0xd4, 0x64, 0x92, 0xde, 0x84, 0x28, 0x1a,
	0xc4, 0xbe, 0x26, 0x0c, 0xdf, 0x64, 0x1d, 0x45, 0xef, 0x85, 0x97, 0xd1, 0xdd, 0xf4, 0xc1, 0x7f,
	0x21, 0x5f, 0xea, 0x6d, 0x7c, 0x80, 0x5e, 0xf4, 0xbf, 0x7d, 0x79, 0x82, 0x5e, 0xbd, 0xff, 0xf9,
	0x2b, 0xe8, 0x7d, 0x6a, 0x02, 0xf4, 0xb5, 0x09, 0xd0, 0xef, 0x26, 0xe8, 0xfd, 0x69, 0x02, 0xf4,
	0x79, 0x17, 0xf4, 0xbe, 0xef, 0x02, 0xf4, 0x91, 0x2b, 0xc3, 0x60, 0x29, 0x61, 0x99, 0x6b, 0xe5,
	0x98, 0x96, 0xb0, 0x31, 0x76, 0xc5, 0xcf, 0x7f, 0xc4, 0x7a, 0xc6, 0xab, 0x95, 0xe2, 0x00, 0xba,
	0x4a, 0x92, 0x6b, 0x7f, 0xd7, 0xec, 0x6f, 0x00, 0x00, 0x00, 0xff, 0xff, 0x5c, 0x9e, 0x12, 0x79,
	0x36, 0x02, 0x00, 0x00,
}

func (this *ErrorDetails) Equal(that interface{}) bool {
	if that == nil {
		return this == nil
	}

	that1, ok := that.(*ErrorDetails)
	if !ok {
		that2, ok := that.(ErrorDetails)
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
	if this.Namespace != that1.Namespace {
		return false
	}
	if this.Name != that1.Name {
		return false
	}
	if this.MessageFormat != that1.MessageFormat {
		return false
	}
	if !this.Attributes.Equal(that1.Attributes) {
		return false
	}
	if this.CorrelationId != that1.CorrelationId {
		return false
	}
	if !this.Cause.Equal(that1.Cause) {
		return false
	}
	if this.Code != that1.Code {
		return false
	}
	if len(this.Details) != len(that1.Details) {
		return false
	}
	for i := range this.Details {
		if !this.Details[i].Equal(that1.Details[i]) {
			return false
		}
	}
	return true
}
func NewPopulatedErrorDetails(r randyError, easy bool) *ErrorDetails {
	this := &ErrorDetails{}
	this.Namespace = string(randStringError(r))
	this.Name = string(randStringError(r))
	this.MessageFormat = string(randStringError(r))
	if r.Intn(5) != 0 {
		this.Attributes = types.NewPopulatedStruct(r, easy)
	}
	this.CorrelationId = string(randStringError(r))
	if r.Intn(5) == 0 {
		this.Cause = NewPopulatedErrorDetails(r, easy)
	}
	this.Code = uint32(r.Uint32())
	if r.Intn(5) != 0 {
		v1 := r.Intn(5)
		this.Details = make([]*types.Any, v1)
		for i := 0; i < v1; i++ {
			this.Details[i] = types.NewPopulatedAny(r, easy)
		}
	}
	if !easy && r.Intn(10) != 0 {
	}
	return this
}

type randyError interface {
	Float32() float32
	Float64() float64
	Int63() int64
	Int31() int32
	Uint32() uint32
	Intn(n int) int
}

func randUTF8RuneError(r randyError) rune {
	ru := r.Intn(62)
	if ru < 10 {
		return rune(ru + 48)
	} else if ru < 36 {
		return rune(ru + 55)
	}
	return rune(ru + 61)
}
func randStringError(r randyError) string {
	v2 := r.Intn(100)
	tmps := make([]rune, v2)
	for i := 0; i < v2; i++ {
		tmps[i] = randUTF8RuneError(r)
	}
	return string(tmps)
}
func randUnrecognizedError(r randyError, maxFieldNumber int) (dAtA []byte) {
	l := r.Intn(5)
	for i := 0; i < l; i++ {
		wire := r.Intn(4)
		if wire == 3 {
			wire = 5
		}
		fieldNumber := maxFieldNumber + r.Intn(100)
		dAtA = randFieldError(dAtA, r, fieldNumber, wire)
	}
	return dAtA
}
func randFieldError(dAtA []byte, r randyError, fieldNumber int, wire int) []byte {
	key := uint32(fieldNumber)<<3 | uint32(wire)
	switch wire {
	case 0:
		dAtA = encodeVarintPopulateError(dAtA, uint64(key))
		v3 := r.Int63()
		if r.Intn(2) == 0 {
			v3 *= -1
		}
		dAtA = encodeVarintPopulateError(dAtA, uint64(v3))
	case 1:
		dAtA = encodeVarintPopulateError(dAtA, uint64(key))
		dAtA = append(dAtA, byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)))
	case 2:
		dAtA = encodeVarintPopulateError(dAtA, uint64(key))
		ll := r.Intn(100)
		dAtA = encodeVarintPopulateError(dAtA, uint64(ll))
		for j := 0; j < ll; j++ {
			dAtA = append(dAtA, byte(r.Intn(256)))
		}
	default:
		dAtA = encodeVarintPopulateError(dAtA, uint64(key))
		dAtA = append(dAtA, byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)), byte(r.Intn(256)))
	}
	return dAtA
}
func encodeVarintPopulateError(dAtA []byte, v uint64) []byte {
	for v >= 1<<7 {
		dAtA = append(dAtA, uint8(uint64(v)&0x7f|0x80))
		v >>= 7
	}
	dAtA = append(dAtA, uint8(v))
	return dAtA
}
func (this *ErrorDetails) String() string {
	if this == nil {
		return "nil"
	}
	repeatedStringForDetails := "[]*Any{"
	for _, f := range this.Details {
		repeatedStringForDetails += strings.Replace(fmt.Sprintf("%v", f), "Any", "types.Any", 1) + ","
	}
	repeatedStringForDetails += "}"
	s := strings.Join([]string{`&ErrorDetails{`,
		`Namespace:` + fmt.Sprintf("%v", this.Namespace) + `,`,
		`Name:` + fmt.Sprintf("%v", this.Name) + `,`,
		`MessageFormat:` + fmt.Sprintf("%v", this.MessageFormat) + `,`,
		`Attributes:` + strings.Replace(fmt.Sprintf("%v", this.Attributes), "Struct", "types.Struct", 1) + `,`,
		`CorrelationId:` + fmt.Sprintf("%v", this.CorrelationId) + `,`,
		`Cause:` + strings.Replace(this.Cause.String(), "ErrorDetails", "ErrorDetails", 1) + `,`,
		`Code:` + fmt.Sprintf("%v", this.Code) + `,`,
		`Details:` + repeatedStringForDetails + `,`,
		`}`,
	}, "")
	return s
}
func valueToStringError(v interface{}) string {
	rv := reflect.ValueOf(v)
	if rv.IsNil() {
		return "nil"
	}
	pv := reflect.Indirect(rv).Interface()
	return fmt.Sprintf("*%v", pv)
}
