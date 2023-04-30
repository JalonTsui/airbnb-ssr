import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus/es/components/message/index.mjs'

const defaultConfig: AxiosRequestConfig = {
  timeout: 5000,
  // baseURL: import.meta.env.PROD ? '' : 'http://localhost:3000'
}
class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 实例化axios
  private static axiosInstance = axios.create(defaultConfig)

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      return config
    }, (err: any) => {
      // 对请求错误的处理
      return Promise.reject(err)
    })
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      // 对响应成功的处理，处理一些接口成功的状态码，比如:2xx范围内的状态码
      const { data } = res
      const { success } = data
      if (success) {
        ElMessage({ message: '获取成功', type: 'success' })
      } else {
        ElMessage.error('失败')
      }
      return res
    }, (err: any) => {
      // 对响应错误的处理，处理一些接口失败所返回的状态码，比如：3XX,4XX,5XX范围内的状态码
      return Promise.reject(err)
      // ElMessage('服务器异常')
    })
  }


  public httpGet<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance.get(url, { params }).then(res => res.data).catch()
  }

  public httpPost<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    return Http.axiosInstance.post(url, { params }).then(res => res.data).catch()
  }
}

export const http = new Http()
