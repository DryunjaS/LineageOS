import axios from 'axios'
import { VendorType } from '../../interfaces/vendor'
export async function getVendors() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_SERVER}/vendor/get-vendors`,
  )
  data.sort((a: VendorType, b: VendorType) => a.id - b.id)
  return data
}
export async function createVendor(vendorName: string) {
  console.log(vendorName)

  if (vendorName.trim().length) {
    const newVendor = {
      id: 1,
      name: vendorName.trim(),
    }
    await axios.post(
      `${import.meta.env.VITE_URL_SERVER}/vendor/create-vendor`,
      newVendor,
    )
  }
}
export async function changeVendor(value: string, id: number | null) {
  if (value.trim().length) {
    const newVendor = {
      id,
      name: value,
    }
    await axios.put(
      `${import.meta.env.VITE_URL_SERVER}/vendor/update-vendor/${id}`,
      newVendor,
    )
  }
}
export async function deleteVendor(id: number | null) {
  await axios.delete(
    `${import.meta.env.VITE_URL_SERVER}/vendor/delete-vendor/${id}`,
  )
}
