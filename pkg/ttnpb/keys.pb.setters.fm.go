// Code generated by protoc-gen-fieldmask. DO NOT EDIT.

package ttnpb

import fmt "fmt"

func (dst *KeyEnvelope) SetFields(src *KeyEnvelope, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "key":
			if len(subs) > 0 {
				return fmt.Errorf("'key' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Key = src.Key
			} else {
				dst.Key = nil
			}
		case "kek_label":
			if len(subs) > 0 {
				return fmt.Errorf("'kek_label' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.KekLabel = src.KekLabel
			} else {
				var zero string
				dst.KekLabel = zero
			}
		case "encrypted_key":
			if len(subs) > 0 {
				return fmt.Errorf("'encrypted_key' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.EncryptedKey = src.EncryptedKey
			} else {
				dst.EncryptedKey = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *RootKeys) SetFields(src *RootKeys, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "root_key_id":
			if len(subs) > 0 {
				return fmt.Errorf("'root_key_id' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.RootKeyId = src.RootKeyId
			} else {
				var zero string
				dst.RootKeyId = zero
			}
		case "app_key":
			if len(subs) > 0 {
				var newDst, newSrc *KeyEnvelope
				if (src == nil || src.AppKey == nil) && dst.AppKey == nil {
					continue
				}
				if src != nil {
					newSrc = src.AppKey
				}
				if dst.AppKey != nil {
					newDst = dst.AppKey
				} else {
					newDst = &KeyEnvelope{}
					dst.AppKey = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.AppKey = src.AppKey
				} else {
					dst.AppKey = nil
				}
			}
		case "nwk_key":
			if len(subs) > 0 {
				var newDst, newSrc *KeyEnvelope
				if (src == nil || src.NwkKey == nil) && dst.NwkKey == nil {
					continue
				}
				if src != nil {
					newSrc = src.NwkKey
				}
				if dst.NwkKey != nil {
					newDst = dst.NwkKey
				} else {
					newDst = &KeyEnvelope{}
					dst.NwkKey = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.NwkKey = src.NwkKey
				} else {
					dst.NwkKey = nil
				}
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *SessionKeys) SetFields(src *SessionKeys, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "session_key_id":
			if len(subs) > 0 {
				return fmt.Errorf("'session_key_id' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.SessionKeyId = src.SessionKeyId
			} else {
				dst.SessionKeyId = nil
			}
		case "f_nwk_s_int_key":
			if len(subs) > 0 {
				var newDst, newSrc *KeyEnvelope
				if (src == nil || src.FNwkSIntKey == nil) && dst.FNwkSIntKey == nil {
					continue
				}
				if src != nil {
					newSrc = src.FNwkSIntKey
				}
				if dst.FNwkSIntKey != nil {
					newDst = dst.FNwkSIntKey
				} else {
					newDst = &KeyEnvelope{}
					dst.FNwkSIntKey = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.FNwkSIntKey = src.FNwkSIntKey
				} else {
					dst.FNwkSIntKey = nil
				}
			}
		case "s_nwk_s_int_key":
			if len(subs) > 0 {
				var newDst, newSrc *KeyEnvelope
				if (src == nil || src.SNwkSIntKey == nil) && dst.SNwkSIntKey == nil {
					continue
				}
				if src != nil {
					newSrc = src.SNwkSIntKey
				}
				if dst.SNwkSIntKey != nil {
					newDst = dst.SNwkSIntKey
				} else {
					newDst = &KeyEnvelope{}
					dst.SNwkSIntKey = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.SNwkSIntKey = src.SNwkSIntKey
				} else {
					dst.SNwkSIntKey = nil
				}
			}
		case "nwk_s_enc_key":
			if len(subs) > 0 {
				var newDst, newSrc *KeyEnvelope
				if (src == nil || src.NwkSEncKey == nil) && dst.NwkSEncKey == nil {
					continue
				}
				if src != nil {
					newSrc = src.NwkSEncKey
				}
				if dst.NwkSEncKey != nil {
					newDst = dst.NwkSEncKey
				} else {
					newDst = &KeyEnvelope{}
					dst.NwkSEncKey = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.NwkSEncKey = src.NwkSEncKey
				} else {
					dst.NwkSEncKey = nil
				}
			}
		case "app_s_key":
			if len(subs) > 0 {
				var newDst, newSrc *KeyEnvelope
				if (src == nil || src.AppSKey == nil) && dst.AppSKey == nil {
					continue
				}
				if src != nil {
					newSrc = src.AppSKey
				}
				if dst.AppSKey != nil {
					newDst = dst.AppSKey
				} else {
					newDst = &KeyEnvelope{}
					dst.AppSKey = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.AppSKey = src.AppSKey
				} else {
					dst.AppSKey = nil
				}
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}
