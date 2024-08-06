import { NameDevice } from '../interfaces/device'

const DevicePreview = ({
  idDevice,
  deviceName,
}: {
  idDevice: number | null
  deviceName: NameDevice
}) => {
  const handleDevice = () => {
    sessionStorage.setItem('tmp', `${idDevice}`)
  }
  return (
    <div className="bg-[#f6fafa]" onClick={handleDevice}>
      <a
        href={`/devices/${deviceName?.Code === 'Другое' ? 'unknown' : deviceName?.Code}`}
        className="mx-auto flex h-[220px] w-auto flex-col items-center justify-center p-8 scr350:h-[150px] scr350:w-[180px]"
      >
        <img
          src={`${import.meta.env.VITE_URL_SERVER}/images/${deviceName?.Code === 'Другое' || deviceName?.Img === '' ? 'unknown.png' : deviceName?.Img}`}
          className="h-[220px] w-auto scr350:h-[120px]"
          alt={deviceName?.Model}
        />
      </a>
      <a
        href={`/devices/${deviceName?.Code === 'Другое' ? 'unknown' : deviceName?.Code}`}
        className="block h-full bg-[#fff]"
      >
        <div className="mt-4 w-max overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-lg text-primary hover:border-b hover:border-primary">
          {deviceName?.Model}
        </div>
        <div className="w-max text-wrap pl-2 text-[#555555] hover:border-b hover:border-[#555555]">
          {deviceName?.Code}
        </div>
      </a>
    </div>
  )
}

export default DevicePreview
