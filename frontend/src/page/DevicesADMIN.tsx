import { useEffect, useState } from 'react'
import NavDevice from '../components/NavDevice'
import Modal from '../components/Modals/Modal'
import ModalCreateDevice from '../components/Modals/ModalCreateDevice'
import { getVendors } from '../utils/vendor/func'
import ModalVendor from '../components/Modals/ModalVendor'
import { ActionType, VendorType } from '../interfaces/vendor'
import { NameDevice } from '../interfaces/device'
import { getDevicesGroupedByVendor } from '../utils/device/func'
import DevicePreview from '../components/DevicePreview'

interface DevicesGroupItemType {
  id: number | null
  name: NameDevice
}
export interface DevicesGroupType {
  id: number | null
  name: string
  devices: DevicesGroupItemType[]
}
const DevicesADMIN = () => {
  const [showNavBar, setShowNavBar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showModalDevice, setShowModalDevice] = useState(false)
  const [showModalVendor, setShowModalVendor] = useState(false)
  const [vendorArr, setVendorArr] = useState<VendorType[]>([])
  const [devicesGroup, setDevicesGroup] = useState<DevicesGroupType[]>([])
  const [action, setAction] = useState<ActionType>({ type: '', id: null })

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavBar(false)
    } else {
      setShowNavBar(true)
    }
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  useEffect(() => {
    getVendors()
      .then((response) => {
        setVendorArr(response)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    getDevicesGroupedByVendor()
      .then((response) => {
        setDevicesGroup(response)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const addVendor = () => {
    setShowModalVendor(true)
    setAction({
      type: 'Добавить',
      id: null,
    })
  }
  const changeVendor = (changeID: number) => {
    setShowModalVendor(true)
    setAction({
      type: 'Изменить',
      id: changeID,
    })
  }
  const deleteVendor = (deleteID: number) => {
    setShowModalVendor(true)
    setAction({
      type: 'Удалить',
      id: deleteID,
    })
  }
  return (
    <div className="flex min-h-screen flex-col">
      <ModalCreateDevice show={showModalDevice} setShow={setShowModalDevice} />
      <ModalVendor
        show={showModalVendor}
        setShow={setShowModalVendor}
        action={action}
      />
      <Modal show={showModal} setShow={setShowModal} />
      <div
        className={`fixed left-0 top-0 w-full bg-white transition-transform duration-300 ${
          showNavBar ? 'translate-y-0 transform' : '-translate-y-full transform'
        }`}
      >
        <NavDevice />
      </div>
      <main className="mt-24 w-full flex-1">
        <div className="mx-auto w-[300px] px-2 scr350:w-11/12">
          <h1 className="mb-5 text-5xl font-light">Устройства</h1>
          <p className="mb-5 font-light">
            Устройства с более низкой прозрачностью изображения больше
            официально не поддерживаются, и страницы существуют только для
            ознакомления.
            <br />
            Вы можете отобразить их, отключив "Скрывать снятые с производства
            устройства" в фильтрах устройств ниже:
          </p>
          <button
            className="rounded-[0.2rem] bg-primary px-6 py-3 text-xs uppercase text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
            onClick={() => setShowModal(true)}
          >
            Фильтр (<span>195</span> из 483 показанныx)
          </button>

          <div className="mx-auto mt-5">
            <h2 className="font-light" id="devices">
              Выберите поставщика, к которому нужно перейти:
            </h2>

            <div className="grid grid-cols-2 gap-2 rounded-[4px] border border-[#e8e8e8] p-1 lg:grid-cols-3">
              {vendorArr.map((vendor, index) => (
                <div className="flex items-center">
                  <span
                    className="cursor-pointer py-1"
                    onClick={() => deleteVendor(vendor.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>

                  <div key={index} className="p-2 text-primary">
                    <a
                      href={`#${vendor.name}`}
                      className="hover:border-b hover:border-primary"
                    >
                      {vendor.name}
                    </a>
                  </div>
                  <span
                    className="cursor-pointer py-1"
                    onClick={() => changeVendor(vendor.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </span>
                </div>
              ))}
              <div
                className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-lg bg-primary text-white transition-transform duration-200 hover:scale-110"
                title="Добавить поставщика"
                onClick={addVendor}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
            </div>

            {devicesGroup.map((group, index) => (
              <div key={index} className="mx-auto w-[240px] scr350:w-auto">
                <div id={group.name} className="mt-14 pb-5">
                  <h2 className="mb-4 text-3xl font-light">{group.name}</h2>
                  <a href="#devices" className="mb-4 block text-primary">
                    ▲ На верх
                  </a>
                  <div className="grid grid-cols-1 gap-y-4 scr350:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {group.devices.map((device, deviceIndex) => (
                      <DevicePreview
                        key={deviceIndex}
                        code={device.name.Code}
                        model={device.name.Model}
                      />
                    ))}
                    <DevicePreview code={'Другое'} model={'Другое'} />
                    <div
                      className="m-auto flex aspect-square w-20 cursor-pointer items-center justify-center rounded-lg bg-primary text-white transition-transform duration-200 hover:scale-110"
                      title="Добавить устройство"
                      onClick={() => setShowModalDevice(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-10 w-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="mt-10 flex h-auto items-center bg-[#f8f9fa] lg:h-[115px]">
        <div className="mx-auto flex h-auto w-11/12 flex-wrap items-center justify-center py-4 md:justify-between lg:w-4/5">
          <div className="my-auto flex w-auto flex-col items-center text-center lg:items-start lg:text-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 24"
              className="my-2 h-8 w-16"
              fill="#757575"
            >
              <path d="M40,12a4,4,0,0,0-3,1.33l-.23-.09A29.62,29.62,0,0,0,32,11.81h0a8,8,0,0,0-16,0l-.22,0a29.53,29.53,0,0,0-4.6,1.39l-.23.09a4,4,0,1,0,.93,1.78h0a27.62,27.62,0,0,1,4.29-1.29,8,8,0,0,0,15.57,0,27.55,27.55,0,0,1,4.29,1.28h0A4,4,0,1,0,40,12ZM8,18a2,2,0,1,1,2-2A2,2,0,0,1,8,18Zm16,0a6,6,0,1,1,6-6A6,6,0,0,1,24,18Zm16,0a2,2,0,1,1,2-2A2,2,0,0,1,40,18ZM27,12a3,3,0,1,1-3-3A3,3,0,0,1,27,12Z"></path>
            </svg>
            <p className="leading-[1.8] text-[#61613F]">
              <b className="font-medium text-[#545454]">
                © 2016 - 2024 Проект LineageOS
              </b>
            </p>
          </div>
          <div className="mb-4 lg:mb-0">
            <p className="font-light">
              Licensed under
              <a href="#" className="text-primary">
                CC BY-SA 3.0.
              </a>
              <br />
              Site last generated: Jul 17, 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DevicesADMIN
