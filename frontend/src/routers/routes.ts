import DevicesADMIN from '../page/DevicesADMIN'
import DevicesPage from '../page/DevicesPage'
import ItemPage from '../page/ItemPage'
import MainPage from '../page/MainPage'

export const publicRoutes = [
  {
    path: '/',
    Component: MainPage,
  },
  {
    path: '/devices',
    Component: DevicesPage,
  },
  {
    path: '/devices/ADMIN',
    Component: DevicesADMIN,
  },
  {
    path: '/devices/:device',
    Component: ItemPage,
  },
]
export const authRoutes = []
