// Code generated by protoc-gen-fieldmask. DO NOT EDIT.

package ttnpb

import (
	fmt "fmt"
	time "time"
)

func (dst *ConcentratorConfig) SetFields(src *ConcentratorConfig, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "channels":
			if len(subs) > 0 {
				return fmt.Errorf("'channels' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Channels = src.Channels
			} else {
				dst.Channels = nil
			}
		case "lora_standard_channel":
			if len(subs) > 0 {
				var newDst, newSrc *ConcentratorConfig_LoRaStandardChannel
				if (src == nil || src.LoraStandardChannel == nil) && dst.LoraStandardChannel == nil {
					continue
				}
				if src != nil {
					newSrc = src.LoraStandardChannel
				}
				if dst.LoraStandardChannel != nil {
					newDst = dst.LoraStandardChannel
				} else {
					newDst = &ConcentratorConfig_LoRaStandardChannel{}
					dst.LoraStandardChannel = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.LoraStandardChannel = src.LoraStandardChannel
				} else {
					dst.LoraStandardChannel = nil
				}
			}
		case "fsk_channel":
			if len(subs) > 0 {
				var newDst, newSrc *ConcentratorConfig_FSKChannel
				if (src == nil || src.FskChannel == nil) && dst.FskChannel == nil {
					continue
				}
				if src != nil {
					newSrc = src.FskChannel
				}
				if dst.FskChannel != nil {
					newDst = dst.FskChannel
				} else {
					newDst = &ConcentratorConfig_FSKChannel{}
					dst.FskChannel = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.FskChannel = src.FskChannel
				} else {
					dst.FskChannel = nil
				}
			}
		case "lbt":
			if len(subs) > 0 {
				var newDst, newSrc *ConcentratorConfig_LBTConfiguration
				if (src == nil || src.Lbt == nil) && dst.Lbt == nil {
					continue
				}
				if src != nil {
					newSrc = src.Lbt
				}
				if dst.Lbt != nil {
					newDst = dst.Lbt
				} else {
					newDst = &ConcentratorConfig_LBTConfiguration{}
					dst.Lbt = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.Lbt = src.Lbt
				} else {
					dst.Lbt = nil
				}
			}
		case "ping_slot":
			if len(subs) > 0 {
				var newDst, newSrc *ConcentratorConfig_Channel
				if (src == nil || src.PingSlot == nil) && dst.PingSlot == nil {
					continue
				}
				if src != nil {
					newSrc = src.PingSlot
				}
				if dst.PingSlot != nil {
					newDst = dst.PingSlot
				} else {
					newDst = &ConcentratorConfig_Channel{}
					dst.PingSlot = newDst
				}
				if err := newDst.SetFields(newSrc, subs...); err != nil {
					return err
				}
			} else {
				if src != nil {
					dst.PingSlot = src.PingSlot
				} else {
					dst.PingSlot = nil
				}
			}
		case "radios":
			if len(subs) > 0 {
				return fmt.Errorf("'radios' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Radios = src.Radios
			} else {
				dst.Radios = nil
			}
		case "clock_source":
			if len(subs) > 0 {
				return fmt.Errorf("'clock_source' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.ClockSource = src.ClockSource
			} else {
				var zero uint32
				dst.ClockSource = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ConcentratorConfig_Channel) SetFields(src *ConcentratorConfig_Channel, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "frequency":
			if len(subs) > 0 {
				return fmt.Errorf("'frequency' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Frequency = src.Frequency
			} else {
				var zero uint64
				dst.Frequency = zero
			}
		case "radio":
			if len(subs) > 0 {
				return fmt.Errorf("'radio' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Radio = src.Radio
			} else {
				var zero uint32
				dst.Radio = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ConcentratorConfig_LoRaStandardChannel) SetFields(src *ConcentratorConfig_LoRaStandardChannel, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "frequency":
			if len(subs) > 0 {
				return fmt.Errorf("'frequency' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Frequency = src.Frequency
			} else {
				var zero uint64
				dst.Frequency = zero
			}
		case "radio":
			if len(subs) > 0 {
				return fmt.Errorf("'radio' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Radio = src.Radio
			} else {
				var zero uint32
				dst.Radio = zero
			}
		case "bandwidth":
			if len(subs) > 0 {
				return fmt.Errorf("'bandwidth' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Bandwidth = src.Bandwidth
			} else {
				var zero uint32
				dst.Bandwidth = zero
			}
		case "spreading_factor":
			if len(subs) > 0 {
				return fmt.Errorf("'spreading_factor' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.SpreadingFactor = src.SpreadingFactor
			} else {
				var zero uint32
				dst.SpreadingFactor = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ConcentratorConfig_FSKChannel) SetFields(src *ConcentratorConfig_FSKChannel, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "frequency":
			if len(subs) > 0 {
				return fmt.Errorf("'frequency' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Frequency = src.Frequency
			} else {
				var zero uint64
				dst.Frequency = zero
			}
		case "radio":
			if len(subs) > 0 {
				return fmt.Errorf("'radio' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.Radio = src.Radio
			} else {
				var zero uint32
				dst.Radio = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}

func (dst *ConcentratorConfig_LBTConfiguration) SetFields(src *ConcentratorConfig_LBTConfiguration, paths ...string) error {
	for name, subs := range _processPaths(paths) {
		switch name {
		case "rssi_target":
			if len(subs) > 0 {
				return fmt.Errorf("'rssi_target' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.RssiTarget = src.RssiTarget
			} else {
				var zero float32
				dst.RssiTarget = zero
			}
		case "rssi_offset":
			if len(subs) > 0 {
				return fmt.Errorf("'rssi_offset' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.RssiOffset = src.RssiOffset
			} else {
				var zero float32
				dst.RssiOffset = zero
			}
		case "scan_time":
			if len(subs) > 0 {
				return fmt.Errorf("'scan_time' has no subfields, but %s were specified", subs)
			}
			if src != nil {
				dst.ScanTime = src.ScanTime
			} else {
				var zero time.Duration
				dst.ScanTime = zero
			}

		default:
			return fmt.Errorf("invalid field: '%s'", name)
		}
	}
	return nil
}
