import axios from 'axios'
import { DevicesGroupType } from '../../page/DevicesADMIN'
import { DeviceType } from '../../interfaces/device'

export async function getDeviceByID(id: number) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_SERVER}/device/get-device/${id}`,
  )
  return data
}

export async function getDevicesGroupedByVendor() {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL_SERVER}/device/get-devices-group-vendor`,
  )
  data.sort((a: DevicesGroupType, b: DevicesGroupType) => a.id - b.id)
  return data
}
export async function createDevice(device: DeviceType) {
  if (device.name.Model.trim().length && device.name.Code.trim().length) {
    const newDevice = {
      vendor: device.vendor,
      name: device.name,
      info: device.info,
      specific: device.specific,
    }
    await axios.post(
      `${import.meta.env.VITE_URL_SERVER}/device/create-device`,
      newDevice,
    )
  }
}
export async function changeDevice(device: DeviceType, id: number | null) {
  if (device.name.Model.trim().length && device.name.Code.trim().length) {
    const newDevice = {
      vendor: device.vendor,
      name: device.name,
      info: device.info,
      specific: device.specific,
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

export async function changeInputDevice(changeDevice: DeviceType, id: number) {
  await axios.put(
    `${import.meta.env.VITE_URL_SERVER}/device/update-device/${id}`,
    changeDevice,
  )
}

export async function uploadImgDevice(image: any, id: number) {
  const formData = new FormData()
  formData.append('image', image)
  console.log(image)
  await axios.post(
    `${import.meta.env.VITE_URL_SERVER}/device/upload-img-device/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
