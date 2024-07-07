<template>
  <div>VueFileFormatComp1</div>
</template>

<script setup lang="ts" name="VueFileFormatComp1">
// 1. 创建文件File对象
const file = new File(['hello123456789'], '名字.txt')
console.log(file)

// 2. 创建Bolb对象
const blob = new Blob(['hello123456789'], { type: 'text/plain' })
console.log(blob)
// 将Bolb对象读取为纯文本
blob.text().then((val) => {
  console.log(val) // hello123456789
})

// 3. Bolb对象分片
const blobChunck = blob.slice(0, 5, 'text/plain')
console.log(blobChunck)
blobChunck.text().then((val) => {
  console.log(val) // hello
})

// 4. 创建可读取Bolb对象的FileReader
const reader = new FileReader()
// 将Bolb对象(借助 FileReader)读取为纯文本 - readAsText
reader.readAsText(blob)
reader.onload = () => {
  console.log(reader.result) // hello123456789
}
</script>

<style scoped lang="less"></style>
