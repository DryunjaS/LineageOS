import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { loginUser } from '../http/auth/login'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

interface User {
  login: string
  password: string
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User>({
    login: 'ADMIN',
    password: '',
  })
  const [isError, setisError] = useState(false)

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const userAuth = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await loginUser(user)
      const isAuth = Cookies.get('isAuth') === 'true'
      if (isAuth) {
        const redirectUrl = Cookies.get('redirectUrl')
        navigate(redirectUrl || '/')
        Cookies.remove('redirectUrl', { path: '/' })
      } else {
        setisError(true)
      }
    } catch (error) {
      console.error('Login failed:', error)
      setisError(true)
    }
  }

  useEffect(() => {
    const isAuth = Cookies.get('isAuth') === 'true'

    if (isAuth) {
      const redirectUrl = Cookies.get('redirectUrl')

      navigate(redirectUrl || '/')
      Cookies.remove('redirectUrl', { path: '/' })
    }
  }, [navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-4/5 rounded-lg bg-primary p-6 shadow-lg md:w-[450px]">
        <h1 className="mb-4 text-center text-2xl font-bold uppercase text-white md:text-4xl">
          Авторизация
        </h1>
        <p className="mb-2 text-center text-[14px] text-white md:text-[16px]">
          Для перехода в режим редактирования требуется авторизоваться
        </p>
        <form className="flex flex-col space-y-4" onSubmit={userAuth}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            className="rounded border border-gray-300 p-2"
            value={user.login}
            onChange={changeInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="rounded border border-gray-300 p-2"
            value={user.password}
            onChange={changeInput}
          />
          {isError && (
            <p className="text-center text-white">Неверен логин или пароль</p>
          )}
          <button
            type="submit"
            className="rounded border border-white bg-primary p-2 text-white transition duration-150 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 active:bg-white/20"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
