<template>
  <div>VueTsComp4</div>
  <img :src="urlImg" alt="" />
  <img :src="urlImg1" alt="" />
</template>

<script setup lang="ts" name="VueTsComp4">
import { getImg, getImg1 } from '@/api/function-ts/index'

interface Custom {
  name?: string
}

const fn0 = (aoao: Custom) => {
  // aoao.name! 表示aoao.name 不可能是null或者undefined
  return aoao.name!.length
}
fn0({
  name: '100'
})

/* ------------------------------------------------ */

const fn = (a: number, b: number): number => {
  return a + b
}
fn(1, 2)
/* ------------------------------------------------ */

let fn2 = (obj: object): object => {
  console.log('obj', obj)
  return {}
}
fn2(new String('abc'))
fn2(String)

/* ------------------------------------------------ */
let fn3 = (x: number | string): string => {
  return x.toString()
}
const res = fn3(190) // 190

/* ------------------------------------------------ */
let myAdd2: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y
}
myAdd2(1, 2)

/* ------------------------------------------------ */
// 用接口定义函数
interface SearchFunc {
  (a: string, b: string, c: string, d: string, e?: string): boolean
}
const mySearch: SearchFunc = (value_a: string, value_b: string, value_c: string, value_d: string | boolean): boolean => {
  console.log(value_c)
  console.log(value_d)
  return value_a.search(value_b) > -1
}
mySearch('1', '2', '3', '4')

/* ------------------------------------------------ */
// 用接口定义数组
interface Arr {
  [customIndex: number]: string | number | boolean // customIndex 随便命名
}
const tree: Arr = ['100', 200, true]

/* ------------------------------------------------ */
// 用接口定义对象
interface Inter {
  name: string
  age: number
  [propName: string]: string | number // // propName 随便命名
  // ull: null 报错err
}
const obj: Inter = {
  a: '100',
  99: '100',
  name: 'name',
  age: 100
  // ull: null
}

/* ------------------------------------------------ */

const buildName = (firstName: string = 'A', lastName?: string): string => {
  if (lastName) {
    return firstName + '-' + lastName
  } else {
    return firstName
  }
}
console.log(buildName('C', 'D')) // C-D
console.log(buildName('C')) // C
console.log(buildName()) // A

/* ------------------------------------------------ */

/*
  函数重载: 函数名相同, 而形参不同的多个函数
  需求: 我们有一个add函数，它可以接收2个string类型的参数进行拼接，也可以接收2个number类型的参数进行相加
*/

// 重载函数声明
function add(x: string, y: string): string
function add(x: number, y: number): number
function add(x: number, y: string): string
// 定义函数实现
function add(x: string | number, y: string | number): string | number | void {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
  if (typeof x === 'string' && typeof y === 'string') {
    return x + y
  } else if (typeof x === 'number' && typeof y === 'number') {
    return x + y
  } else if (typeof x === 'number' && typeof y === 'string') {
    return x + y
  }
}
add(1, 2) // 3
add('a', 'b') // ab
// add('a', 10) // 报错
const res1 = add(1, 'a') // 1a

/* ------------------------------------------------ */

// 函数重载发生在对象中
interface utilsType {
  message: showMessageTpye
}
interface showMessageTpye {
  (x: string): void
  (x: string, y?: string | number): void
  (x: number, y?: boolean, z?: boolean): void
}
const utils: utilsType = {
  message(x: string | number, y?: string | number | boolean, z?: boolean) {
    if (typeof x === 'string' && typeof y === 'string') {
      return x + y
    } else if (typeof x === 'number' && typeof y === 'number') {
      return x + y
    }
  }
}
utils.message(1, false, true)
utils.message('10', 2)
utils.message('10')
utils.message(90)
utils.message(1, true)

// utils.message(1, 2, true) // error
// utils.message('1', true) // error

/* ------------------------------------------------ */

function info(x: string, ...args: string[]) {}
info('abc', 'c', 'b', 'a')

/* ------------------------------------------------ */

function getLength(x: number | string): number {
  if ((x as string).length) {
    // return (<string>x).length
    return (x as string).length
  } else {
    return x.toString().length
  }
}
console.log(getLength('abcd'), getLength(12345))

/* ------------------------------------------------ */
/* void 表示没有任何类型, 一般用来说明函数的返回值不能是undefined和null之外的值 */
const handle = <K, V>(value: K, num: V): void => {
  console.log(value)
  console.log(num)
}
interface handleTs {
  name: string
}
interface handleTsRes {
  age: number
}
const param1: handleTs = {
  name: '名字'
}
const param2: handleTsRes = {
  age: 100
}
handle<handleTs, handleTsRes>(param1, param2)

/* ------------------------------------------------ */
interface handleTsNew {
  name: string
}
interface handleTsResNew {
  age: number
}
const handleNew = (value: handleTsNew, num: handleTsResNew): string => {
  console.log(value)
  console.log(num)
  return value.name + num.age
}
const param1New: Parameters<typeof handleNew>[0] = {
  name: '名字'
}
const param2New: Parameters<typeof handleNew>[1] = {
  age: 100
}
let result: ReturnType<typeof handleNew>
result = handleNew(param1New, param2New)

/* ------------------------------------------------ */
const urlImg = ref<string>('')
const urlImg1 = ref<string>('')
onMounted(async () => {
  // 方法1
  // const params: AttrValue = {
  //   // id: 10,
  //   valueName: 'test',
  //   attrId: 20,
  //   flag: true
  // }
  // const res: Blob = await getImg(params)
  // urlImg.value = URL.createObjectURL(res)

  // 方法2
  const params: Parameters<typeof getImg>[0] = {
    id: 10,
    valueName: 'test',
    attrId: 20,
    flag: true
  }
  let res: ReturnType<typeof getImg> = getImg(params)
  urlImg.value = URL.createObjectURL(await res)

  // 方法3
  const params1: Parameters<typeof getImg1>[0] = {
    valueName: 'test',
    attrId: 20,
    flag: true
  }
  const config = {
    responseType: 'blob'
  }
  try {
    let res1: ReturnType<typeof getImg1> = getImg1(params1, config)
    const res2: any = await res1
    console.log('blob', res2)
    urlImg1.value = URL.createObjectURL(res2)
  } catch (error) {
  } finally {
  }
})
</script>

<style scoped lang="less">
img {
  width: 200px;
}
</style>
