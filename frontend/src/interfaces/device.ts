export interface NameDevice {
  Model: string
  Code: string
}

export interface InfoDevice {
  Downloads: string
  Guides: string[]
  Special_boot_modes: string[]
  Known_quirks: string[]
  Find_help_online: string
  Report_a_bug: string
}

export interface SpecificDevice {
  Main: { [key: string]: string[] }
  Specifications: { [key: string]: string[] }
  LineageOS_info: { [key: string]: string[] }
}

export interface DeviceType {
  Name: NameDevice
  Info: InfoDevice
  Specific: SpecificDevice
}

export interface VendorType {
  Name: string
  Device: DeviceType
}

export interface PartialDevice {
  vendor: {
    Name: string
    Device: {
      Name: {
        Model: string
        Code: string
      }
    }
  }
}
