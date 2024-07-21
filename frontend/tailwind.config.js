/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
			colors: {
				primary: "#167c80",
				soft: "#e0f6f7 ",
				security: "#202626",
			},
			backgroundImage: {
				"default-gradient":
					"linear-gradient(to top, #d2d2d2 1px, rgba(210, 210, 210, 0) 1px)",
				"focus-gradient":
					"linear-gradient(to top, #167C80 2px, rgba(22, 124, 128, 0) 2.2px)",
			},
			screens: {
				scr960: "960px",
				scr768: "768px",
				scr576: "576px",
				scr460: "460px",
				scr350: "350px",
			},
		},
	},
	plugins: [],
}
