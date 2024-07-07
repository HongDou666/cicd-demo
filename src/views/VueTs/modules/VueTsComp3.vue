<template>
  <div>VueTsComp3</div>
</template>

<script setup lang="ts" name="VueTsComp3">
class Greeter {
  // 声明属性
  message: string
  // 构造方法
  constructor(message: string) {
    this.message = message
  }
  // 一般方法
  greet(): string {
    return 'Hello ' + this.message
  }
}
// 创建类的实例
const greeter = new Greeter('world')
// 调用实例的方法
const res = greeter.greet() // Hello world

/* 1. 类的继承 */
class Animal {
  run(distance: number) {
    console.log(`Animal run ${distance}m`)
  }
}
class Dog extends Animal {
  cry() {
    console.log('wang! wang!')
  }
}
const dog = new Dog()
dog.cry()
dog.run(100) // 可以调用从父中继承得到的方法

class Animal1 {
  name: string
  constructor(name: string) {
    this.name = name
  }
  run(distance: number = 0) {
    console.log(`${this.name} run ${distance}m`)
  }
}
class Snake extends Animal1 {
  constructor(name: string) {
    // 调用父类型构造方法
    super(name)
  }
  // 重写父类型的方法
  run(distance: number = 5) {
    console.log('sliding...')
    super.run(distance)
  }
}
const snake = new Snake('snake')
snake.run()
class Horse extends Animal1 {
  constructor(name: string) {
    // 调用父类型构造方法
    super(name)
  }
  // 重写父类型的方法
  run(distance: number = 50) {
    console.log('dashing...')
    // 调用父类型的一般方法
    super.run(distance)
  }
  xxx() {
    console.log('xxx()')
  }
}
const horse = new Horse('Horse')
horse.run()

// 父类型引用指向子类型的实例 ==> 多态
const tom: Animal1 = new Horse('Horse123456')
tom.run()

/* 如果子类型没有扩展的方法, 可以让子类型引用指向父类型的实例 */
const tom3: Snake = new Animal1('tom3')
tom3.run()

/* 如果子类型有扩展的方法, 不能让子类型引用指向父类型的实例 */
// const tom2: Horse = new Animal1('tom2')
// tom2.run()

/*
  2. 访问修饰符: 用来描述类内部的属性/方法的可访问性
    public: 默认值, 公开的外部也可以访问
    private: 只能类内部可以访问
    protected: 类内部和子类可以访问
*/
class Animal2 {
  public name: string
  public constructor(name: string) {
    this.name = name
  }
  public run(distance: number = 0) {
    console.log(`${this.name} run ${distance}m`)
  }
}

class Person extends Animal2 {
  private age: number = 18
  protected sex: string = '男'
  run(distance: number = 5) {
    console.log('Person jumping...', this.age)
    console.log('Person jumping...', this.sex)
    super.run(distance)
  }
}
// 公开的可见
const dataName = new Person('天道佩恩').name // 天道佩恩
// 受保护的不可见
// const sex = new Person('天道佩恩').sex
// 私有的不可见
// const age = new Person('abc').age

class Student extends Person {
  run(distance: number = 6) {
    console.log('Student jumping...')
    console.log(this.sex) // 子类能看到父类中受保护的成员
    // console.log(this.age) //  子类看不到父类中私有的成员
    super.run(distance)
  }
}
new Student('巴黎时代').run(980)

/* 3. readonly 修饰符 , 你可以使用 `readonly` 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化 */
class Person1 {
  readonly name: string = 'abc'
  constructor(name: string) {
    this.name = name
  }
}
let john = new Person1('John')
// john.name = 'peter' // 只读 error

class Person2 {
  constructor(readonly name: string) {
    this.name = name
  }
}
const jack = new Person2('jack') // jack

/* 4. 存取器 
`TypeScript` 支持通过 `getters/setters` 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
下面来看如何把一个简单的类改写成使用 `get` 和 `set`。 首先，我们从一个没有使用存取器的例子开始。
*/
class Person3 {
  firstName: string = 'A'
  lastName: string = 'B'
  get fullName() {
    return this.firstName + '-' + this.lastName
  }
  set fullName(value) {
    const names = value.split('-')
    this.firstName = names[0]
    this.lastName = names[1]
  }
}
const p = new Person3() // A-B
p.firstName = 'C'
p.lastName = 'D'
console.log(p.fullName) // C-D
p.fullName = 'E-F'
console.log(p.firstName, p.lastName) // E F

/*
  5. 静态属性 , 是类对象的属性
  非静态属性, 是类的实例对象的属性
*/
class Person4 {
  name1: string = 'A'
  static name2: string = 'B'
}
const name2 = Person4.name2 // B
const name1 = new Person4().name1 // A

/* 
  6. 抽象类
  抽象类做为其它派生类的基类使用。 它们不能被实例化。不同于接口，抽象类可以包含成员的实现细节。
   `abstract` 关键字是用于定义抽象类和在抽象类内部定义抽象方法。
   不能创建实例对象, 只有实现类才能创建实例
  可以包含未实现的抽象方法
*/
abstract class Animal3 {
  abstract cry(): string
  run() {
    console.log('Animal3 run')
  }
}
class Dog1 extends Animal3 {
  cry() {
    console.log('Dog cry')
    return 'Dog cry()'
  }
}
const dog1 = new Dog1()
dog1.cry()
dog1.run()
</script>

<style scoped lang="less"></style>
