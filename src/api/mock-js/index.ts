// 这里书写属性相关的API文件
import { useGet, usePost } from '@/http/request'
import type { PromiseType } from '../type'
import type {
  MockInfoRequestType,
  MockInfoResponseType,
  MockStatusRequestType,
  StudentsRequestType,
  StudentsResponseType,
  PostCacheDataResponseType,
  PostCacheDataRequestType,
  GetDownloadRequestType
} from './type'

enum API {
  MOCK_INFO = '/mock/user/info',
  MOCK_STATUS = '/mock/user/status',
  STUDENTS = '/demo/students',
  CACHEDATA = '/demo/cache/data',
  DOWNLOAD = '/download/emergency-response/integration/system_manual/RESOURCE1689663612812.pdf',
  IMAGES = '/images/30kbps/images/sunrise-baseline.jpg',
  UPLOAD = '/upload/file',
  DOWNLOADPDF = '/downloadPdf/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
  DOWNLOADVIDEO = '/downloadVideo/try/demo_source/movie.mp4'
}

/* useGet<类型参数1 类型参数2> 参数1：接口数据返回的data的类型 | 参数2：接口传参类型 */
/* PromiseType<类型参数3>> 参数3：接口数据返回的data的类型 */

/* 使用封装方法请求数据(mock get请求) */
export const mockInfo = (param: MockInfoRequestType): PromiseType<MockInfoResponseType> => {
  return useGet<MockInfoResponseType, MockInfoRequestType>(API.MOCK_INFO, param)
}

/* 使用封装方法请求数据(mock post请求) */
export const mockStatus = (param?: MockStatusRequestType): PromiseType<number[]> => {
  return usePost<number[], MockStatusRequestType>(API.MOCK_STATUS, param)
}

/* 使用封装方法请求真实数据 */
export const students = (param: StudentsRequestType, config: any): PromiseType<StudentsResponseType[]> => {
  return useGet<StudentsResponseType[], StudentsRequestType>(API.STUDENTS, param, config)
}

/* 使用封装方法请求真实数据 */
export const postCacheData = (data: PostCacheDataRequestType): PromiseType<PostCacheDataResponseType[]> => {
  return usePost<PostCacheDataResponseType[], PostCacheDataRequestType>(API.CACHEDATA, data)
}

/* 使用封装方法请求真实数据 (下载文件pdf) */
export const getDownloadPdf = (param: GetDownloadRequestType, config?: any): PromiseType<Blob> => {
  return useGet<Blob, GetDownloadRequestType>(API.DOWNLOAD, param, config)
}

/* 使用封装方法请求真实数据 (下载图片) */
export const getDownloadImg = (param: GetDownloadRequestType, config?: any): PromiseType<Blob> => {
  return useGet<Blob, GetDownloadRequestType>(API.IMAGES, param, config)
}

/* 使用封装方法请求真实数据 (上传文件) */
export const postUpload = (data: FormData, config?: any): PromiseType<null> => {
  return usePost<null, FormData>(API.UPLOAD, data, config)
}

/* 使用封装方法请求真实数据 (下载文件pdf) */
export const getDownloadPdf1 = (param: GetDownloadRequestType, config?: any): PromiseType<Blob> => {
  return useGet<Blob, GetDownloadRequestType>(API.DOWNLOADPDF, param, config)
}

/* 使用封装方法请求真实数据 (下载文件video) */
export const getDownloadVideo = (param: any, config?: any): PromiseType<Blob> => {
  return useGet<Blob, any>(API.DOWNLOADVIDEO, param, config)
}
