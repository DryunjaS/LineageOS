import React, { useState, useEffect } from "react"

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
		category: "Global",
		options: [
			{ check: false, text: "Скрыть снятые с производства устройства" },
			{
				check: false,
				text: "Скрывать устройства без официального метода разблокировки BL",
			},
		],
	},
	{
		category: "Architecture",
		options: [
			{ check: false, text: "arm" },
			{ check: true, text: "arm64" },
			{ check: false, text: "x86" },
			{ check: false, text: "x86_64" },
		],
	},
	{
		category: "SoC vendor",
		options: [
			{ check: false, text: "Amlogic" },
			{ check: false, text: "Exynos" },
			{ check: true, text: "Intel" },
			{ check: false, text: "Intel" },
			{ check: false, text: "Kirin" },
			{ check: false, text: "Mediatek" },
			{ check: true, text: "OMAP" },
			{ check: false, text: "Snapdragon" },
			{ check: false, text: "Tegra" },
			{ check: false, text: "Tensor" },
		],
	},
	{
		category: "Device type",
		options: [
			{ check: false, text: "Device type" },
			{ check: false, text: "Handheld game console" },
			{ check: true, text: "Foldable" },
			{ check: false, text: "Set top box" },
			{ check: false, text: "Phone" },
			{ check: false, text: "Phone (slider)" },
			{ check: true, text: "Tablet" },
			{ check: false, text: "Set top box" },
		],
	},
	{
		category: "Networks",
		options: [
			{ check: false, text: "2G GSM" },
			{ check: false, text: "2G CDMA" },
			{ check: false, text: "3G UMTS" },
			{ check: false, text: "3G CDMA2000" },
			{ check: false, text: "4G LTE" },
			{ check: false, text: "5G NR" },
		],
	},
	{
		category: "Wi-Fi",
		options: [
			{ check: false, text: "802.11 b/g/n" },
			{ check: false, text: "802.11 b/g/n/ac" },
			{ check: false, text: "802.11 a/b/g/n" },
			{ check: false, text: "802.11 a/b/g/n/ac" },
			{ check: false, text: "802.11 a/b/g/n/ac/ax" },
			{ check: false, text: "802.11 a/b/g/n/ac/ax/bx" },
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
			document.body.classList.add("modal-open")
		} else {
			const timeoutId = setTimeout(() => setIsVisible(false), 300) // duration of transition
			document.body.classList.remove("modal-open")
			return () => clearTimeout(timeoutId)
		}
	}, [show])

	const handleOutsideClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
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
						className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${
							show ? "opacity-100" : "opacity-0"
						} transition-opacity duration-300`}
						onClick={handleOutsideClick}
					>
						<div
							className={`relative w-auto my-6 mx-auto max-w-3xl transition-transform duration-300 ${
								show ? "transform-none" : "transform scale-95"
							}`}
						>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-[300px] md:w-[400px] h-[600px] bg-white outline-none focus:outline-none'>
								<div className='flex items-center justify-between p-5'>
									<h3 className='text-3xl font-light'>Фильтры устройств</h3>
									<button
										className='text-4xl font-light text-[#555555]'
										onClick={() => setShow(false)}
									>
										<span>×</span>
									</button>
								</div>
								{/* Body */}
								<div className='relative px-6 flex-auto'>
									<div className='h-[420px] lg:h-[450px] overflow-y-auto'>
										{device.map((category, categoryIndex) => (
											<div key={category.category} className='mb-4'>
												<p className='font-light text-lg mb-2'>
													{category.category}:
												</p>
												{category.options.map((option, optionIndex) => (
													<label
														key={option.text}
														className='flex items-center gap-x-2 mb-2 font-light h-auto'
													>
														<input
															type='checkbox'
															className='min-w-5 h-5 accent-primary cursor-pointer'
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
										<div className='mb-4'>
											<p>Минимальный размер экрана в дюймах:</p>
											<div className='flex items-start justify-between gap-x-1 mx-2'>
												<input
													type='range'
													min='0'
													max='13'
													step='0.1'
													name='minSize'
													value={range.minSize}
													className='range'
													onChange={handleRangeChange}
												/>
												<span>{range.minSize}</span>
											</div>
										</div>
										<div className='mb-4'>
											<p>Максимальный размер экрана в дюймах:</p>
											<div className='flex items-start justify-between gap-x-1 mx-2'>
												<input
													type='range'
													min='0'
													max='13'
													step='0.1'
													name='maxSize'
													value={range.maxSize}
													className='range'
													onChange={handleRangeChange}
												/>
												<span>{range.maxSize}</span>
											</div>
										</div>
										<div className='mb-4'>
											<p>Минимальный год выпуска:</p>
											<div className='flex items-start justify-between gap-x-1 mx-2'>
												<input
													type='range'
													min='2010'
													max='2024'
													name='minYear'
													value={range.minYear}
													className='range'
													onChange={handleRangeChange}
												/>
												<span>{range.minYear}</span>
											</div>
										</div>
									</div>
								</div>

								{/* Footer */}
								<div className='flex items-center justify-end px-6 py-3'>
									<button
										className='w-full bg-primary text-white uppercase text-xs px-6 py-3 rounded-[0.2rem] hover:shadow-lg hover:shadow-primary/50 transition-all duration-300'
										type='button'
										onClick={() => setShow(false)}
									>
										Применить
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`opacity-25 fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
							show ? "opacity-25" : "opacity-0"
						}`}
					></div>
				</>
			)}
		</>
	)
}

export default Modal
