import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AppRoutes from './routers/AppRoutes'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import Cookies from 'js-cookie'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const currentUrl = location.pathname.toUpperCase()
    const isAuth = Cookies.get('isAuth') === 'true'

    if (currentUrl.includes('/ADMIN') && !isAuth) {
      Cookies.set('redirectUrl', location.pathname, { path: '/' })
      navigate('/auth')
    }
  }, [location, navigate])

  useEffect(() => {
    const isAuth = Cookies.get('isAuth') === 'true'
    const redirectUrl = Cookies.get('redirectUrl')

    if (isAuth && redirectUrl) {
      Cookies.remove('redirectUrl', { path: '/' })
      navigate(redirectUrl)
    }
  }, [navigate])

  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
