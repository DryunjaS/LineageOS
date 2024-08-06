export interface NameDevice {
  Model: string
  Code: string
  Img: string
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
  id: number
  name: NameDevice
  info: InfoDevice
  specific: SpecificDevice
  vendor: number
}

export interface deviceInfoType {
  name: NameDevice | undefined
  field: string
}
