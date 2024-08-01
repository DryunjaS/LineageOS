import axios from 'axios'

export async function getDevicesGroupedByVendor() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_SERVER}/device/get-devices-group-vendor`,
  )
  return data
}
export async function createDevice(deviceName: string) {
  if (deviceName.trim().length) {
    const newDevice = {
      name: deviceName,
    }
    await axios.post(
      `${import.meta.env.VITE_URL_SERVER}/device/create-device`,
      newDevice,
    )
  }
}
export async function changeDevice(value: string, id: number | null) {
  if (value.trim().length) {
    const newDevice = {
      id,
      name: value,
    }
    await axios.put(
      `${import.meta.env.VITE_URL_SERVER}/device/update-device/${id}`,
      newDevice,
    )
  }
}
export async function deleteDevice(id: number | null) {
  await axios.delete(
    `${import.meta.env.VITE_URL_SERVER}/device/delete-device/${id}`,
  )
}
