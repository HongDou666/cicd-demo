<template>
  <div class="less_style">
    Less
    <i class="less_style-zqc">small</i>
  </div>
  <span>测试less</span>

  <div class="less_auto">全局less变量自动引用</div>
  <div class="less_import">全局less变量手动引用</div>
  <div class="flex-center color-dark-gray">全局Css自定义样式</div>
</template>

<script setup lang="ts" name="Less"></script>

<style scoped lang="less">
@import url('~@/views/Less/styles/index.less');
@width: 100px;
@height: 50px;
@borLeft: left;
@my-selector: less_style;

@images: '~@/assets';
// @images: '../../assets';

.borderd(@borderd: 2px) {
  // 默认是border 2px
  border: @borderd solid #f60;
}
.border-radius(@radius :@height) {
  border-radius: @radius;
}
.wrap() {
  text-wrap: wrap;
}

.@{my-selector} {
  border-@{borLeft}: 10px solid rgb(247 0 255);
  margin: 0 auto;
  width: @width;
  height: @height;
  font-size: @size-title;
  color: @color-title;
  background-color: aquamarine;
  font-weight: @size-weight;

  @width: 400px;

  &:hover {
    // 等同于 a:hover
    color: green;

    & + span {
      color: rgb(223 61 61);
    }
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    display: @custom;
    width: 50px;
    height: 50px;
    background: url('@{images}/img/test.jpg');
    background-size: contain;
    content: '';
  }

  & + span {
    font-size: 30px;
    color: rgb(37 58 179);
  }

  &-zqc {
    // less_style-children
    color: rgb(101 0 196);
  }
  .borderd();
  .border-radius(10px); //border-radius:10px;
  .wrap;
}
</style>

<style scoped lang="less">
// 1. 引入方式
// @import '~@/styles/less/global-import-variable.less';
// 2. 引入方式
@import url('~@/styles/less/global-import-variable.less');

// 全局less变量自动引用
.less_auto {
  font-size: @size-title;
  font-weight: @size-weight;
  color: @primary-color;
  background-color: @warning-color;
}

// 全局less变量手动引用（ @import url('~@/styles/less/global-import-variable.less');）
// 因为 less-loader 编译是在当前文件，所以 (不手动引入 或者 vite.config.ts全局引入) 会导致找不到变量问题
.less_import {
  font-size: @font-size-custom;
  font-weight: @font-weight-custom;
  color: @font-color-custom;
  background-color: @font-color2;
}
</style>
