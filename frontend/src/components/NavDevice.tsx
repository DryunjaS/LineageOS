import { useState } from 'react'

const NavDevice = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="w-full shadow-lg">
      <div className="mx-auto flex h-16 w-[300px] items-center justify-between px-2 text-xs text-[#555555] scr350:w-11/12">
        <div className="flex gap-x-6">
          <a
            href="/"
            className={`text-xl font-semibold ${
              isMenuOpen ? 'hidden' : 'md:flex'
            }`}
          >
            LineageOS Wiki
          </a>
          <a href="#" className="hidden items-center uppercase lg:flex">
            Устройства
          </a>
          <a href="#" className="hidden items-center uppercase lg:flex">
            Способствовать
          </a>
          <a href="#" className="hidden items-center uppercase lg:flex">
            Разработчики
          </a>
          <a href="#" className="hidden items-center gap-x-2 uppercase lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#555555"
            >
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
            Website
          </a>
        </div>
        <div className="hidden items-center justify-end gap-1 bg-white text-[13px] uppercase lg:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#555555"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input type="text" placeholder="Поиск" className="input-device" />
        </div>
        <div className="mr-5 lg:hidden">
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
            className="absolute -left-9 top-5 flex items-center text-gray-700"
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
          Устройства
        </a>
        <a href="#" className="list-menu">
          Способствовать
        </a>
        <a href="#" className="list-menu">
          Разработчики
        </a>
        <div className="list-menu flex items-center justify-end gap-1 border-none bg-white text-[13px] uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#555555"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            placeholder="Поиск"
            className="input-device w-[170px]"
          />
        </div>
      </div>
    </nav>
  )
}

export default NavDevice
