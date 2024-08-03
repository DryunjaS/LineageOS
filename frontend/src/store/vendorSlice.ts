import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VendorGroupDevice } from '../interfaces/vendor'
import { NameDevice } from '../interfaces/device'

export interface VendorState {
  vendors: VendorGroupDevice[]
}

const initialState: VendorState = {
  vendors: [],
}

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    addVendor(state, action: PayloadAction<{ id: number; name: string }>) {
      state.vendors.push({
        id: action.payload.id,
        name: action.payload.name,
        devices: [],
      })
    },
    updateVendor(state, action: PayloadAction<{ id: number; name: string }>) {
      const index = state.vendors.findIndex(
        (vendor) => vendor.id === action.payload.id,
      )
      if (index !== -1) {
        state.vendors[index] = {
          ...state.vendors[index],
          name: action.payload.name,
        }
      }
    },
    removeVendor(state, action: PayloadAction<{ id: number }>) {
      state.vendors = state.vendors.filter(
        (vendor) => vendor.id !== action.payload.id,
      )
    },
    setVendors(state, action: PayloadAction<VendorGroupDevice[]>) {
      state.vendors = action.payload
    },

    addDevicetoVendor(
      state,
      action: PayloadAction<{ idVendor: number; Model: string; Code: string }>,
    ) {
      const index = state.vendors.findIndex(
        (vendor) => vendor.id === action.payload.idVendor,
      )
      if (index !== -1) {
        state.vendors[index].devices = [
          ...state.vendors[index].devices,
          {
            id: 123,
            name: {
              Model: action.payload.Model,
              Code: action.payload.Code,
            },
          },
        ]
      }
    },
    updateDevicetoVendor(
      state,
      action: PayloadAction<{
        idVendor: number
        idDevice: number
        data: NameDevice
      }>,
    ) {
      const { idVendor, idDevice, data } = action.payload
      const vendorIndex = state.vendors.findIndex(
        (vendor) => vendor.id === idVendor,
      )

      if (vendorIndex !== -1) {
        const deviceIndex = state.vendors[vendorIndex].devices.findIndex(
          (device) => device.id === idDevice,
        )
        if (deviceIndex !== -1) {
          state.vendors[vendorIndex].devices[deviceIndex].name = data
        }
      }
    },
    removeDevicetoVendor(
      state,
      action: PayloadAction<{ idVendor: number; idDevice: number }>,
    ) {
      const { idVendor, idDevice } = action.payload
      const vendorIndex = state.vendors.findIndex(
        (vendor) => vendor.id === idVendor,
      )

      if (vendorIndex !== -1) {
        state.vendors[vendorIndex].devices = state.vendors[
          vendorIndex
        ].devices.filter((device) => device.id !== idDevice)
      }
    },
  },
})

export const {
  addVendor,
  updateVendor,
  removeVendor,
  setVendors,
  addDevicetoVendor,
  updateDevicetoVendor,
  removeDevicetoVendor,
} = vendorSlice.actions
export default vendorSlice.reducer
