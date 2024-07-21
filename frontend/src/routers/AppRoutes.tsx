import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { publicRoutes, authRoutes } from "./routes"

interface RouteConfig {
	path: string
	Component: React.ComponentType
}

function AppRoutes() {
	return (
		<Routes>
			{publicRoutes.map(({ path, Component }: RouteConfig) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			{authRoutes.map(({ path, Component }: RouteConfig) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='/*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}

export default AppRoutes
