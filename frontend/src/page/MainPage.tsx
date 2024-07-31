import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

const MainPage = () => {
  const [showNavBar, setShowNavBar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  const getRotation = () => {
    return (scrollY * 0.3) % 360
  }

  return (
    <div>
      <div
        className={`fixed left-0 top-0 w-full bg-white transition-transform duration-300 ${
          showNavBar ? 'translate-y-0 transform' : '-translate-y-full transform'
        }`}
      >
        <NavBar />
      </div>
      <section className='mt-20 flex min-h-[500px] items-end bg-[url("/images/hero_bg.jpg")] bg-cover bg-center lg:min-h-[auto]'>
        <div className="mx-auto mt-10 flex w-4/5 flex-wrap items-end justify-center lg:mt-0 lg:justify-between">
          <div className="mx-auto mb-10 lg:mx-0 lg:w-[400px]">
            <h1 className="mb-3 mt-5 text-center text-5xl font-thin text-white sm:text-6xl md:w-[690px] lg:text-start">
              Дистрибутив LineageOS для Android
            </h1>
            <p className="mb-6 flex-wrap text-center text-xl font-thin text-white lg:text-start">
              Бесплатная операционная система с открытым исходным кодом для
              различных устройств, основанная на мобильной платформе Android.
            </p>
            <div className="flex items-center justify-center lg:justify-start">
              <a href="/devices" className="section-btn">
                Получите LineageOS
              </a>

              <a
                href="#"
                className="ml-10 text-xs font-thin uppercase text-white"
              >
                Блог
              </a>
            </div>
          </div>
          <img
            src="/images/android.png"
            alt="android"
            className="ml-0 max-h-[500px] max-w-full md:ml-16"
          />
        </div>
      </section>
      <section className="flex h-auto items-center bg-soft sm:h-64">
        <div className="mx-auto w-4/5 py-4 sm:py-0">
          <h2 className="section-title">Последние новости</h2>
          <h3 className="mb-3 text-2xl font-light text-primary">
            Заходящий солнце LineageOS 18.1
          </h3>
          <h6 className="mb-3 text-xs font-bold uppercase">
            Пока, и спасибо за рыбу
          </h6>
          <p className="-ml-1 flex w-full text-lg font-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="mr-1"
            >
              <path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" />
            </svg>
            05 марта 2024 года
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              className="ml-3 mr-1"
            >
              <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
            </svg>
            npjohnson
          </p>
        </div>
      </section>
      <section className="h-auto py-10 lg:h-[410px]">
        <div className="mx-auto flex h-auto w-4/5 flex-wrap items-center justify-center gap-y-10 lg:h-[300px] lg:justify-between">
          <img
            src="/images/individuality.jpg"
            alt="individuality"
            className="h-[282px] w-[290px]"
          />
          <div className="w-[690px] lg:w-[560px]">
            <h2 className="section-title text-center lg:text-start">
              Индивидуальность
            </h2>
            <p className="section-text">
              Индивидуализация имеет первостепенное значение для
              производительности. <br />
              Вот почему LineageOS обещает продвигать персонализацию и
              предпочтения пользователей. <br /> <br />
              Каждый человек уникален, и ваше устройство должно быть таким же.
            </p>
          </div>
        </div>
      </section>
      <section className="flex h-auto items-center bg-security py-24 lg:h-[714px] lg:py-0">
        <div className="mx-auto flex w-4/5 flex-row-reverse flex-wrap justify-center gap-y-12 text-center text-white lg:justify-between lg:text-start">
          <img
            src="/images/security.png"
            alt="security"
            className="h-[522px] w-[530px] object-contain lg:object-cover"
          />
          <div className="w-max lg:w-96">
            <h2 className="section-title">Безопасность</h2>
            <p className="section-text">
              Ваши данные - ваши правила. Наряду с ежемесячными обновлениями
              системы безопасности для каждого поддерживаемого устройства, мы
              улучшаем существующие точки доступа к конфиденциальности в
              операционной системе и информируем вас о том, как система
              обменивается вашими данными.
              <br />
              <br />
            </p>
            <div className="flex flex-col items-center justify-between gap-y-4 lg:flex-row">
              <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-auto"
              >
                <circle
                  cx="90"
                  cy="90"
                  r="88"
                  stroke="#167C80"
                  stroke-width="4"
                ></circle>
                <path
                  d="M52.6667 48H127.333C133.227 48 138 52.7733 138 58.6667V96C138 122.512 116.512 144 90 144C63.488 144 42 122.512 42 96V58.6667C42 52.7733 46.7733 48 52.6667 48ZM126.811 102.229C127.301 99.328 125.344 96.576 122.437 96.0853C119.536 95.6 116.784 97.5573 116.293 100.464C114.149 113.2 103.067 122.667 90 122.667C76.9333 122.667 65.8507 113.205 63.7013 100.469C63.216 97.568 60.464 95.6107 57.5573 96.096C54.656 96.5867 52.6933 99.3387 53.184 102.245C56.192 120.091 71.7067 133.333 90 133.333C108.293 133.333 123.808 120.085 126.811 102.229ZM84.912 62.3893L74.6773 92.2507C74.24 93.4187 74 94.6827 74 96C74 101.888 78.7733 106.667 84.6667 106.667H95.3333C98.2667 106.667 100.933 105.493 102.853 103.52C104.827 101.6 106 98.9333 106 96L84.6667 95.9947L87.0027 89.1947L95.0027 65.8453C95.216 65.2693 95.3333 64.6453 95.3333 64C95.3333 61.056 92.944 58.6667 90 58.6667C87.616 58.6667 85.5947 60.2293 84.912 62.3893Z"
                  fill="#167C80"
                ></path>
              </svg>
              <p className="w-4/5 text-xl font-light lg:w-[280px]">
                Доверие помогает вам понять уровень безопасности вашего
                устройства и предупреждает о возможных угрозах.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex h-auto items-center overflow-hidden py-20 lg:h-[482px] lg:py-0">
        <div className="mx-auto flex w-4/5 flex-wrap items-center justify-center gap-y-10 lg:justify-end">
          <img
            src="/images/longevity-2.png"
            alt="longevity"
            className="left-20 -z-10 h-[75vw] w-auto bg-transparent lg:absolute lg:h-[40vw]"
            style={{ transform: `rotate(${getRotation()}deg)` }}
          />
          <div className="w-auto text-center lg:w-[475px] lg:text-start">
            <h2 className="section-title">Долговечность</h2>
            <p className="section-text">
              LineageOS расширяет функциональность и срок службы мобильных
              устройств более чем 20 различных производителей благодаря нашему
              сообществу разработчиков с открытым исходным кодом со всего мира.
              <br />
              <br />
              Хотите внести свой вклад?{' '}
              <a href="#" className="text-primary">
                Посмотрите, как вы можете улучшить LineageOS
              </a>
            </p>
          </div>
        </div>
      </section>
      <section className="flex h-auto items-center bg-[url('/images/power_bg.jpg')] bg-cover bg-center py-20 text-white lg:h-[660px] lg:py-0">
        <div className="mx-auto flex w-4/5 flex-wrap-reverse items-center justify-center gap-y-10 lg:justify-between">
          <div className="w-auto lg:w-[450px]">
            <h2 className="section-title text-center lg:text-start">
              Сила для тебя
            </h2>
            <p className="section-text">
              Наши приложения с открытым исходным кодом помогут вам пережить
              этот день.
              <br />
              <br />
              Хотите сделать больше с помощью своего устройства?
              <br />
              Опытным пользователям понравятся утилиты командной строки Unix.
              <br />
              Разработчики Android превратят любое устройство в идеальное
              устройство для разработки приложений благодаря расширенным
              инструментам и возможностям отладки.
              <br />
            </p>
          </div>
          <img
            src="/images/icons.png"
            alt="icons"
            className="h-auto w-[70vw] lg:w-[35vw]"
          />
        </div>
      </section>
      <section className="flex items-center justify-center bg-primary px-4 py-24 text-white">
        <div className="h-auto text-center lg:h-[315px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 24"
            fill="white"
            className="mx-auto mb-10 h-20 w-40"
          >
            <path d="M40,12a4,4,0,0,0-3,1.33l-.23-.09A29.62,29.62,0,0,0,32,11.81h0a8,8,0,0,0-16,0l-.22,0a29.53,29.53,0,0,0-4.6,1.39l-.23.09a4,4,0,1,0,.93,1.78h0a27.62,27.62,0,0,1,4.29-1.29,8,8,0,0,0,15.57,0,27.55,27.55,0,0,1,4.29,1.28h0A4,4,0,1,0,40,12ZM8,18a2,2,0,1,1,2-2A2,2,0,0,1,8,18Zm16,0a6,6,0,1,1,6-6A6,6,0,0,1,24,18Zm16,0a2,2,0,1,1,2-2A2,2,0,0,1,40,18ZM27,12a3,3,0,1,1-3-3A3,3,0,0,1,27,12Z"></path>
          </svg>
          <h2 className="section-title">
            «Готовы?» Получите LineageOS прямо сейчас!
          </h2>
          <p className="mb-5 text-[22px] font-light">
            LineageOS, дистрибутив Android с открытым исходным кодом, доступен
            для нескольких устройств,
            <br />
            и благодаря крупнейшему, но постоянно растущему сообществу
            разработчиков Android с открытым исходным кодом постоянно
            добавляется еще больше.
            <br />
            Присоединяйтесь к нам и вдохните новую жизнь в свое устройство, будь
            то старое или новое.
          </p>
          <a href="#" className="section-btn">
            Найдите свое устройство
          </a>
        </div>
      </section>
      <footer className="flex items-center justify-center bg-[#eee] p-4">
        <div className="flex h-auto w-4/5 flex-col justify-center text-sm font-light lg:h-[232px] lg:flex-row lg:justify-between">
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
              <br />
              Нужно связаться с вами? Проверять{' '}
              <a href="#" className="text-primary">
                r/LineageOS!
              </a>
              <br />
              Нужен подборка материалов для прессы? Получите наш{' '}
              <a href="#" className="text-primary">
                Руководство по публичному бренду
              </a>
              <br />
              PayPal:{' '}
              <a href="#" className="text-primary">
                paypal.me/LineageOS
              </a>
              <br />
              Patreon:{' '}
              <a href="#" className="text-primary">
                patreon.com/LineageOS
              </a>
              <br />
              Примечание: LineageOS LLC не является некоммерческой организацией
              по статье 501(c)(3), поскольку такие пожертвования не облагаются
              налогом.
            </p>
          </div>
          <div className="jus flex justify-center gap-x-3 py-4 lg:justify-end">
            <a href="#">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="footer-icon"
              >
                <path d="M201.5 305.5c-13.8 0-24.9-11.1-24.9-24.6 0-13.8 11.1-24.9 24.9-24.9 13.6 0 24.6 11.1 24.6 24.9 0 13.6-11.1 24.6-24.6 24.6zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-132.3-41.2c-9.4 0-17.7 3.9-23.8 10-22.4-15.5-52.6-25.5-86.1-26.6l17.4-78.3 55.4 12.5c0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.3 24.9-24.9s-11.1-24.9-24.9-24.9c-9.7 0-18 5.8-22.1 13.8l-61.2-13.6c-3-.8-6.1 1.4-6.9 4.4l-19.1 86.4c-33.2 1.4-63.1 11.3-85.5 26.8-6.1-6.4-14.7-10.2-24.1-10.2-34.9 0-46.3 46.9-14.4 62.8-1.1 5-1.7 10.2-1.7 15.5 0 52.6 59.2 95.2 132 95.2 73.1 0 132.3-42.6 132.3-95.2 0-5.3-.6-10.8-1.9-15.8 31.3-16 19.8-62.5-14.9-62.5zM302.8 331c-18.2 18.2-76.1 17.9-93.6 0-2.2-2.2-6.1-2.2-8.3 0-2.5 2.5-2.5 6.4 0 8.6 22.8 22.8 87.3 22.8 110.2 0 2.5-2.2 2.5-6.1 0-8.6-2.2-2.2-6.1-2.2-8.3 0zm7.7-75c-13.6 0-24.6 11.1-24.6 24.9 0 13.6 11.1 24.6 24.6 24.6 13.8 0 24.9-11.1 24.9-24.6 0-13.8-11-24.9-24.9-24.9z"></path>
              </svg>
            </a>
            <a href="#">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                className="footer-icon"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </a>
            <a href="#">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="footer-icon"
              >
                <path d="M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041 64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627 161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z"></path>
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="61.076954mm"
                height="65.47831mm"
                viewBox="0 0 216.4144 232.00976"
                className="footer-icon"
              >
                <path d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915"></path>
                <path
                  fill="white"
                  d="M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainPage
