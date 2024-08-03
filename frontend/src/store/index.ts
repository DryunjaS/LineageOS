import { configureStore } from '@reduxjs/toolkit'
import vendorReduser from './vendorSlice'

export default configureStore({
  reducer: { vendor: vendorReduser },
})
