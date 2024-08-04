import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NameDevice } from '../interfaces/device'

interface Device {
  id: number | null
  name: NameDevice
}

export interface DeviceState {
  devices: Device | null
}

const initialState: DeviceState = {
  devices: null,
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setCurrentDevice(state, action: PayloadAction<Device>) {
      state.devices = action.payload
    },
  },
})

export const { setCurrentDevice } = deviceSlice.actions
export default deviceSlice.reducer
