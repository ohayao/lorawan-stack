// Code generated by protoc-gen-fieldmask. DO NOT EDIT.

package ttnpb

import (
	fmt "fmt"
	time "time"
)

func (dst *ApplicationPackage) SetFields(src *ApplicationPackage, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
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
		case "default_f_port":
			if len(subs) > 0 {
				return fmt.Errorf("'default_f_port' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.DefaultFPort = src.DefaultFPort
			} else {
				var zero uint32
				dst.DefaultFPort = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackages) SetFields(src *ApplicationPackages, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "packages":
			if len(subs) > 0 {
				return fmt.Errorf("'packages' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Packages = src.Packages
			} else {
				dst.Packages = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackageAssociationIdentifiers) SetFields(src *ApplicationPackageAssociationIdentifiers, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "end_device_ids":
			if len(subs) > 0 {
				var newDst, newSrc *EndDeviceIdentifiers
				if src != nil {
					newSrc = &src.EndDeviceIdentifiers
				}
				newDst = &dst.EndDeviceIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.EndDeviceIdentifiers = src.EndDeviceIdentifiers
				} else {
					var zero EndDeviceIdentifiers
					dst.EndDeviceIdentifiers = zero
				}
			}
		case "f_port":
			if len(subs) > 0 {
				return fmt.Errorf("'f_port' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FPort = src.FPort
			} else {
				var zero uint32
				dst.FPort = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackageAssociation) SetFields(src *ApplicationPackageAssociation, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "ids":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationPackageAssociationIdentifiers
				if src != nil {
					newSrc = &src.ApplicationPackageAssociationIdentifiers
				}
				newDst = &dst.ApplicationPackageAssociationIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationPackageAssociationIdentifiers = src.ApplicationPackageAssociationIdentifiers
				} else {
					var zero ApplicationPackageAssociationIdentifiers
					dst.ApplicationPackageAssociationIdentifiers = zero
				}
			}
		case "created_at":
			if len(subs) > 0 {
				return fmt.Errorf("'created_at' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.CreatedAt = src.CreatedAt
			} else {
				var zero time.Time
				dst.CreatedAt = zero
			}
		case "updated_at":
			if len(subs) > 0 {
				return fmt.Errorf("'updated_at' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.UpdatedAt = src.UpdatedAt
			} else {
				var zero time.Time
				dst.UpdatedAt = zero
			}
		case "package_name":
			if len(subs) > 0 {
				return fmt.Errorf("'package_name' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.PackageName = src.PackageName
			} else {
				var zero string
				dst.PackageName = zero
			}
		case "data":
			if len(subs) > 0 {
				return fmt.Errorf("'data' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Data = src.Data
			} else {
				dst.Data = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackageAssociations) SetFields(src *ApplicationPackageAssociations, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "associations":
			if len(subs) > 0 {
				return fmt.Errorf("'associations' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Associations = src.Associations
			} else {
				dst.Associations = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *GetApplicationPackageAssociationRequest) SetFields(src *GetApplicationPackageAssociationRequest, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "ids":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationPackageAssociationIdentifiers
				if src != nil {
					newSrc = &src.ApplicationPackageAssociationIdentifiers
				}
				newDst = &dst.ApplicationPackageAssociationIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationPackageAssociationIdentifiers = src.ApplicationPackageAssociationIdentifiers
				} else {
					var zero ApplicationPackageAssociationIdentifiers
					dst.ApplicationPackageAssociationIdentifiers = zero
				}
			}
		case "field_mask":
			if len(subs) > 0 {
				return fmt.Errorf("'field_mask' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FieldMask = src.FieldMask
			} else {
				dst.FieldMask = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ListApplicationPackageAssociationRequest) SetFields(src *ListApplicationPackageAssociationRequest, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "ids":
			if len(subs) > 0 {
				var newDst, newSrc *EndDeviceIdentifiers
				if src != nil {
					newSrc = &src.EndDeviceIdentifiers
				}
				newDst = &dst.EndDeviceIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.EndDeviceIdentifiers = src.EndDeviceIdentifiers
				} else {
					var zero EndDeviceIdentifiers
					dst.EndDeviceIdentifiers = zero
				}
			}
		case "limit":
			if len(subs) > 0 {
				return fmt.Errorf("'limit' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Limit = src.Limit
			} else {
				var zero uint32
				dst.Limit = zero
			}
		case "page":
			if len(subs) > 0 {
				return fmt.Errorf("'page' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Page = src.Page
			} else {
				var zero uint32
				dst.Page = zero
			}
		case "field_mask":
			if len(subs) > 0 {
				return fmt.Errorf("'field_mask' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FieldMask = src.FieldMask
			} else {
				dst.FieldMask = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *SetApplicationPackageAssociationRequest) SetFields(src *SetApplicationPackageAssociationRequest, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "association":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationPackageAssociation
				if src != nil {
					newSrc = &src.ApplicationPackageAssociation
				}
				newDst = &dst.ApplicationPackageAssociation
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationPackageAssociation = src.ApplicationPackageAssociation
				} else {
					var zero ApplicationPackageAssociation
					dst.ApplicationPackageAssociation = zero
				}
			}
		case "field_mask":
			if len(subs) > 0 {
				return fmt.Errorf("'field_mask' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FieldMask = src.FieldMask
			} else {
				dst.FieldMask = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackageDefaultAssociationIdentifiers) SetFields(src *ApplicationPackageDefaultAssociationIdentifiers, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "application_ids":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationIdentifiers
				if src != nil {
					newSrc = &src.ApplicationIdentifiers
				}
				newDst = &dst.ApplicationIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationIdentifiers = src.ApplicationIdentifiers
				} else {
					var zero ApplicationIdentifiers
					dst.ApplicationIdentifiers = zero
				}
			}
		case "f_port":
			if len(subs) > 0 {
				return fmt.Errorf("'f_port' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FPort = src.FPort
			} else {
				var zero uint32
				dst.FPort = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackageDefaultAssociation) SetFields(src *ApplicationPackageDefaultAssociation, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "ids":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationPackageDefaultAssociationIdentifiers
				if src != nil {
					newSrc = &src.ApplicationPackageDefaultAssociationIdentifiers
				}
				newDst = &dst.ApplicationPackageDefaultAssociationIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationPackageDefaultAssociationIdentifiers = src.ApplicationPackageDefaultAssociationIdentifiers
				} else {
					var zero ApplicationPackageDefaultAssociationIdentifiers
					dst.ApplicationPackageDefaultAssociationIdentifiers = zero
				}
			}
		case "created_at":
			if len(subs) > 0 {
				return fmt.Errorf("'created_at' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.CreatedAt = src.CreatedAt
			} else {
				var zero time.Time
				dst.CreatedAt = zero
			}
		case "updated_at":
			if len(subs) > 0 {
				return fmt.Errorf("'updated_at' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.UpdatedAt = src.UpdatedAt
			} else {
				var zero time.Time
				dst.UpdatedAt = zero
			}
		case "package_name":
			if len(subs) > 0 {
				return fmt.Errorf("'package_name' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.PackageName = src.PackageName
			} else {
				var zero string
				dst.PackageName = zero
			}
		case "data":
			if len(subs) > 0 {
				return fmt.Errorf("'data' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Data = src.Data
			} else {
				dst.Data = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ApplicationPackageDefaultAssociations) SetFields(src *ApplicationPackageDefaultAssociations, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "defaults":
			if len(subs) > 0 {
				return fmt.Errorf("'defaults' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Defaults = src.Defaults
			} else {
				dst.Defaults = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *GetApplicationPackageDefaultAssociationRequest) SetFields(src *GetApplicationPackageDefaultAssociationRequest, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "ids":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationPackageDefaultAssociationIdentifiers
				if src != nil {
					newSrc = &src.ApplicationPackageDefaultAssociationIdentifiers
				}
				newDst = &dst.ApplicationPackageDefaultAssociationIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationPackageDefaultAssociationIdentifiers = src.ApplicationPackageDefaultAssociationIdentifiers
				} else {
					var zero ApplicationPackageDefaultAssociationIdentifiers
					dst.ApplicationPackageDefaultAssociationIdentifiers = zero
				}
			}
		case "field_mask":
			if len(subs) > 0 {
				return fmt.Errorf("'field_mask' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FieldMask = src.FieldMask
			} else {
				dst.FieldMask = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ListApplicationPackageDefaultAssociationRequest) SetFields(src *ListApplicationPackageDefaultAssociationRequest, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "ids":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationIdentifiers
				if src != nil {
					newSrc = &src.ApplicationIdentifiers
				}
				newDst = &dst.ApplicationIdentifiers
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationIdentifiers = src.ApplicationIdentifiers
				} else {
					var zero ApplicationIdentifiers
					dst.ApplicationIdentifiers = zero
				}
			}
		case "limit":
			if len(subs) > 0 {
				return fmt.Errorf("'limit' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Limit = src.Limit
			} else {
				var zero uint32
				dst.Limit = zero
			}
		case "page":
			if len(subs) > 0 {
				return fmt.Errorf("'page' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Page = src.Page
			} else {
				var zero uint32
				dst.Page = zero
			}
		case "field_mask":
			if len(subs) > 0 {
				return fmt.Errorf("'field_mask' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FieldMask = src.FieldMask
			} else {
				dst.FieldMask = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *SetApplicationPackageDefaultAssociationRequest) SetFields(src *SetApplicationPackageDefaultAssociationRequest, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "default":
			if len(subs) > 0 {
				var newDst, newSrc *ApplicationPackageDefaultAssociation
				if src != nil {
					newSrc = &src.ApplicationPackageDefaultAssociation
				}
				newDst = &dst.ApplicationPackageDefaultAssociation
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.ApplicationPackageDefaultAssociation = src.ApplicationPackageDefaultAssociation
				} else {
					var zero ApplicationPackageDefaultAssociation
					dst.ApplicationPackageDefaultAssociation = zero
				}
			}
		case "field_mask":
			if len(subs) > 0 {
				return fmt.Errorf("'field_mask' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.FieldMask = src.FieldMask
			} else {
				dst.FieldMask = nil
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}