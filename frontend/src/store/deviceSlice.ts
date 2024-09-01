import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NameDevice } from '../interfaces/device'

interface Device {
  id: number | null
  name: NameDevice
}

export interface DeviceState {
  devices: Device | null
  filteredDevicesCount: number
  totalDevicesCount: number
}

// Изменяем тип для payload, чтобы он содержал два значения
interface CountPayload {
  filteredDevicesCount: number
  totalDevicesCount: number
}

const initialState: DeviceState = {
  devices: null,
  filteredDevicesCount: 0,
  totalDevicesCount: 0,
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setCurrentDevice(state, action: PayloadAction<Device>) {
      state.devices = action.payload
    },
    setFilteredDevicesCount(state, action: PayloadAction<CountPayload>) {
      state.filteredDevicesCount = action.payload.filteredDevicesCount
      state.totalDevicesCount = action.payload.totalDevicesCount
    },
  },
})

export const { setCurrentDevice, setFilteredDevicesCount } = deviceSlice.actions
export default deviceSlice.reducer
