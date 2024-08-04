import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDevice } from '../store/deviceSlice'

const DevicePreview = ({
  idDevice,
  code,
  model,
}: {
  idDevice: number | null
  code: string
  model: string
}) => {
  const dispatch = useDispatch()

  const handleDevice = () => {
    const currentDevice = {
      id: idDevice,
      name: {
        Model: model,
        Code: code,
      },
    }
    sessionStorage.setItem('tmp', `${idDevice}`)
  }
  return (
    <div className="bg-[#f6fafa]" onClick={handleDevice}>
      <a
        href={`/devices/${code === 'Другое' ? 'unknown' : code}`}
        className="mx-auto flex h-[220px] w-auto flex-col items-center justify-center p-8 scr350:h-[150px] scr350:w-[180px]"
      >
        <img
          src={`/images/${code === 'Другое' ? 'unknown' : code}.png`}
          className="h-[220px] w-auto scr350:h-[120px]"
          alt={model}
        />
      </a>
      <a
        href={`/devices/${code === 'Другое' ? 'unknown' : code}`}
        className="block h-full bg-[#fff]"
      >
        <div className="mt-4 w-max overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-lg text-primary hover:border-b hover:border-primary">
          {model}
        </div>
        <div className="w-max text-wrap pl-2 text-[#555555] hover:border-b hover:border-[#555555]">
          {code}
        </div>
      </a>
    </div>
  )
}

export default DevicePreview
