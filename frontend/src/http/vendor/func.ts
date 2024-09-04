import { VendorType } from '../../interfaces/vendor'
import { $api, $authApi } from '..'

export async function getVendors() {
  const { data } = await $api.get('vendor/get-vendors')

  data.sort((a: VendorType, b: VendorType) => {
    if (a.id === null || b.id === null) {
      return 0
    }
    return a.id - b.id
  })

  return data
}
export async function createVendor(vendorName: string) {
  if (vendorName.trim().length) {
    const newVendor = {
      id: 1,
      name: vendorName.trim(),
    }
    await $authApi.post('vendor/create-vendor', newVendor)
  }
}
export async function changeVendor(value: string, id: number | null) {
  if (value.trim().length) {
    const newVendor = {
      id,
      name: value,
    }
    await $authApi.put(`vendor/update-vendor/${id}`, newVendor)
  }
}
export async function deleteVendor(id: number | null) {
  await $authApi.delete(`vendor/delete-vendor/${id}`)
}
