import axios from 'axios'
import { DevicesGroupType } from '../../page/DevicesADMIN'
import {
  Category,
  DeviceType,
  InfoDevice,
  IresultCheak,
  NameDevice,
  SpecificDevice,
} from '../../interfaces/device'
import { VendorGroupDevice } from '../../interfaces/vendor'

export interface DeviceTypeCreate {
  id: number | null
  name: NameDevice
  info: InfoDevice
  specific: SpecificDevice
  vendor: {
    id: number
    name: string
  }
}
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
export async function createDevice(device: DeviceTypeCreate) {
  if (device.name.Model.trim().length && device.name.Code.trim().length) {
    const newDevice = {
      ...device,
      id: 123,
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
      ...device,
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
export async function filterDevice(device: Category[]): Promise<{
  groupedDevices: VendorGroupDevice[]
  filteredDevicesCount: number
  totalDevicesCount: number
}> {
  const resultState: IresultCheak[] = []

  // Формируем массив критериев фильтрации
  device.forEach((item) => {
    const arrOptionsTrue: string[] = []
    item.options.forEach((option) => {
      if (option.check === true) {
        arrOptionsTrue.push(option.text)
      }
    })

    const itemResult = {
      category: item.category,
      optionsTrue: arrOptionsTrue,
    }

    resultState.push(itemResult)
  })

  try {
    const response = await axios.post<{
      groupedDevices: VendorGroupDevice[]
      filteredDevicesCount: number
      totalDevicesCount: number
    }>(`${import.meta.env.VITE_URL_SERVER}/device/filter-device/`, resultState)

    return response.data
  } catch (error) {
    console.error('Error while filtering device data:', error)
    throw new Error('Failed to filter devices') // Бросаем ошибку для обработки выше по стеку
  }
}
