import { configureStore } from '@reduxjs/toolkit'
import vendorReducer from './vendorSlice'
import deviceReducer from './deviceSlice'

const store = configureStore({
  reducer: {
    vendor: vendorReducer,
    device: deviceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
