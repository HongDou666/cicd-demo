<template>
  <div>VueTsComp2</div>
</template>

<script setup lang="ts" name="VueTsComp2">
enum Color1 {
  Red,
  Green,
  Blue
}

// 枚举数值默认从0开始依次递增
// 根据特定的名称得到对应的枚举数值
let myColor: Color1 = Color1.Green // 1
console.log(myColor, Color1.Red, Color1.Blue) // 1 0 2

enum Color2 {
  Reds = 10,
  Greens,
  Blues
}
let c: Color2 = Color2.Greens // 11

enum Color3 {
  RedPro = 1,
  GreenPro = 2,
  BluePro = 4
}
let num1: Color3 = Color3.GreenPro // 2

enum Color4 {
  RedMax,
  GreenMax = 2,
  BlueMax
}
let colorName1: string = Color4[2] // GreenMax
let colorName2: string = Color4[3] // BlueMax
</script>

<style scoped lang="less"></style>
