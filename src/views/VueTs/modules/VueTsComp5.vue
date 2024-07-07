<template>
  <div>VueTsComp5</div>
</template>

<script setup lang="ts" name="VueTsComp5">
function createArray(value: any, count: number): any[] {
  const arr: any[] = []
  for (let index = 0; index < count; index++) {
    arr.push(value)
  }
  return arr
}
const num01 = createArray(11, 3)[0].toFixed()
const num02 = createArray('oberqwerts', 3)[0].split('')
console.log({
  num01,
  num02
})

// -------------------------------------------------

function createArray2<T>(value: T, count: number) {
  const arr: Array<T> = []
  for (let index = 0; index < count; index++) {
    arr.push(value)
  }
  return arr
}
const arr3 = createArray2<number>(11, 3)
console.log(arr3[0].toFixed())
// console.log(arr3[0].split('')) // error

const arr4 = createArray2<string>('月封号', 3)
console.log(arr4[0].split(''))
// console.log(arr4[0].toFixed()) // error

function handle<K, V>(a: K, b: V): [K, V] {
  return [a, b]
}
const result = handle<string, number>('abc', 123)
console.log(result[0].length, result[1].toFixed())

// ---------------------------------------------------
// ## 泛型接口
// 在定义接口时, 为接口中的属性或方法定义泛型类型
// 在使用接口时, 再指定具体的泛型类型
interface IbaseCRUD<T> {
  data: T[]
  add: (t: T) => void
  getById: (id: number) => T | undefined
}

class User {
  id?: number //id主键自增
  name: string //姓名
  age: number //年龄
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class UserCRUD implements IbaseCRUD<User> {
  data: User[] = []
  add(user: User): void {
    user = { ...user, id: Date.now() }
    this.data.push(user)
    console.log('保存user', user.id)
  }
  getById(id: number): User | undefined {
    return this.data.find((item) => item.id === id)
  }
}
const userCRUD = new UserCRUD()
userCRUD.add(new User('小医仙', 12))
userCRUD.add(new User('熏儿', 13))
console.log(userCRUD.data)

// ------------------------------------------------
// ## 泛型类
// 在定义类时, 为类中的属性或方法定义泛型类型
// 在创建类的实例时, 再指定特定的泛型类型

class GenericNumber<T> {
  zeroValue!: T
  add!: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
const result01 = myGenericNumber.add(myGenericNumber.zeroValue, 120) // 120

let myGenericString = new GenericNumber<string>()
myGenericString.zeroValue = '黎明'
myGenericString.add = function (x, y) {
  return x + y
}
const result02 = myGenericString.add(myGenericString.zeroValue, 'test') // 黎明test

// ---------------------------------------------------
// ## 泛型约束
// 如果我们直接对一个泛型参数取 `length` 属性, 会报错, 因为这个泛型根本就不知道它有这个属性
// 没有泛型约束
const fn = <T,>(x: T): T => {
  // console.log(x.length) // error
  return x
}
fn<string>('100')
fn<number>(100)

// 我们可以使用泛型约束来实现
interface Lengthwise {
  length: number
}
// 指定泛型约束
const fn2 = <T extends Lengthwise>(x: T): void => {
  console.log(x.length)
}
fn2('耶路撒冷')
// fn2(123) // error  number没有length属性
</script>

<style scoped lang="less"></style>
