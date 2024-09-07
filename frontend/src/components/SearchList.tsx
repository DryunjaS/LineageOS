import { useEffect, useState } from 'react'
import { getDevicesGroupedByVendor } from '../http/device/func'
import { DevicesGroupItemType, DevicesGroupType } from '../page/DevicesADMIN'
import { useNavigate } from 'react-router-dom'

const SearchList = ({ search }: { search: string }) => {
  const [filteredList, setFilteredList] = useState<DevicesGroupItemType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const searchToPage = async () => {
    setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchAndFilterData = async () => {
      const filteredData = await searchToPage()
      setFilteredList(filteredData)
    }

    fetchAndFilterData()
  }, [search])

  const onSelect = (deviceCode: string, deviceID: number | null) => {
    sessionStorage.setItem('tmp', `${deviceID}`)
    navigate(`/devices/${deviceCode}`)
  }

  return (
    <div className="z-20 w-64 rounded-lg bg-white p-4 shadow-lg">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="mr-2 h-5 w-5 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Загрузка...
        </div>
      ) : filteredList.length === 0 ? (
        <div className="text-center text-gray-500">
          Нет результатов для "{search}"
        </div>
      ) : (
        <ul className="max-h-[200px] divide-y divide-gray-200 overflow-y-auto md:max-h-[400px]">
          {filteredList.map((device, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 text-primary transition-colors duration-200 hover:bg-gray-100"
              onMouseDown={() => onSelect(device.name.Code, device.id)}
            >
              {device.name.Model}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchList
