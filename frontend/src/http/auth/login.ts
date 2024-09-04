import { $api } from '..'

interface IUser {
  login: string
  password: string
}

export async function loginUser(user: IUser): Promise<void> {
  if (user.login.trim().length && user.password.trim().length) {
    try {
      await $api.post(
        'auth/login',
        {
          login: user.login,
          password: user.password,
        },
        { withCredentials: true },
      )
    } catch (error) {
      console.error('Login failed:', error)
    }
  } else {
    console.error('Login and password are required')
  }
}
