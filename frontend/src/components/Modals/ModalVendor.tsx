import React, { useState, useEffect } from 'react'
import {
  changeVendor,
  createVendor,
  deleteVendor,
} from '../../utils/vendor/func'
import { ActionVendorType } from '../../interfaces/vendor'
import { useDispatch, useSelector } from 'react-redux'
import { addVendor, removeVendor, updateVendor } from '../../store/vendorSlice'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  action: ActionVendorType
}

const ModalVendor: React.FC<ModalProps> = ({ show, setShow, action }) => {
  const dispatch = useDispatch()
  const vendors = useSelector((state) => state.vendor.vendors)

  const [isVisible, setIsVisible] = useState(show)
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (show) {
      setIsVisible(true)
      setValue(action.name)
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

  function handleEnter() {
    if (action.type !== 'Удалить' && !value.trim()) {
      setError('Название не может быть пустым')
      return
    }
    try {
      if (action.type === 'Добавить') {
        const lastID = vendors[vendors.length - 1].id
        const newID = lastID + 1
        console.log({ id: newID, name: value })
        createVendor(value)
        dispatch(addVendor({ id: newID, name: value }))
      }
      if (action.type === 'Изменить') {
        changeVendor(value, action.id)
        dispatch(updateVendor({ id: action.id, name: value }))
      }
      if (action.type === 'Удалить') {
        deleteVendor(action.id)
        dispatch(removeVendor({ id: action.id }))
      }

      setValue('')
      setError(null)
      setShow(false)
    } catch (err) {
      console.error('Error creating vendor:', err)
      setError('Не удалось создать поставщика. Попробуйте снова.')
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
                    {action.type} поставщика
                  </h3>
                  <button
                    className="text-4xl font-light text-[#555555]"
                    onClick={() => setShow(false)}
                    aria-label="Close"
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
                        {action.name} ?
                      </div>
                    ) : (
                      <>
                        <label htmlFor="vendor-name">Название</label>
                        <input
                          id="vendor-name"
                          type="text"
                          className="h-10 w-full rounded-[0.2rem] border border-primary bg-[#e8e8e8]/50 px-3 text-lg transition-colors duration-200 focus:bg-[#e8e8e8] focus:outline-none"
                          placeholder="Введите название ..."
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                        {error && <p className="mt-2 text-red-500">{error}</p>}
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

export default ModalVendor
