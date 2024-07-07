/* 在 Vue Router v4 中为自定义元字段声明 TypeScript 类型接口 */
import 'vue-router'
declare module 'vue-router' {
  import type { RouteRecordRaw } from 'vue-router'

  interface RouteMeta {
    isAdmin?: boolean
    requiresAuth: boolean
    customMate: (parm: string) => string

    name?: string
    title?: string
    icon?: string
    hideInMenu?: boolean
    parentKeys?: string[]
    isIframe?: boolean
    url?: string
    hideInBreadcrumb?: boolean
    hideChildrenInMenu?: boolean
    keepAlive?: boolean
    target?: '_blank' | '_self' | '_parent'
    affix?: boolean
    id?: string | number
    parentId?: string | number | null
    access?: (string | number)[]
    locale?: string
    parentName?: string
    parentComps?: RouteRecordRaw['component'][]
    originPath?: string
  }
}
/* 在 Vue Router v4 中为自定义元字段声明 TypeScript 类型接口 */
