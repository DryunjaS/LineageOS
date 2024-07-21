import DevicesPage from "../page/DevicesPage"
import MainPage from "../page/MainPage"

export const publicRoutes = [
	{
		path: "/",
		Component: MainPage,
	},
	{
		path: "/devices",
		Component: DevicesPage,
	},
]
export const authRoutes = []
