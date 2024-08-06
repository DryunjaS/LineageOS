import { useEffect, useState } from 'react'
import NavDevice from '../components/NavDevice'
import { useParams } from 'react-router-dom'
import WriteIcon from '../components/icons/Write'
import { getDeviceByID, uploadImgDevice } from '../utils/device/func'
import { InfoDevice, NameDevice, SpecificDevice } from '../interfaces/device'
import PlusIcon from '../components/icons/Plus'
import ModalChangeInfo from '../components/Modals/ModalChangeInfo'
import ModalChangeSpec from '../components/Modals/ModelChangeSpec'

interface DeviceType {
  id: number
  name: NameDevice
  info: InfoDevice
  specific: SpecificDevice
}
const ItemADMIN = () => {
  const [showNavBar, setShowNavBar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const [showModalInfo, setShowModalInfo] = useState(false)
  const [showModalSpec, setShowModalSpec] = useState(false)

  const { device } = useParams()
  const [data, setData] = useState<DeviceType>()
  const [field, setField] = useState('')
  const [fieldSpec, setFieldSpec] = useState({})

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
    const id = Number(sessionStorage.getItem('tmp'))
    getDeviceByID(id)
      .then((response) => {
        setData(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [showModalInfo, showModalSpec])

  const changeFieldInfo = (field: string) => {
    setShowModalInfo(true)
    setField(field)
  }
  const changeFieldSpec = (key0: string, key1: string) => {
    setShowModalSpec(true)
    setFieldSpec({ key0, key1 })
  }
  const changeImg = async (event) => {
    const file = event.target.files[0]
    const id = Number(sessionStorage.getItem('tmp'))

    await uploadImgDevice(file, id)
  }
  return (
    <div className="flex min-h-screen flex-col">
      <ModalChangeSpec
        show={showModalSpec}
        setShow={setShowModalSpec}
        data={data}
        field={fieldSpec}
      />
      <ModalChangeInfo
        show={showModalInfo}
        setShow={setShowModalInfo}
        data={data}
        field={field}
      />
      <div
        className={`fixed left-0 top-0 z-10 w-full bg-white transition-transform duration-300 ${
          showNavBar ? 'translate-y-0 transform' : '-translate-y-full transform'
        }`}
      >
        <NavDevice />
      </div>
      <main className="mx-auto mt-[100px] w-11/12 flex-1">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="px-2 lg:w-7/12">
            <div className="mb-6 space-y-2">
              <a
                href="/devices/"
                className="flex items-center gap-x-2 text-[#167c80]"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </span>
                <span className="underline-on-hover">Устройства</span>
              </a>
              <h1 className="text-5xl font-light text-[#555555]">
                {data?.name.Model}
              </h1>
              <h3 className="text-xl text-[#555555]">{data?.name.Code}</h3>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-x-2">
                <h2 className="device-title">Загрузки</h2>
                <span
                  className="cursor-pointer py-1"
                  onClick={() => changeFieldInfo('Загрузки')}
                >
                  <WriteIcon />
                </span>
              </div>

              <div className="text-md underline-on-hover w-max cursor-pointer text-primary">
                {data?.info.Downloads}
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-x-2">
                <h2 className="device-title">Руководства</h2>
                <span
                  className="cursor-pointer py-1"
                  onClick={() => changeFieldInfo('Руководства')}
                >
                  <WriteIcon />
                </span>
              </div>

              <ul className="text-md flex list-disc flex-col pl-10 text-primary">
                {data?.info.Guides.map((li, index) => (
                  <li
                    key={index}
                    className="underline-on-hover cursor-pointer break-words sm:w-max"
                  >
                    {li}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-x-2">
                <h2 className="device-title">Специальные режимы загрузки</h2>
                <span
                  className="cursor-pointer py-1"
                  onClick={() => changeFieldInfo('Специальные режимы загрузки')}
                >
                  <WriteIcon />
                </span>
              </div>
              <ul className="list-disc space-y-2 pl-10 font-light">
                {data?.info.Special_boot_modes.map((li, index) => (
                  <li key={index}>{li}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-x-2">
                <h2 className="device-title">Известные причуды</h2>
                <span
                  className="cursor-pointer py-1"
                  onClick={() => changeFieldInfo('Известные причуды')}
                >
                  <WriteIcon />
                </span>
              </div>
              <ul className="list-disc space-y-2 pl-10 font-light">
                {data?.info.Known_quirks.map((li, index) => (
                  <li
                    key={index}
                    className="underline-on-hover w-max cursor-pointer text-primary"
                  >
                    {li}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-x-2">
                <h2 className="device-title">Найти справку в Интернете</h2>
                <span
                  className="cursor-pointer py-1"
                  onClick={() => changeFieldInfo('Найти справку в Интернете')}
                >
                  <WriteIcon />
                </span>
              </div>
              <p className="font-light">{data?.info.Find_help_online}</p>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-x-2">
                <h2 className="device-title">Сообщить об ошибке</h2>
                <span
                  className="cursor-pointer py-1"
                  onClick={() => changeFieldInfo('Сообщить об ошибке')}
                >
                  <WriteIcon />
                </span>
              </div>
              <p className="font-light">{data?.info.Report_a_bug}</p>
            </div>
          </div>

          <div className="px-2 lg:w-4/12">
            <div className="mx-auto">
              <div className="flex flex-col items-center gap-y-4">
                <img
                  src={`${import.meta.env.VITE_URL_SERVER}/images/${data?.name.Img.length !== 0 ? data?.name.Img : 'unknown.png'}`}
                  alt={device}
                  className="h-auto w-[200px]"
                />
                <input type="file" accept="image/*" onChange={changeImg} />

                <span>{device}</span>
              </div>
              {data?.specific?.Main &&
              Object.keys(data?.specific?.Main).length > 0 ? (
                Object.entries(data?.specific?.Main).map(([key, value]) => (
                  <section
                    key={key}
                    className="flex items-center justify-between gap-x-3 border-t py-3"
                  >
                    <div className="flex w-1/2 items-center gap-x-2">
                      <span
                        className="cursor-pointer py-1"
                        onClick={() => changeFieldSpec(key, 'Main')}
                      >
                        <WriteIcon />
                      </span>
                      <div className="font-bold">{key}</div>
                    </div>
                    <div className="w-1/2 pr-3 text-end font-light">
                      {Array.isArray(value) ? (
                        value.length === 1 ? (
                          value[0]
                        ) : (
                          <ul>
                            {value.map((item, index) => (
                              <li key={index} className="ml-5 list-disc">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )
                      ) : (
                        value
                      )}
                    </div>
                  </section>
                ))
              ) : (
                <section className="flex items-center justify-center border-t py-3">
                  <div className="font-light">Нет доступных данных</div>
                </section>
              )}
              <section className="flex items-center justify-center border-t py-3">
                <div
                  className="mx-auto my-1 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md bg-primary text-white transition-transform duration-200 hover:scale-110"
                  title="Добавить пункт"
                  onClick={() => changeFieldSpec('Новый пункт', 'Main')}
                >
                  <PlusIcon />
                </div>
              </section>

              <section className="flex h-[50px] items-center justify-center border-t">
                <div className="font-bold">Технические характеристики</div>
              </section>
              {data?.specific?.Specifications &&
              Object.keys(data?.specific?.Specifications).length > 0 ? (
                Object.entries(data?.specific?.Specifications).map(
                  ([key, value]) => (
                    <section
                      key={key}
                      className="flex items-center justify-between gap-x-3 border-t py-3"
                    >
                      <div className="flex w-1/2 items-center gap-x-2">
                        <span
                          className="cursor-pointer py-1"
                          onClick={() => changeFieldSpec(key, 'Specifications')}
                        >
                          <WriteIcon />
                        </span>
                        <div className="font-bold">{key}</div>
                      </div>
                      <div className="w-1/2 pr-3 text-end font-light">
                        {Array.isArray(value) ? (
                          value.length === 1 ? (
                            value[0]
                          ) : (
                            <ul>
                              {value.map((item, index) => (
                                <li key={index} className="ml-5 list-disc">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )
                        ) : (
                          value
                        )}
                      </div>
                    </section>
                  ),
                )
              ) : (
                <section className="flex items-center justify-center border-t py-3">
                  <div className="font-light">Нет доступных данных</div>
                </section>
              )}

              <section className="flex items-center justify-center border-t py-3">
                <div
                  className="mx-auto my-1 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md bg-primary text-white transition-transform duration-200 hover:scale-110"
                  title="Добавить пункт"
                  onClick={() =>
                    changeFieldSpec('Новый пункт', 'Specifications')
                  }
                >
                  <PlusIcon />
                </div>
              </section>
              <section className="flex h-[50px] items-center justify-center border-t">
                <div className="font-bold">Информация о LineageOS</div>
              </section>
              {data?.specific?.LineageOS_info &&
              Object.keys(data?.specific?.LineageOS_info).length > 0 ? (
                Object.entries(data?.specific?.LineageOS_info).map(
                  ([key, value]) => (
                    <section
                      key={key}
                      className="flex items-center justify-between gap-x-3 border-t py-3"
                    >
                      <div className="flex w-1/2 items-center gap-x-2">
                        <span
                          className="cursor-pointer py-1"
                          onClick={() => changeFieldSpec(key, 'LineageOS_info')}
                        >
                          <WriteIcon />
                        </span>
                        <div className="font-bold">{key}</div>
                      </div>
                      <div className="w-1/2 pr-3 text-end font-light">
                        {Array.isArray(value) ? (
                          value.length === 1 ? (
                            value[0]
                          ) : (
                            <ul>
                              {value.map((item, index) => (
                                <li key={index} className="ml-5 list-disc">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )
                        ) : (
                          value
                        )}
                      </div>
                    </section>
                  ),
                )
              ) : (
                <section className="flex items-center justify-center border-t py-3">
                  <div className="font-light">Нет доступных данных</div>
                </section>
              )}
              <section className="flex items-center justify-center border-t py-3">
                <div
                  className="mx-auto my-1 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md bg-primary text-white transition-transform duration-200 hover:scale-110"
                  title="Добавить пункт"
                  onClick={() =>
                    changeFieldSpec('Новый пункт', 'Specifications')
                  }
                >
                  <PlusIcon />
                </div>
              </section>
            </div>
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
              Лицензированный в соответствии с{' '}
              <a href="#" className="text-primary">
                CC BY-SA 3.0.
              </a>
              <br />
              Дата последнего создания сайта: 17 июля 2024 г.{' '}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ItemADMIN
