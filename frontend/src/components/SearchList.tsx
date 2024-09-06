import { useEffect, useState } from 'react'
import { getDevicesGroupedByVendor } from '../http/device/func'
import { DevicesGroupItemType, DevicesGroupType } from '../page/DevicesADMIN'
import { useNavigate } from 'react-router-dom'

const SearchList = ({ search }: { search: string }) => {
  const [filteredList, setFilteredList] = useState<DevicesGroupItemType[]>([]) // Массив строк
  const navigate = useNavigate()

  const searchToPage = async () => {
    try {
      const response: DevicesGroupType[] = await getDevicesGroupedByVendor()

      const filteredDevices = response.flatMap((item) =>
        item.devices
          .filter((device) =>
            device.name.Model.toLowerCase().includes(search.toLowerCase()),
          )
          .map((device) => device),
      )

      return filteredDevices
    } catch (error) {
      console.error('Error fetching devices:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const filteredData = await searchToPage()
      setFilteredList(filteredData) // Обновляем массив названий моделей
    }

    fetchAndFilterData()
  }, [search])

  const onSelect = (deviceCode: string, deviceID: number | null) => {
    console.log(deviceID)
    sessionStorage.setItem('tmp', `${deviceID}`)
    navigate(`/devices/${deviceCode}`)
  }

  return (
    <div className="absolute right-5 top-20 z-20 w-64 rounded-lg bg-white p-4 shadow-lg">
      <ul className="divide-y divide-gray-200">
        {filteredList.map((device, index) => (
          <li
            key={index}
            className="cursor-pointer p-2 text-primary transition-colors duration-200 hover:bg-gray-100"
            onMouseDown={() => onSelect(device.name.Code, device.id)} // Используем onMouseDown
          >
            {device.name.Model}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
