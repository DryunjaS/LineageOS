import { NameDevice } from './device'

export interface VendorType {
  id: number | null
  name: string
}

export interface ActionVendorType {
  type: string
  id: number | null
  name: string
}
export interface ActionDeviceType {
  type: string
  id: number | null
  model: string
  code: string
}

interface Device {
  id: number
  name: NameDevice
}
export interface VendorGroupDevice {
  id: number
  name: string
  devices: Device[]
}
