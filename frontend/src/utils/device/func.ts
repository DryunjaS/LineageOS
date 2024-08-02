import axios from 'axios'
import { DevicesGroupType } from '../../page/DevicesADMIN'
import { DeviceType } from '../../interfaces/device'

export async function getDevicesGroupedByVendor() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_SERVER}/device/get-devices-group-vendor`,
  )
  data.sort((a: DevicesGroupType, b: DevicesGroupType) => a.id - b.id)
  return data
}
export async function createDevice(device: DeviceType) {
  if (device.Name.Model.trim().length && device.Name.Code.trim().length) {
    const newDevice = {
      vendor: device.vendor,
      name: device.Name,
      info: device.Info,
      specific: device.Specific,
    }
    await axios.post(
      `${import.meta.env.VITE_URL_SERVER}/device/create-device`,
      newDevice,
    )
  }
}
export async function changeDevice(device: DeviceType, id: number | null) {
  if (device.Name.Model.trim().length && device.Name.Code.trim().length) {
    const newDevice = {
      vendor: device.vendor,
      name: device.Name,
      info: device.Info,
      specific: device.Specific,
    }
    console.log(newDevice)
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
