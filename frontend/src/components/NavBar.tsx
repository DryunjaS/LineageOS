import { useState } from 'react'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="w-full shadow-xl">
      <div className="mx-auto flex h-20 w-10/12 items-center justify-between text-[#555555] sm:px-3">
        <div>
          <a href="/" className="text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="11.98 11.81 168.02 16.19"
              className={`h-[22px] fill-current text-primary ${
                isMenuOpen ? 'hidden' : 'md:flex'
              }`}
            >
              <path d="M61.13,27A1.1,1.1,0,0,1,60,25.83V13h2.79V24.62H69V27Zm16.24,0V13h2.81V27ZM99.1,13h2.56V26.2a.74.74,0,0,1-.4.65,1.9,1.9,0,0,1-1,.24,2.4,2.4,0,0,1-1-.18,1.86,1.86,0,0,1-.67-.61L92.39,17.6V27H89.8V14.07a.94.94,0,0,1,.41-.84A1.91,1.91,0,0,1,91.28,13a2.15,2.15,0,0,1,1.14.23,3.55,3.55,0,0,1,.85.94l5.83,8.16Zm21.43,2.36h-6.42v3.3h5.78v2.36h-5.78v3.53h6.24V27h-9.05V14.17a1,1,0,0,1,.35-.82,1.22,1.22,0,0,1,.84-.31h8ZM138.23,27l-1.17-3.45H132L130.79,27h-2.91l4.72-12.9a2.17,2.17,0,0,1,3.8,0L141.13,27Zm-5.46-5.81h3.49L134.5,16Zm22.23,6a6.62,6.62,0,0,1-5-1.91,7.16,7.16,0,0,1-1.83-5.17,7.27,7.27,0,0,1,2-5.34,6.93,6.93,0,0,1,5.17-2,6.86,6.86,0,0,1,3.6.9A5.38,5.38,0,0,1,161,16l-2.24,1.19a3.64,3.64,0,0,0-3.57-2,3.92,3.92,0,0,0-3.08,1.3A5.15,5.15,0,0,0,151,20a5.2,5.2,0,0,0,1.07,3.48A3.67,3.67,0,0,0,155,24.76a4,4,0,0,0,2.76-.95,3.16,3.16,0,0,0,1.12-2.39h-3.53v-2.2h6.3v1.54a6.11,6.11,0,0,1-1.87,4.63A6.67,6.67,0,0,1,155,27.18Zm25-11.79h-6.42v3.3h5.78v2.36h-5.78v3.53h6.24V27h-9.05V14.17a1,1,0,0,1,.35-.82A1.22,1.22,0,0,1,172,13h8Z"></path>
              <path d="M48,20a4,4,0,0,0-3,1.33l-.23-.09A29.62,29.62,0,0,0,40,19.81h0a8,8,0,0,0-16,0l-.22,0a29.53,29.53,0,0,0-4.6,1.39l-.23.09a4,4,0,1,0,.93,1.78h0a27.62,27.62,0,0,1,4.29-1.29,8,8,0,0,0,15.57,0,27.55,27.55,0,0,1,4.29,1.28h0A4,4,0,1,0,48,20ZM16,26a2,2,0,1,1,2-2A2,2,0,0,1,16,26Zm16,0a6,6,0,1,1,6-6A6,6,0,0,1,32,26Zm16,0a2,2,0,1,1,2-2A2,2,0,0,1,48,26ZM35,20a3,3,0,1,1-3-3A3,3,0,0,1,35,20Z"></path>
            </svg>
          </a>
        </div>
        <div className="hidden justify-end gap-7 bg-white text-[13px] uppercase lg:flex">
          <a href="#" className="flex items-center">
            Блог
          </a>
          <a href="#" className="flex items-center">
            Инженерное искусство
          </a>
          <a href="#" className="flex items-center">
            О нас
          </a>
          <a href="#" className="flex items-center">
            Сообщество
          </a>
          <a href="#" className="flex items-center">
            Законный
          </a>
          <a href="#" className="flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#555555"
            >
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
            Статус
          </a>
          <a href="#" className="flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#555555"
            >
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
            Wiki
          </a>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center text-gray-700"
          >
            <svg
              className="h-5 w-5 fill-current text-primary"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`fixed right-0 top-0 h-screen transform bg-white p-4 uppercase shadow-md transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0 lg:hidden' : 'translate-x-full lg:fixed'
        }`}
      >
        {isMenuOpen && (
          <button
            onClick={toggleMenu}
            className="absolute -left-9 top-8 flex items-center text-gray-700"
          >
            <svg
              className="h-6 w-6 fill-current text-primary"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Close</title>
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        <a href="#" className="list-menu">
          Блог
        </a>
        <a href="#" className="list-menu">
          Инженерное искусство
        </a>
        <a href="#" className="list-menu">
          О нас
        </a>
        <a href="#" className="list-menu">
          Сообщество
        </a>
        <a href="#" className="list-menu">
          Законный
        </a>
        <a href="#" className="list-menu">
          Статус
        </a>
        <a href="#" className="list-menu border-none">
          Wiki
        </a>
      </div>
    </nav>
  )
}

export default NavBar
