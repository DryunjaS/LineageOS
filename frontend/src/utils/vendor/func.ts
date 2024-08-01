import axios from 'axios'

export async function getVendors() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_SERVER}/vendor/get-vendors`,
  )
  return data
}
export async function createVendor(vendorName: string) {
  if (vendorName.trim().length) {
    const newVendor = {
      name: vendorName,
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
