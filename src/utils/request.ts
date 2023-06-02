import axios, { InternalAxiosRequestConfig } from 'axios'

/**
 * Ajax 返回值
 */
export interface AjaxResponse<T> {
  code: string;
  data: T;
  explain: string;
  field: string;
  msg: string;
  requestId: string;
}

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // BASE URL
  withCredentials: true, // 携带 Cookie
  timeout: 60000 // 请求超时
})

// request interceptor
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
},
error => {
  return error
})

// response interceptor
service.interceptors.response.use((response: any) => {
  return response
},
error => {
  console.log(error)
  return error
})

export default service
