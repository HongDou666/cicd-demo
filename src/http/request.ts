import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios' // 导入axios ts自带类型
import type { ResponseBody, AxiosOptions, RequestConfigExtra, BaseURLType, SourceType } from './type' // 导入axios ts类型
import { RequestEnum, ContentTypeEnum } from './type' // 导入ts枚举类型
import { message } from 'ant-design-vue'

// 设置请求重试的间隔次数
const retries = 3

// 设置请求重试的间隔时间
const retryDelay = 2000

// 取消axios请求生成器
const cancelToken = axios.CancelToken

// 存放每次new CancelToken生成的 取消axios请求方法
let source: SourceType = {}

// 取消未完成的所有网络请求
export function cancelAllAxios() {
  for (const key in source) {
    source[key] && source[key]('取消所有请求操作') //（message 参数是可选的）
  }
  source = {}
}

// 失败请求尝试重新发起请求
function repeatRequest(config: InternalAxiosRequestConfig & RequestConfigExtra) {
  if (!config.retries) {
    config.retries = 0
  }
  if (config.retries < retries) {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (config.retries || config.retries === 0) {
        config.retries++
      }
      instancePromise(config as AxiosOptions<any> & RequestConfigExtra)
      clearTimeout(timer)
    }, retryDelay)
  }
}

// 生成source中 网络取消请求中 的唯一key值
function getSourceKey(config: InternalAxiosRequestConfig & RequestConfigExtra): string {
  return `${config.url}~${config.method}~${JSON.stringify(config.params)}~${JSON.stringify(config.data)}` || ''
}

const baseURLs: BaseURLType = {
  // 初始的baseURL映射
  default: import.meta.env.VITE_APP_BASE_API ?? '/' // 配置baseURL
}

// 创建一个axios实例映射，根据key来获取不同的实例
const axiosInstances: { [key: string]: AxiosInstance } = {}

// 创建一个axios实例的工厂函数
function createAxiosInstance(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 1000 * 60 * 2, // 两分钟超时
    headers: { 'Content-Type': ContentTypeEnum.JSON } // 请求头设置 'application/json;charset=UTF-8' 告诉服务器发送的数据是以 JSON 格式编码的，并且使用 UTF-8 字符编码进行传输
  } as any)
}

function getAxiosInstance(key: string): AxiosInstance {
  if (!axiosInstances[key]) {
    const baseURL = baseURLs[key] || baseURLs.default
    axiosInstances[key] = createAxiosInstance(baseURL)
  }
  return axiosInstances[key]
}

// 暴露一个方法来获取axios实例
function getAxios() {
  return getAxiosInstance('default')
}

// 创建axios实例
const request: AxiosInstance = getAxios()

// 请求拦截器成功处理
async function requestHandler(config: InternalAxiosRequestConfig & RequestConfigExtra): Promise<InternalAxiosRequestConfig> {
  // import.meta.env.DEV 的值为 true 表示当前处于开发环境
  // 可处理请求前的url, 可以替换url的请求前缀baseUrl
  // config.baseURL = import.meta.env.VITE_APP_BASE_API_DEV

  // 从localStorage获取token，并添加到请求头中
  const token = 'token'

  // 设置token
  if (token) {
    // config.headers.set('Authorization-Token', token) // 方式一
    config.headers['Authorization-Token'] = token // 方式二
  }

  const key = getSourceKey(config)
  if (key && !(config.data instanceof FormData)) {
    // 判断此次请求是否存在和之前一样的请求(请求路径 请求方式 请求参数)，如果存在就把之前的请求取消掉
    // 参数为 FormData 时忽略（大文件分片连续多次上传）
    source[key] && source[key]()
    config.cancelToken = new cancelToken(function executor(cancel) {
      // 把新的取消请求方法保存到source
      source[key] = cancel
    })
  }

  // headers其他配置
  config.headers['Accept-Language'] = 'zh-CN'
  config.headers['Request-Id'] = new Date().getTime() + Math.floor(Math.random() * 999999)

  return config
}

// 请求拦截器错误处理
function requestErrorHandler(error: AxiosError): Promise<any> {
  return Promise.reject(error)
}

// request实例添加请求拦截器
request.interceptors.request.use(requestHandler, requestErrorHandler)

// 响应拦截器成功处理
function responseHandler(response: AxiosResponse): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
  // 请求完成后，清除此次请求的取消方法
  const { config } = response
  const key = getSourceKey(config)
  if (key && source[key]) {
    delete source[key]
  }

  if (response.status === 200) {
    return response.data
  } else {
    // 弹出错误信息（400 401 403 500 503 ...）
  }
  return response.data
}

// 响应拦截器错误处理
function errorHandler(error: AxiosError): Promise<any> {
  const { response, config } = error
  if (response && response.status) {
    const { status } = response as AxiosResponse<ResponseBody>
    switch (status) {
      // 自定义的错误状态码处理
      case 400:
        message.error('请求错误(400)')
        break
      case 401:
        // 未授权，跳转到登录页或执行其他逻辑
        message.error('未授权，请登录')
        break
      case 403:
        // 禁止访问，跳转到错误页或执行其他逻辑
        message.error('拒绝访问')
        // 尝试再次请求
        repeatRequest(config as InternalAxiosRequestConfig & RequestConfigExtra)
        break
      case 500:
        message.error('服务器错误(500)')
        break
      case 503:
        message.error('服务不可用(503)')
        break
      // ...其他状态码处理
      default:
        message.error(`网络连接出错(${status}),请稍后再试!`)
        break
    }

    // 返回封装后的错误信息
    return Promise.reject({
      message: response.data || 'Error',
      code: response.status
    })
  }

  // 取消请求的错误处理（当有请求被取消时触发条件判断）
  if (axios.isCancel(error)) {
    return Promise.reject(error)
  }

  // 其他错误处理
  return Promise.reject(error)
}

// request实例添加响应拦截器
request.interceptors.response.use(responseHandler, errorHandler)

// 此处相当于二次响应拦截, 为响应数据进行定制化处理
function instancePromise<R = any, T = any>(options: AxiosOptions<T> & AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  return new Promise((resolve, reject) => {
    request
      .request<any, AxiosResponse<ResponseBody>>(options)
      .then((res: AxiosResponse<ResponseBody>) => {
        /*
        res 就是和后端共同决定好的最外层结构 
          code: number
          data?: T
          msg: string
        */
        // 此处返回data信息 也就是 type 中配置好的 ResponseBody类型
        resolve(res as unknown as ResponseBody<R>)
      })
      .catch((e: Error | AxiosError) => {
        reject(e)
      })
      .finally(() => {})
  })
}

// get请求
export function useGet<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config
  }
  return instancePromise<R, T>(options)
}

// post请求
export function usePost<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config
  }
  return instancePromise<R, T>(options)
}

// put请求
export function usePut<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config
  }
  return instancePromise<R, T>(options)
}

// delete请求
export function useDelete<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config
  }
  return instancePromise<R, T>(options)
}

// 对外暴露-request
export default request
