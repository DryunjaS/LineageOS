import React, { useState, useEffect } from 'react'
import { NameDevice } from '../../interfaces/device'
import {
  changeDevice,
  createDevice,
  deleteDevice,
} from '../../utils/device/func'
import { ActionDeviceType, VendorType } from '../../interfaces/vendor'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  vendorDevice: VendorType
  action: ActionDeviceType
}

const ModalDevice: React.FC<ModalProps> = ({
  show,
  setShow,
  vendorDevice,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(show)
  const [device, setDevice] = useState<NameDevice>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      setDevice({
        Model: action.model,
        Code: action.code,
      })
      console.log(device)
      document.body.classList.add('modal-open')
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 300)
      document.body.classList.remove('modal-open')
      return () => clearTimeout(timeoutId)
    }
  }, [show])

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
    if (!device.Model.trim() || !device.Code.trim()) {
      setError('Название и код не могут быть пустыми')
      return
    }
    const info = {
      Downloads: '',
      Guides: [],
      Special_boot_modes: [],
      Known_quirks: [],
      Find_help_online: '',
      Report_a_bug: '',
    }
    const specific = {
      Main: {},
      Specifications: {},
      LineageOS_info: {},
    }

    try {
      const newDevice = {
        Name: { Model: device.Model.trim(), Code: device.Code.trim() },
        Info: info,
        Specific: specific,
        vendor: {
          id: vendorDevice.id,
          name: vendorDevice.name,
        },
      }

      if (action.type === 'Добавить') await createDevice(newDevice)
      if (action.type === 'Изменить') await changeDevice(newDevice, action.id)
      if (action.type === 'Удалить') await deleteDevice(action.id)

      setDevice({ Model: '', Code: '' })
      setError(null)
      setShow(false)
    } catch (err) {
      console.error('Error creating device:', err)
      setError('Не удалось создать устройство. Попробуйте снова.')
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
                  <h3 className="text-3xl font-light">
                    {action.type} устройство
                  </h3>
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
                    {action.type === 'Удалить' ? (
                      <div className="my-3 text-lg">
                        Вы действительно хотите удалить <br />
                        {action.model} ?
                      </div>
                    ) : (
                      <>
                        <label>Название</label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-[0.2rem] border border-primary bg-[#e8e8e8]/50 px-3 text-lg transition-colors duration-200 focus:bg-[#e8e8e8] focus:outline-none"
                          placeholder="Введите название..."
                          value={device.Model}
                          onChange={(e) =>
                            setDevice({ ...device, Model: e.target.value })
                          }
                        />

                        <label className="mt-5 block">Код</label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-[0.2rem] border border-primary bg-[#e8e8e8]/50 px-3 text-lg transition-colors duration-200 focus:bg-[#e8e8e8] focus:outline-none"
                          placeholder="Введите код..."
                          value={device.Code}
                          onChange={(e) =>
                            setDevice({ ...device, Code: e.target.value })
                          }
                        />
                        {error && <p className="text-red-500">{error}</p>}
                      </>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-3">
                  <button
                    className="w-full rounded-[0.2rem] bg-primary px-6 py-3 text-xs uppercase text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                    type="button"
                    onClick={handleEnter}
                  >
                    {action.type}
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

export default ModalDevice
