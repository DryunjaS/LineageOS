import { useEffect, useState } from "react"
import NavDevice from "../components/NavDevice"
import Modal from "../components/Modal"

const DevicesPage = () => {
	const [showNavBar, setShowNavBar] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [showModal, setShowModal] = useState(false)

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
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [lastScrollY])

	const vendorArr = {
		"10.or": [
			{ name: "G", code: "G" },
			{ name: "Другие модели", code: "Другое название" },
		],
		ASUS: [
			{ name: "Zenfone 5Z (ZS620KL)", code: "Z01R" },
			{ name: "ZenFone 8", code: "sake" },
			{ name: "Zenfone Max Pro M1", code: "X00TD" },
			{ name: "Другие модели", code: "Другое название" },
		],
		"Banana Pi": [
			{ name: "M5 (Android TV)", code: "m5" },
			{ name: "M5 (Tablet)", code: "m5" },
			{ name: "Другие модели", code: "Другое название" },
		],
		BQ: [
			{ name: "Aquaris X", code: "bardock" },
			{ name: "Aquaris X Pro", code: "bardockpro" },
			{ name: "Aquaris X2", code: "zangya" },
			{ name: "Aquaris X2 Pro", code: "zangyapro" },
			{ name: "Другие модели", code: "Другое название" },
		],
	}

	return (
		<div>
			<Modal show={showModal} setShow={setShowModal} />
			<div
				className={`fixed top-0 left-0 w-full bg-white transition-transform duration-300 ${
					showNavBar ? "transform translate-y-0" : "transform -translate-y-full"
				}`}
			>
				<NavDevice />
			</div>
			<main className='w-full mt-24'>
				<div className='w-full px-2 lg:px-0 scr350:w-[380px] scr460:w-[420px] scr576:w-[540px] scr768:w-[720px] scr960:w-[960px] lg:w-4/5 mx-auto'>
					<h1 className='text-5xl font-light mb-5'>Устройства</h1>
					<p className='font-light mb-5'>
						Устройства с более низкой прозрачностью изображения больше
						официально не поддерживаются, и страницы существуют только для
						ознакомления.
						<br />
						Вы можете отобразить их, отключив "Скрывать снятые с производства
						устройства" в фильтрах устройств ниже:
					</p>
					<button
						className='bg-primary text-white uppercase text-xs px-6 py-3 rounded-[0.2rem] hover:shadow-lg hover:shadow-primary/50 transition-all duration-300'
						onClick={() => setShowModal(true)}
					>
						Фильтр (<span>195</span> из 483 показанныx)
					</button>

					<div className='mt-5'>
						<h2 className='font-light' id='devices'>
							Выберите поставщика, к которому нужно перейти:
						</h2>
						<div className='rounded-[4px] border border-[#e8e8e8] p-1 grid grid-cols-2 lg:grid-cols-3 gap-2'>
							{Object.keys(vendorArr).map((vendor, index) => (
								<div key={index} className='p-2 text-primary'>
									<a
										href={`#${vendor}`}
										className='hover:border-b hover:border-primary'
									>
										{vendor}
									</a>
								</div>
							))}
						</div>
						{Object.entries(vendorArr).map(([vendor, models]) => (
							<div className=''>
								<div key={vendor} id={vendor} className='mt-14 pb-5'>
									<h2 className='text-3xl font-light mb-4'>{vendor}</h2>
									<a href='#devices' className='text-primary mb-4 block'>
										▲ На верх
									</a>
									<div className='flex flex-wrap gap-y-3'>
										{models.map((model, modelIndex) => (
											<div key={modelIndex} className='w-[180px]'>
												<a
													href={`/${vendor}/${model.code}`}
													className='h-[150px] w-[180px] bg-[#f6fafa] flex flex-col items-center justify-center p-8'
												>
													<img
														src={`/images/${
															model.code === "Другое название"
																? "unknown"
																: model.code
														}.png`}
														className='w-auto h-[120px]'
														alt='model.name'
													/>
												</a>
												<a href={`/${vendor}/${model.code}`} className=''>
													<div className='w-max mt-4 text-lg text-primary hover:border-b hover:border-primary'>
														{model.name}
													</div>
													<div className='w-max text-[#555555] hover:border-b hover:border-[#555555] text-wrap'>
														{model.code}
													</div>
												</a>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
			<footer className='bg-[#f8f9fa] h-auto lg:h-[115px] mt-10 flex items-center'>
				<div className='w-11/12 lg:w-4/5 h-auto py-4 mx-auto  flex flex-wrap justify-center md:justify-between items-center'>
					<div className='my-auto flex flex-col items-center lg:items-start text-center lg:text-start w-auto'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 48 24'
							className='w-16 h-8 my-2'
							fill='#757575'
						>
							<path d='M40,12a4,4,0,0,0-3,1.33l-.23-.09A29.62,29.62,0,0,0,32,11.81h0a8,8,0,0,0-16,0l-.22,0a29.53,29.53,0,0,0-4.6,1.39l-.23.09a4,4,0,1,0,.93,1.78h0a27.62,27.62,0,0,1,4.29-1.29,8,8,0,0,0,15.57,0,27.55,27.55,0,0,1,4.29,1.28h0A4,4,0,1,0,40,12ZM8,18a2,2,0,1,1,2-2A2,2,0,0,1,8,18Zm16,0a6,6,0,1,1,6-6A6,6,0,0,1,24,18Zm16,0a2,2,0,1,1,2-2A2,2,0,0,1,40,18ZM27,12a3,3,0,1,1-3-3A3,3,0,0,1,27,12Z'></path>
						</svg>
						<p className='leading-[1.8] text-[#61613F]'>
							<b className='text-[#545454] font-medium'>
								© 2016 - 2024 Проект LineageOS
							</b>
						</p>
					</div>
					<div className='mb-4 lg:mb-0'>
						<p className='font-light'>
							Licensed under
							<a href='#' className='text-primary'>
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

export default DevicesPage
