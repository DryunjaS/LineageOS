import React, { useState, useEffect } from 'react'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalCreateVendor: React.FC<ModalProps> = ({ show, setShow }) => {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
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
                  <h3 className="text-3xl font-light">Добавлене поставщика</h3>
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
                    <label>Название</label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-[0.2rem] border border-primary bg-[#e8e8e8]/50 px-3 text-lg uppercase transition-colors duration-200 focus:bg-[#e8e8e8] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-3">
                  <button
                    className="w-full rounded-[0.2rem] bg-primary px-6 py-3 text-xs uppercase text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Добавить
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

export default ModalCreateVendor
