import React, { useState, useEffect } from 'react'
import { Category } from '../../interfaces/device'
import { filterDevice } from '../../utils/device/func'
import { useDispatch } from 'react-redux'
import { setVendors } from '../../store/vendorSlice'
import { setFilteredDevicesCount } from '../../store/deviceSlice'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const initialDeviceState: Category[] = [
  {
    category: 'Глобальный',
    options: [
      { check: false, text: 'Скрыть снятые с производства устройства' },
      {
        check: false,
        text: 'Скрывать устройства без официального метода разблокировки BL',
      },
    ],
  },
  {
    category: 'Архитектура',
    options: [
      { check: false, text: 'arm' },
      { check: false, text: 'arm64' },
      { check: false, text: 'x86' },
      { check: false, text: 'x86_64' },
    ],
  },
  {
    category: 'SoC',
    options: [
      { check: false, text: 'Amlogic' },
      { check: false, text: 'Exynos' },
      { check: false, text: 'Intel' },
      { check: false, text: 'Intel' },
      { check: false, text: 'Kirin' },
      { check: false, text: 'Mediatek' },
      { check: false, text: 'OMAP' },
      { check: false, text: 'Snapdragon' },
      { check: false, text: 'Tegra' },
      { check: false, text: 'Tensor' },
    ],
  },
  {
    category: 'Тип устройства',
    options: [
      { check: false, text: 'Devkit' },
      { check: false, text: 'Handheld game console' },
      { check: false, text: 'Foldable' },
      { check: false, text: 'Set top box' },
      { check: false, text: 'Phone' },
      { check: false, text: 'Phone (slider)' },
      { check: false, text: 'Tablet' },
    ],
  },
  {
    category: 'Сеть',
    options: [
      { check: false, text: '2G GSM' },
      { check: false, text: '2G CDMA' },
      { check: false, text: '3G UMTS' },
      { check: false, text: '3G CDMA2000' },
      { check: false, text: '4G LTE' },
      { check: false, text: '5G NR' },
    ],
  },
  {
    category: 'Wi-Fi',
    options: [
      { check: false, text: '802.11 b/g/n' },
      { check: false, text: '802.11 b/g/n/ac' },
      { check: false, text: '802.11 a/b/g/n' },
      { check: false, text: '802.11 a/b/g/n/ac' },
      { check: false, text: '802.11 a/b/g/n/ac/ax' },
      { check: false, text: '802.11 a/b/g/n/ac/ax/bx' },
    ],
  },
  {
    category: 'Слот для SD-карты',
    options: [
      { check: false, text: 'Нет' },
      { check: false, text: 'Да' },
    ],
  },
  {
    category: 'Версии LineageOS',
    options: [
      { check: false, text: '13.0' },
      { check: false, text: '14.1' },
      { check: false, text: '15.0' },
      { check: false, text: '16.0' },
      { check: false, text: '17.1' },
      { check: false, text: '18.1' },
      { check: false, text: '19.1' },
      { check: false, text: '20' },
      { check: false, text: '21' },
    ],
  },
  {
    category: 'Версии ядра',
    options: [
      { check: false, text: '3.0' },
      { check: false, text: '3.4' },
      { check: false, text: '3.10' },
      { check: false, text: '3.18' },
      { check: false, text: '4.4' },
      { check: false, text: '4.9' },
      { check: false, text: '4.14' },
      { check: false, text: '4.19' },
      { check: false, text: '5.4' },
      { check: false, text: '5.10' },
      { check: false, text: '5.15' },
      { check: false, text: '6.1' },
      { check: false, text: '6.6' },
    ],
  },
]

const Modal: React.FC<ModalProps> = ({ show, setShow }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false) // Добавляем состояние для загрузки

  const [isVisible, setIsVisible] = useState(show)
  const [device, setDevice] = useState(initialDeviceState)
  const [minSize, setMinSize] = useState({
    check: false,
    value: 0,
  })
  const [maxSize, setMaxSize] = useState({
    check: false,
    value: 13,
  })
  const [minYear, setMinYear] = useState({
    check: false,
    value: 2010,
  })

  useEffect(() => {
    const updateVendors = async () => {
      if (show) {
        setIsVisible(true)
        document.body.classList.add('modal-open')
      } else {
        let resDevice = [...device]

        if (minSize.check) {
          resDevice = [
            ...resDevice,
            {
              category: 'Минимальный размер экрана в дюймах',
              options: [{ check: true, text: `${minSize.value}` }],
            },
          ]
        }
        if (maxSize.check) {
          resDevice = [
            ...resDevice,
            {
              category: 'Максимальный размер экрана в дюймах',
              options: [{ check: true, text: `${maxSize.value}` }],
            },
          ]
        }
        if (minYear.check) {
          resDevice = [
            ...resDevice,
            {
              category: 'Минимальный год выпуска',
              options: [{ check: true, text: `${minYear.value}` }],
            },
          ]
        }
        setIsLoading(true)
        try {
          const result = await filterDevice(resDevice)

          dispatch(setVendors(result.groupedDevices || []))
          dispatch(
            setFilteredDevicesCount({
              filteredDevicesCount: result.filteredDevicesCount,
              totalDevicesCount: result.totalDevicesCount,
            }),
          )
        } catch (error) {
          console.error('Ошибка при фильтрации данных:', error)
        } finally {
          setIsLoading(false)
        }

        const timeoutId = setTimeout(() => setIsVisible(false), 300)
        document.body.classList.remove('modal-open')
        return () => clearTimeout(timeoutId)
      }
    }

    updateVendors()
  }, [show, device, minSize, maxSize, minYear, dispatch])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setShow(false)
      }
    }

    if (show) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [show, setShow])

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      setShow(false)
    }
  }

  const handleCheckboxChange = (categoryIndex: number, optionIndex: number) => {
    const newDevice = [...device]
    newDevice[categoryIndex].options[optionIndex].check =
      !newDevice[categoryIndex].options[optionIndex].check
    setDevice(newDevice)
  }

  return (
    <>
      {isVisible && (
        <>
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none ${
              show ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
            onClick={handleOutsideClick}
          >
            <div
              className={`relative mx-auto my-6 w-auto max-w-3xl transition-transform duration-300 ${
                show ? 'transform-none' : 'scale-95 transform'
              }`}
            >
              <div className="relative flex h-[600px] w-[300px] flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:w-[400px]">
                <div className="flex items-center justify-between p-5">
                  <h3 className="text-3xl font-light">Фильтры устройств</h3>
                  <button
                    className="text-4xl font-light text-[#555555]"
                    onClick={() => setShow(false)}
                  >
                    <span>×</span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative flex-auto px-6">
                  <div className="h-[420px] overflow-y-auto lg:h-[450px]">
                    {device.map((category, categoryIndex) => (
                      <div key={category.category} className="mb-4">
                        <p className="mb-2 text-lg font-light">
                          {category.category}:
                        </p>
                        {category.options.map((option, optionIndex) => (
                          <label
                            key={option.text}
                            className="mb-2 flex h-auto items-center gap-x-2 font-light"
                          >
                            <input
                              type="checkbox"
                              className="h-5 min-w-5 cursor-pointer accent-primary"
                              checked={option.check}
                              onChange={() =>
                                handleCheckboxChange(categoryIndex, optionIndex)
                              }
                            />
                            {option.text}
                          </label>
                        ))}
                      </div>
                    ))}
                    <div>
                      <p className="mb-2 flex items-center gap-x-2 text-[14px]">
                        <input
                          type="checkbox"
                          className="h-5 min-w-5 cursor-pointer accent-primary"
                          checked={minSize.check}
                          onChange={(e) =>
                            setMinSize({ ...minSize, check: e.target.checked })
                          }
                        />
                        Минимальный размер экрана в дюймах:
                      </p>
                      <div className="mx-2 flex items-start justify-between gap-x-1">
                        <input
                          type="range"
                          min="0"
                          max="13"
                          step="0.1"
                          name="minSize"
                          value={minSize.value}
                          className="range"
                          onChange={(e) =>
                            setMinSize({
                              ...minSize,
                              value: Number(e.target.value),
                            })
                          }
                        />
                        <span>{minSize.value}</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 flex items-center gap-x-2 text-[14px]">
                        <input
                          type="checkbox"
                          className="h-5 min-w-5 cursor-pointer accent-primary"
                          checked={maxSize.check}
                          onChange={(e) =>
                            setMaxSize({ ...maxSize, check: e.target.checked })
                          }
                        />
                        Максимальный размер экрана в дюймах:
                      </p>
                      <div className="mx-2 flex items-start justify-between gap-x-1">
                        <input
                          type="range"
                          min="0"
                          max="13"
                          step="0.1"
                          name="maxSize"
                          value={maxSize.value}
                          className="range"
                          onChange={(e) =>
                            setMaxSize({
                              ...maxSize,
                              value: Number(e.target.value),
                            })
                          }
                        />
                        <span>{maxSize.value}</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 flex items-center gap-x-2 text-[14px]">
                        <input
                          type="checkbox"
                          className="h-5 min-w-5 cursor-pointer accent-primary"
                          checked={minYear.check}
                          onChange={(e) =>
                            setMinYear({
                              ...minYear,
                              check: e.target.checked,
                            })
                          }
                        />
                        Минимальный год выпуска:
                      </p>
                      <div className="mx-2 flex items-start justify-between gap-x-1">
                        <input
                          type="range"
                          min="2010"
                          max="2024"
                          name="minYear"
                          value={minYear.value}
                          className="range"
                          onChange={(e) =>
                            setMinYear({
                              ...minYear,
                              value: Number(e.target.value),
                            })
                          }
                        />
                        <span>{minYear.value}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-3">
                  <button
                    className={`hover:shadow-primary/50" w-full rounded-[0.2rem] bg-primary px-6 py-3 text-xs uppercase text-white transition-all duration-300 hover:shadow-lg ${
                      isLoading
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:shadow-lg hover:shadow-primary/50'
                    }`}
                    type="button"
                    onClick={() => setShow(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="mr-2 h-5 w-5 animate-spin text-white"
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
                        Обработка...
                      </div>
                    ) : (
                      <>Применить</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`fixed inset-0 z-40 bg-black opacity-25 transition-opacity duration-300 ${
              show ? 'opacity-25' : 'opacity-0'
            }`}
          ></div>
        </>
      )}
    </>
  )
}

export default Modal
