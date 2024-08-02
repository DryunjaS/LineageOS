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
