<template>
  <div class="ul">
    <div class="li val_li" tabindex="1">1</div>
    <div class="li val_li">2</div>
    <div class="li val_li">3</div>
    <div class="li val_li">3</div>
    <div class="li val_li">3</div>
    <div class="li val_li">3</div>
    <div data-required class="item val_li">4</div>
    <div class="item val_li">5</div>
    <div class="item val_li">6</div>
    <div class="item val_li">7</div>
    <div class="item val_li">8</div>
    <div class="item val_li">9</div>
  </div>
  <div id="id2_custom_custom" name="id2_custom">
    <h1>viewport</h1>
    <a-button type="primary" @click="handleClick">开始取色</a-button>
  </div>
  <div class="div_cus">
    我是div
    <input type="text" />
  </div>
  <div class="div_cus">
    lertainly! Here’s a short passage in English: The sun dipped low on the horizon, casting a golden hue across the tranquil waters of the lake. The
    gentle breeze whispered through the trees, rustling the leaves in a soothing melody. As evening descended, the sky transformed into a canvas of .
  </div>
</template>

<script setup lang="ts" name="CssPropertyComp1">
import type { ComponentInternalInstance } from 'vue' // 来自vue的ts类型引入
const { proxy: th } = getCurrentInstance() as ComponentInternalInstance
const handleClick = () => {
  if (!window.EyeDropper) {
    th!.$message.info('你的浏览器不支持 EyeDropper API')
    return
  }
  const eyeDropper = new window.EyeDropper()
  eyeDropper
    .open()
    .then((result) => {
      th!.$message.info(`颜色值为: ${result.sRGBHex}`, 3)
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<style scoped lang="less">
/* has */
.ul {
  align-items: center;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 70px;
    height: 70px;
    font-size: 24px;
    color: #fff;
    background-color: #299;
    cursor: pointer;
  }

  .val_li {
    // hover .val_li时寻找下一个是.val_li的元素
    &:hover + .val_li {
      background-color: aqua;
    }
  }
  // hover .val_li时寻找上一个是.val_li的元素
  .val_li:has(+ .val_li:hover) {
    background-color: aqua;
  }

  // hover .item时寻找上面所有是.li的元素
  .li:has(~ .item:hover) {
    background-color: rgb(255 145 0);
  }

  // 点击元素
  .val_li:active {
    background-color: purple;
  }

  // 点击元素时寻找下面所有为.item的所有元素(找到类名为.val_li的元素并且点击,但是他的后面的元素需要是类名为item)
  .val_li:active ~ .item {
    background-color: purple;
  }

  // 设置 类名为item的上面类名为li的所有元素(找到类名为li的元素,但是他的后面的某个元素需要是类名为item)
  .li:has(~ .item) {
    border-radius: 20px;
  }

  // 设置 类名为item的上一个类名为li的元素(找到类名为li的元素,但是他的后面的第一个元素需要是类名为item && 带有自定义属性)
  .li:has(+ .item[data-required]) {
    background-color: rgb(189 202 0);
  }

  /* .ul 下面的div元素中的类名不是item的元素 */
  div:not(.item) {
    color: #fffa31;
  }
}

// 通过子元素寻找父元素
.ul:has(.val_li) {
  display: flex;
}

/* where 设置id是id2_custom && name是以_custom结尾的元素 */
:where([id^='id2_custom'][name$='_custom']) h1 {
  color: rgb(0 214 143);
}

.div_cus {
  display: inline-block;
  width: 300px;
  height: 300px;
  text-align: left;
  border: 1px solid rgb(30 255 0);
  vertical-align: bottom;

  input:focus {
    border: 1px solid red;
    outline: none;
  }

  /* focus-within 当元素里面有input子元素并且当子元素聚焦时 */
  &:focus-within {
    background-color: aquamarine;
  }
  // 选中一个段落中的第一个文字
  &::first-letter {
    float: left;
    margin-right: 10px;
    font-size: 4em;
    text-transform: uppercase;
    line-height: 1;
  }
  // 更改一个段落中选中的样式
  &::selection {
    text-decoration: underline;
    color: rgb(255 164 103);
    background-color: #299;
  }
}
</style>
