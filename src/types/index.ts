// 全局ts自定义类型配置
export interface InterObj {
  name: string
  age: number
  location?: string // 可选属性
  [propName: string]: any // 其他属性，定义变量可忽略
}
