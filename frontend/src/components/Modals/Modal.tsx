import React, { useState, useEffect } from 'react'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

interface Option {
  check: boolean
  text: string
}

interface Category {
  category: string
  options: Option[]
}

const initialDeviceState: Category[] = [
  {
    category: 'Global',
    options: [
      { check: false, text: 'Скрыть снятые с производства устройства' },
      {
        check: false,
        text: 'Скрывать устройства без официального метода разблокировки BL',
      },
    ],
  },
  {
    category: 'Architecture',
    options: [
      { check: false, text: 'arm' },
      { check: true, text: 'arm64' },
      { check: false, text: 'x86' },
      { check: false, text: 'x86_64' },
    ],
  },
  {
    category: 'SoC vendor',
    options: [
      { check: false, text: 'Amlogic' },
      { check: false, text: 'Exynos' },
      { check: true, text: 'Intel' },
      { check: false, text: 'Intel' },
      { check: false, text: 'Kirin' },
      { check: false, text: 'Mediatek' },
      { check: true, text: 'OMAP' },
      { check: false, text: 'Snapdragon' },
      { check: false, text: 'Tegra' },
      { check: false, text: 'Tensor' },
    ],
  },
  {
    category: 'Device type',
    options: [
      { check: false, text: 'Device type' },
      { check: false, text: 'Handheld game console' },
      { check: true, text: 'Foldable' },
      { check: false, text: 'Set top box' },
      { check: false, text: 'Phone' },
      { check: false, text: 'Phone (slider)' },
      { check: true, text: 'Tablet' },
      { check: false, text: 'Set top box' },
    ],
  },
  {
    category: 'Networks',
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
]

const Modal: React.FC<ModalProps> = ({ show, setShow }) => {
  const [isVisible, setIsVisible] = useState(show)
  const [device, setDevice] = useState(initialDeviceState)
  const [range, setRange] = useState({
    minSize: 4.5,
    maxSize: 5.6,
    minYear: 2015,
  })

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

  const handleCheckboxChange = (categoryIndex: number, optionIndex: number) => {
    const newDevice = [...device]
    newDevice[categoryIndex].options[optionIndex].check =
      !newDevice[categoryIndex].options[optionIndex].check
    setDevice(newDevice)
  }

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange({ ...range, [e.target.name]: parseFloat(e.target.value) })
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
                    <div className="mb-4">
                      <p>Минимальный размер экрана в дюймах:</p>
                      <div className="mx-2 flex items-start justify-between gap-x-1">
                        <input
                          type="range"
                          min="0"
                          max="13"
                          step="0.1"
                          name="minSize"
                          value={range.minSize}
                          className="range"
                          onChange={handleRangeChange}
                        />
                        <span>{range.minSize}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p>Максимальный размер экрана в дюймах:</p>
                      <div className="mx-2 flex items-start justify-between gap-x-1">
                        <input
                          type="range"
                          min="0"
                          max="13"
                          step="0.1"
                          name="maxSize"
                          value={range.maxSize}
                          className="range"
                          onChange={handleRangeChange}
                        />
                        <span>{range.maxSize}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p>Минимальный год выпуска:</p>
                      <div className="mx-2 flex items-start justify-between gap-x-1">
                        <input
                          type="range"
                          min="2010"
                          max="2024"
                          name="minYear"
                          value={range.minYear}
                          className="range"
                          onChange={handleRangeChange}
                        />
                        <span>{range.minYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end px-6 py-3">
                  <button
                    className="w-full rounded-[0.2rem] bg-primary px-6 py-3 text-xs uppercase text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                    type="button"
                    onClick={() => setShow(false)}
                  >
                    Применить
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
