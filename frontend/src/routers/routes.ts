import DevicesADMIN from '../page/DevicesADMIN'
import DevicesPage from '../page/DevicesPage'
import ItemADMIN from '../page/ItemADMIN'
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
  {
    path: '/devices/:device/ADMIN',
    Component: ItemADMIN,
  },
]
export const authRoutes = []
