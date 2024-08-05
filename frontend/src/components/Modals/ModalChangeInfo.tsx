import React, { useState, useEffect } from 'react'
import PlusIcon from '../icons/Plus'
import { DeviceType, InfoDevice, SpecificDevice } from '../../interfaces/device'
import { changeInputDevice } from '../../utils/device/func'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  data: DeviceType
  field: string
}

const ModalChangeInfo: React.FC<ModalProps> = ({
  show,
  setShow,
  data,
  field,
}) => {
  const [isVisible, setIsVisible] = useState(show)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string[]>([''])
  const [info, setInfo] = useState<InfoDevice>({
    Downloads: [],
    Guides: [],
    Special_boot_modes: [],
    Known_quirks: [],
    Find_help_online: '',
    Report_a_bug: '',
  })
  const [specific, setSpecific] = useState<SpecificDevice>({
    Main: {},
    Specifications: {},
    LineageOS_info: {},
  })

  const fieldsToList = [
    'Руководства',
    'Специальные режимы загрузки',
    'Известные причуды',
  ]
  const fieldMap = {
    Загрузки: 'Downloads',
    Руководства: 'Guides',
    'Специальные режимы загрузки': 'Special_boot_modes',
    'Известные причуды': 'Known_quirks',
    'Найти справку в Интернете': 'Find_help_online',
    'Сообщить об ошибке': 'Report_a_bug',
  }

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      document.body.classList.add('modal-open')

      const fieldKey = fieldMap[field]
      if (fieldKey) {
        // Update inputValue based on the selected field
        setInputValue(
          Array.isArray(info[fieldKey])
            ? info[fieldKey]
            : [info[fieldKey] || ''],
        )
      }

      setInfo({
        Downloads: data?.info.Downloads || [],
        Guides: data?.info.Guides || [],
        Special_boot_modes: data?.info.Special_boot_modes || [],
        Known_quirks: data?.info.Known_quirks || [],
        Find_help_online: data?.info.Find_help_online || '',
        Report_a_bug: data?.info.Report_a_bug || '',
      })
      setSpecific({
        Main: data?.specific.Main || {},
        Specifications: data?.specific.Specifications || {},
        LineageOS_info: data?.specific.LineageOS_info || {},
      })
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 300)
      document.body.classList.remove('modal-open')
      setInputValue([''])
      return () => clearTimeout(timeoutId)
    }
  }, [show, field, data])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEnter()
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
  }, [show])

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      setShow(false)
    }
  }

  const handleEnter = async () => {
    const fieldKey = fieldMap[field]
    if (fieldKey) {
      const updatedInfo = { ...info }
      if (fieldsToList.includes(field)) {
        // Filter out empty strings from inputValue
        updatedInfo[fieldKey] = inputValue.filter((item) => item.trim() !== '')
      } else {
        updatedInfo[fieldKey] = inputValue[0] || ''
      }
      setInfo(updatedInfo)

      try {
        const DEVICE_ID = Number(sessionStorage.getItem('tmp'))
        const newDevice = {
          id: DEVICE_ID,
          name: { Model: data.name.Model, Code: data.name.Code },
          info: updatedInfo,
          specific: specific,
          vendor: data.vendor.id,
        }

        await changeInputDevice(newDevice, DEVICE_ID)

        setError(null)
        setShow(false)
      } catch (err) {
        console.error('Error creating device:', err)
        setError('Не удалось создать устройство. Попробуйте снова.')
      }
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValues = [...inputValue]
    newValues[index] = e.target.value
    setInputValue(newValues)
  }

  const handleAddInput = () => {
    // Only add a new input if there are no empty strings
    if (inputValue.every((item) => item.trim() !== '')) {
      setInputValue([...inputValue, ''])
    }
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
              <div className="relative flex w-[300px] flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:w-[400px]">
                <div className="flex items-center justify-between p-5">
                  <h3 className="text-3xl font-light">{field}</h3>
                  <button
                    className="text-4xl font-light text-[#555555]"
                    onClick={() => setShow(false)}
                  >
                    <span>×</span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative flex-auto px-6">
                  <div className="overflow-y-auto">
                    <label>Текст</label>
                    <div className="flex flex-col gap-y-3">
                      {inputValue.map((item, index) => (
                        <input
                          key={index}
                          type="text"
                          className="h-10 w-full rounded-[0.2rem] border border-primary bg-[#e8e8e8]/50 px-3 text-lg transition-colors duration-200 focus:bg-[#e8e8e8] focus:outline-none"
                          placeholder="Введите текст..."
                          value={item}
                          onChange={(e) => handleChange(e, index)}
                        />
                      ))}
                      {fieldsToList.includes(field) && (
                        <div
                          className="mx-auto my-1 flex aspect-square w-8 cursor-pointer items-center justify-center rounded-md bg-primary text-white transition-transform duration-200 hover:scale-110"
                          title="Добавить пункт"
                          onClick={handleAddInput}
                        >
                          <PlusIcon />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-3">
                  <button
                    className="w-full rounded-[0.2rem] bg-primary px-6 py-3 text-xs uppercase text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                    type="button"
                    onClick={handleEnter}
                  >
                    Изменить
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

export default ModalChangeInfo
