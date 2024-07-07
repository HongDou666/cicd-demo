import type { Canceler } from 'axios'
/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

// ts 定义接口返回数据格式的同一类型
export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
  status?: number // 状态码
}

// ts 接口参数类型定义
export interface AxiosOptions<T = any> {
  url: string
  params?: T
  data?: T
}

// ts 拦截器函数中参数类型定义
export interface RequestConfigExtra {
  token?: boolean
  customDev?: boolean
  loading?: boolean
  retries?: number
}

// ts BaseURL 类型定义
export interface BaseURLType {
  [key: string]: string
}

// ts axios取消请求 类型定义
export interface SourceType {
  [key: string]: Canceler
}
