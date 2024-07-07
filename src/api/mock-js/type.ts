export type MockInfoRequestType = {
  id: number
}
export type MockInfoResponseType = {
  name: string
  age: number
}
export type MockStatusRequestType = {
  name: string
}
export type StudentsRequestType = {
  time: number
}
export type StudentsResponseType = {
  id: string
  name: string
  agess: number
}
export type PostCacheDataResponseType = {
  id: string
  name: string
}
export type PostCacheDataRequestType = {
  parkId: number
}
export type GetDownloadRequestType = {
  parkId: number
}
