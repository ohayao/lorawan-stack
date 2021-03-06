// Code generated by protoc-gen-fieldmask. DO NOT EDIT.

package ttnpb

import fmt "fmt"

func (dst *ErrorDetails) SetFields(src *ErrorDetails, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "namespace":
			if len(subs) > 0 {
				return fmt.Errorf("'namespace' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Namespace = src.Namespace
			} else {
				var zero string
				dst.Namespace = zero
			}
		case "name":
			if len(subs) > 0 {
				return fmt.Errorf("'name' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Name = src.Name
			} else {
				var zero string
				dst.Name = zero
			}
		case "message_format":
			if len(subs) > 0 {
				return fmt.Errorf("'message_format' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.MessageFormat = src.MessageFormat
			} else {
				var zero string
				dst.MessageFormat = zero
			}
		case "attributes":
			if len(subs) > 0 {
				return fmt.Errorf("'attributes' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Attributes = src.Attributes
			} else {
				dst.Attributes = nil
			}
		case "correlation_id":
			if len(subs) > 0 {
				return fmt.Errorf("'correlation_id' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.CorrelationId = src.CorrelationId
			} else {
				var zero string
				dst.CorrelationId = zero
			}
		case "cause":
			if len(subs) > 0 {
				var newDst, newSrc *ErrorDetails
				if (src == nil || src.Cause == nil) && dst.Cause == nil {
					continue
				}
				if src != nil {
					newSrc = src.Cause
				}
				if dst.Cause != nil {
					newDst = dst.Cause
				} else {
					newDst = &ErrorDetails{}
					dst.Cause = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.Cause = src.Cause
				} else {
					dst.Cause = nil
				}
			}
		case "code":
			if len(subs) > 0 {
				return fmt.Errorf("'code' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Code = src.Code
			} else {
				var zero uint32
				dst.Code = zero
			}
		case "details":
			if len(subs) > 0 {
				return fmt.Errorf("'details' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Details = src.Details
			} else {
				dst.Details = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}
