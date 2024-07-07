<template>
  <div>1. flexible 动态改变html的fontSize大小 , 单位统一使用rem (弹性布局, vw, vh, %) (适合PC && 适合大屏)</div>
  <div>2. autofit 无论怎样缩放，保证宽高比不变, 单位用px即可 (适合PC && 适合大屏)</div>
  <div>3. 用脚本在index.html文件中更改html的fontSize大小, 单位统一使用rem (弹性布局, vw, vh, %) (适合PC && 适合大屏)</div>
  <div>4. 缩放适配 (会产生间隙, 内容呈现整体居中显示 , 保证内容宽高比例不会发生变化，也不会影响字体变形, 只适合大屏)</div>
  <div>5. 媒体查询 @media (适合PC && 适合大屏)</div>

  <div class="mobile">移动端适配</div>

  <!-- 开启顶部安全区适配（一般写在根组件App中）-->
  <van-nav-bar safe-area-inset-top />

  <!-- 开启底部安全区适配（一般写在根组件App中）-->
  <van-number-keyboard safe-area-inset-bottom />

  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">广场</van-tabbar-item>
    <van-tabbar-item icon="friends-o">商城</van-tabbar-item>
    <van-tabbar-item icon="setting-o">个人中心</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts" name="LargeScreen">
const active = ref(0)
/*
  移动端适配
    1. px 转换为 vw
      插件: postcss-px-to-viewport-8-plugin
    2. px 转换为 rem （根据html中的font-size决定）
      插件: postcss-pxtorem 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
      插件: lib-flexible 用于设置 rem 基准值
*/
</script>

<style scoped lang="less">
@charset "UTF-8";

.mobile {
  width: 300px; // 设计稿为750的情况下，300px 转换 （300 / 750 * 100）vw
  height: 260px;
  font-size: 26px;
  color: #fff;
  background-color: #f60;
  font-weight: 900;
}
</style>
