import { useEffect, useState } from 'react'
import NavDevice from '../components/NavDevice'
import { useParams } from 'react-router-dom'

const ItemPage = () => {
  const [showNavBar, setShowNavBar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { device } = useParams()

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
  return (
    <div className="flex min-h-screen flex-col">
      <div
        className={`fixed left-0 top-0 z-10 w-full bg-white transition-transform duration-300${
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
                <span className="underline-on-hover">Devices</span>
              </a>
              <h1 className="text-5xl font-light text-[#555555]">{device}</h1>
              <h3 className="text-xl text-[#555555]">G</h3>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="device-title">Downloads</h2>
              <div className="text-md underline-on-hover w-max cursor-pointer text-primary">
                Get the builds here
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="device-title">Guides</h2>
              <ul className="text-md flex list-disc flex-col pl-10 text-primary">
                <li className="underline-on-hover cursor-pointer break-words sm:w-max">
                  Installation
                </li>
                <li className="underline-on-hover cursor-pointer break-words sm:w-max">
                  Build for yourself
                </li>
                <li className="underline-on-hover cursor-pointer break-words sm:w-max">
                  Update to a newer build of the same LineageOS version
                </li>
              </ul>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="device-title">Special boot modes</h2>
              <ul className="list-disc space-y-2 pl-10 font-light">
                <li>
                  <b>Recovery:</b> With the device powered off, hold{' '}
                  <kbd className="rounded-md bg-[#212529] px-[0.4rem] py-[0.3rem] text-sm text-white">
                    Volume Up
                  </kbd>{' '}
                  +{' '}
                  <kbd className="rounded-md bg-[#212529] px-[0.4rem] py-[0.3rem] text-sm text-white">
                    Power
                  </kbd>
                  .
                </li>
                <li>
                  <b>Bootloader/Fastboot/Download:</b> Our device doesn’t have
                  button mapping for bootloader, thus instead reboot to
                  bootloader from recovery.
                </li>
              </ul>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="device-title">Known quirks</h2>
              <ul className="list-disc space-y-2 pl-10 font-light">
                <li className="underline-on-hover w-max cursor-pointer text-primary">
                  Device integrity
                </li>
              </ul>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="device-title">Find help online</h2>
              <p className="font-light">
                You can find assistance with LineageOS on{' '}
                <span className="underline-on-hover w-max cursor-pointer text-primary">
                  our subreddit
                </span>
                , or in
                <span className="underline-on-hover w-max cursor-pointer text-primary">
                  #LineageOS on Libera.Chat
                </span>
                .
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <h2 className="device-title">Report a bug</h2>
              <p className="font-light">
                If you’d like to report a bug, follow the instructions{' '}
                <span className="underline-on-hover w-max cursor-pointer text-primary">
                  here
                </span>
                .
              </p>
            </div>
          </div>
          <div className="px-2 lg:w-4/12">
            <div className="mx-auto">
              <div className="flex flex-col items-center gap-y-4">
                <img
                  src={`/images/${device === 'Другое название' ? 'unknown' : device}.png`}
                  alt={device}
                  className="h-auto w-[200px]"
                />
                <span>{device}</span>
              </div>
              <section className="mt-4 flex items-center justify-between border-t py-3">
                <div className="font-bold">Released</div>
                <div className="font-light">October 03, 2017</div>
              </section>
              <section className="flex h-[50px] items-center justify-center border-t">
                <div className="font-bold">Specifications</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">SoC</div>
                <div className="ml-auto text-end font-light">
                  Qualcomm MSM8953 Pro <br />
                  Snapdragon 626
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">RAM</div>
                <div className="font-light">3/4 GB</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">CPU</div>
                <div className="ml-auto text-end font-light">
                  Octa-core Cortex-A53 <br />8 x 2.2 GHz
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Architecture</div>
                <div className="font-light">arm64</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">GPU</div>
                <div className="font-light">Qualcomm Adreno 506</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Network</div>
                <div className="font-light">
                  <ul className="list-disc">
                    <li>2G GSM</li>
                    <li>3G UMTS</li>
                    <li>4G LTE</li>
                  </ul>
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Storage</div>
                <div className="font-light">32/64 GB</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">SD card </div>
                <div className="ml-auto text-end font-light">
                  Up to 128 GB
                  <br />
                  hybrid SIM slot
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Screen</div>
                <div className="ml-auto text-end font-light">
                  5.5 in (139.7 mm)
                  <br />
                  1920x1080 (400 PPI)
                  <br />
                  IPS LCD
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Bluetooth</div>
                <div className="font-light">4.2</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Wi-Fi</div>
                <div className="font-light">802.11 b/g/n</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Peripherals</div>
                <div className="font-light">
                  <ul className="list-disc">
                    <li>GPS</li>
                    <li>Accelerometer</li>
                    <li>Dual SIM</li>
                    <li>Dual speakers</li>
                    <li>Fingerprint reader</li>
                    <li>Gyroscope</li>
                    <li>Light sensor</li>
                    <li>USB OTG</li>
                  </ul>
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Cameras</div>
                <div className="w-1/2 font-light">
                  <ul className="list-disc">
                    <li>13 MP (Rear), Dual LED (dual tone) flash</li>
                    <li>13 MP (Monochrome sensor), No flash</li>
                    <li>16 MP (Front), LED flash</li>
                  </ul>
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Dimensions</div>
                <div className="ml-auto text-end font-light">
                  155 mm (6.1 in) (h)
                  <br />
                  76 mm (2.99 in) (w)
                  <br />
                  9.0 mm (0.35 in) (d)
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Battery</div>
                <div className="ml-auto text-end font-light">
                  Non-removable Li-Ion 4000
                  <br />
                  mAh
                </div>
              </section>
              <section className="flex h-[50px] items-center justify-center border-t">
                <div className="font-bold">LineageOS info</div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Maintainer</div>
                <div className="w-1/2 font-light">
                  <ul className="list-disc">
                    <li>kardebayan</li>
                  </ul>
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Current version</div>
                <div className="w-1/2 font-light">
                  <ul className="list-disc">
                    <li>20 (Android 13)</li>
                  </ul>
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Kernel version</div>
                <div className="w-1/2 font-light">
                  <ul className="list-disc">
                    <li>
                      4.9 (
                      <span className="underline-on-hover w-max cursor-pointer font-bold text-primary">
                        source code
                      </span>
                      )
                    </li>
                  </ul>
                </div>
              </section>
              <section className="flex items-center justify-between border-t py-3">
                <div className="font-bold">Supported models</div>
                <div className="w-1/2 font-light">
                  <ul className="list-disc">
                    <li>G</li>
                    <li className="font-bold">
                      <div className="justify-endgap-2 relative flex items-center text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="absolute -left-[6px] top-0 h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                        <span className="underline-on-hover ml-5 cursor-pointer">
                          Don't see yours?
                        </span>
                      </div>
                    </li>
                  </ul>
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

export default ItemPage
