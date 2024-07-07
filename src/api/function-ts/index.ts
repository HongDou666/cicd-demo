// 这里书写属性相关的API文件
import request, { useGet } from '@/http/request'
import type { AttrValue } from './type'
import type { PromiseType } from '../type'

enum API {
  IMG = '/pcwallpaper_ugc/scene/a7022b5abbefb617559badec96433b87_preview.jpg'
}

/* 方式1：直接请求数据 */
export const getImg = (params: AttrValue) => {
  return request<any, Blob>({
    url: API.IMG,
    method: 'get',
    responseType: 'blob',
    params
  })
}

/* 方式2：使用封装方法请求数据 */

/* useGet<类型参数1 类型参数2> 参数1：接口数据返回的data的类型 | 参数2：接口传参类型 */
/* PromiseType<类型参数3>> 参数3：接口数据返回的data的类型 */

export const getImg1 = (params: AttrValue, config?: any): PromiseType<Blob> => {
  return useGet<Blob, AttrValue>(API.IMG, params, config)
}
