<template>
  <div>VueTsComp9</div>
</template>

<script setup lang="ts" name="VueTsComp9">
// 1. 去除接口里面的某一个属性，并把其他所有的属性变成可选的
interface SubsystemItem {
  name: string
  age: number
  arr: string[]
  spaces: Array<number>
}
// <Partial<Omit<SubsystemItem, 'spaces'>>> 相当于除了spaces其他key都变成可选择的
// interface SubsystemItem {
// name?: string
// age?: number
// arr?: string[]
// }
const description = ref<Partial<Omit<SubsystemItem, 'spaces'>>>({
  name: '100',
  age: 90
})
console.log(description)

// 2. Ts 函数返回Promise
interface Iobj {
  code: number
  msg: string
}
const login = (): Promise<Iobj> => {
  return new Promise((resolve) => {
    resolve({
      code: 1,
      msg: 'ok'
    })
  })
}
login().then((res) => {
  console.log(res)
})
let asyncFn: () => Promise<Iobj> = login

// 3. 把接口里面的一些字段去除掉
type Todo = {
  a?: string
  b: number
  c: boolean
}
type TodoOmit = Omit<Todo, 'a' | 'c'>
const obj: TodoOmit = {
  b: 100
}

// 4. 只保留接口里面的一些字段，其余字段全部去除掉
type Todo2 = {
  a?: string
  b: number
  c: boolean
}
type PickOmit = Pick<Todo2, 'a' | 'c'>
const obj2: PickOmit = {
  a: 'string',
  c: true
}

// 5. 把接口里面的属性全部变为可选的
type Todo3 = {
  a: string
  b: number
  c: boolean
}
type PartialOmit = Partial<Todo3> // 属性全都变为可选的
const obj3: PartialOmit = {
  c: true
}
console.log(obj3)

// 6. 封装一个接口类型,把接口里面的一些字段变为选填,其余的不变
interface Todo4 {
  tltle: string
  name: number
  falg: boolean
  content: (a: number) => void
  fns(): number
}
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type Todo4Opinops = Optional<Todo4, 'tltle' | 'name' | 'falg'> // 把'tltle' | 'name' | 'falg'变为选填
const obj4: Todo4Opinops = {
  content: () => {},
  fns: () => 100
}

// 7. 把接口里面的所有字段变为必填类型
interface Todo5 {
  tltle: string
  name: number
  falg?: boolean
}
type OptionalRequired<T> = Required<T>
const Todo5Opinops: OptionalRequired<Todo5> = {
  tltle: 'name',
  name: 100,
  falg: true
}

// 8. 接口字段重命名
interface Todo6 {
  tltle: string
  name: number
  falg?: boolean
}
type Todo6Type<T> = {
  [key in keyof T as `get${Capitalize<key & string>}`]: T[key] // key & string 类型交叉
}
// 每个字段前面都加上get前缀
const Todo6Opinops: Todo6Type<Todo6> = {
  getTltle: '100',
  getName: 100,
  getFalg: true
}

// 9. 封装一个接口, 挑选出接口里面所有的可选字段(可选字段还保留其本身的可选类型), 其余字段去除
interface Todo7 {
  tltle: string
  name?: number
  falg?: boolean
}
type Todo7Type<T> = {
  [key in keyof T as T[key] extends Required<T>[key] ? never : key]: T[key]
}
const Todo7Opinops: Todo7Type<Todo7> = {
  falg: true
}

// 10. 封装一个接口类型,实现将联合类型转换为交叉类型
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never

interface Todo71 {
  tltle: string
  name: number
  falg?: boolean
}
interface Todo72 {
  a: string
  b: number
  c: boolean
}

type A = UnionToIntersection<Todo72 | Todo71>
const unionToIntersectionOpion: A = {
  tltle: '100',
  name: 100,
  // falg: false,
  a: '100',
  b: 100,
  c: true
}

// 11. 封装一个接口类型,实现限制一个对象key值只能是 number 或者 string ，value值限制为EmployeeType类型
interface EmployeeType {
  id: number
  fullname: string
  role: string
}
type RecordType<T extends string | number> = Record<T, EmployeeType>
const employees: RecordType<string | number> = {
  100: { id: 2, fullname: 'Ibrahima Fall', role: 'Developer' },
  name: { id: 3, fullname: 'Sara Duckson', role: 'Developer' }
}

// 12. 封装函数 定义组件类型(带有ts类型提示,前提是将要引入组件的方法暴露出去)
const useCompRef = <T extends abstract new (...args: any) => any>() => {
  return ref<InstanceType<T>>()
}
// VcaSetupChildren => 引入组件的名称
// const vcaSetup = useCompRef<typeof VcaSetupChildren>()
</script>

<style scoped lang="less"></style>
