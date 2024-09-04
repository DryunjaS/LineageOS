// import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
// import Cookies from 'js-cookie'

// const $api: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_URL_SERVER as string,
// })

// const $authApi: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_URL_SERVER as string,
// })

// const authInterceptor = (config: InternalAxiosRequestConfig) => {
//   const token = Cookies.get('token')
//   if (token) {
//     config.headers.set('authorization', `Bearer ${token}`)
//   }
//   return config
// }

// $authApi.interceptors.request.use(authInterceptor)

// export { $api, $authApi }
import axios, { AxiosInstance } from 'axios'

const $api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER as string,
})

const $authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER as string,
  withCredentials: true,
})

export { $api, $authApi }
