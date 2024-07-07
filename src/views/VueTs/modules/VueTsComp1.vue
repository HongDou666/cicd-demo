<template>
  <div id="VueTsComp1">VueTsComp1</div>
</template>

<script setup lang="ts" name="VueTsComp1">
import type { InterObj } from '@/types/index'

// 隐式推断
let myname1 = 'zhangqingchen'
myname1 = myname1.substring(1, 5)

// 显式定义类型
let myname: string = 'kerwin'
myname = 'xiaoming'

let myage: number = 100
let myshow: boolean = true
let myvalue: string | number = 100
myvalue = 'kerwin'
let myany: any = '323'
myany = {}

const num1: undefined = undefined
const num2: null = null
// "strict": false  关闭严格模式
// const num3: number = null 报错

let mylist: string[] = ['kerwin', 'xiaoming']
mylist.push('tiechui')
let mylist2: number[] = [1, 2, 3]
mylist2.push(100)
let mylist3: (string | number)[] = ['kerwin', 100]
let mylist4: any[] = ['kerwin', 100, {}, []]
let mylist5: Array<string> = ['aaa', 'bbb']
let mylist6: Array<string | number> = ['aaa', 1000]
let mylist7: Array<any> = ['aaa', 1000]

let b: object = new Boolean(1)
let n: object = new Number(true)
let s: object = new String('abc')
let d: Date = new Date()
let r: RegExp = /^1/
let e: Error = new Error('error message')

let myobj: InterObj = {
  name: 'kerwin',
  age: 100,
  location: 'dalian',
  a: 1,
  b: 2,
  c: [],
  d: {}
}

const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
  console.log('Hi!, setTimeout ')
}, 2000)

onMounted(() => {
  const div: HTMLElement | HTMLDivElement | HTMLInputElement | Event | null = document.getElementById('VueTsComp1')

  // const divs: NodeList = document.querySelectorAll('div')
  // const divs = <NodeList>document.querySelectorAll('div')
  const divs = document.querySelectorAll('div') as NodeList

  document.addEventListener('click', function (event: MouseEvent) {
    console.log(event.target)
  })

  const fragment: DocumentFragment = document.createDocumentFragment()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped lang="less"></style>
