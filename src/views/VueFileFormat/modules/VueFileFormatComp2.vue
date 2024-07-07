<template>
  <div class="VueFileFormatComp2">
    <p>VueFileFormatComp2</p>
    <!-- 因为跨域问题导致图片无法直接下载，展现形式就默认为页面预览 -->
    <a download href="https://img1.baidu.com/it/u=2658301596,3565669889&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800">图片下载1</a>

    <br />

    <!-- 解决: (new XMLHttpRequest) 获取图片的Blob对象 将其转换为url地址进而实现可以直接下载  -->
    <a-button type="primary" @click="handleClick">new XMLHttpRequest</a-button>
  </div>
</template>

<script setup lang="ts" name="VueFileFormatComp2">
const handleClick = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://img1.baidu.com/it/u=2658301596,3565669889&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800', true)
  xhr.responseType = 'blob' // 接受资源信息的类型
  xhr.send()
  xhr.onload = () => {
    const fileBolb = xhr.response // 拿到Blob
    console.log(fileBolb)
    const fileUrl = URL.createObjectURL(fileBolb) // 将Blob转换为url地址
    const a = document.createElement('a') // 创建a标签
    a.setAttribute('href', fileUrl) // 设置a标签的href属性
    a.setAttribute('download', '娜美') // 设置a标签的download属性(点击可以下载图片)
    a.innerHTML = '图片下载2' // 设置a标签显示的文本
    document.querySelector('.VueFileFormatComp2')!.appendChild(a) // 添加到页面
    // a.click() // 点击a标签(直接下载图片)
  }
}
</script>

<style scoped lang="less"></style>
