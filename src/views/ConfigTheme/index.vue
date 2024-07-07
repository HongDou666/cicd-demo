<template>
  <div>
    <a-switch v-model:checked="state.checked1" checked-children="亮色模式" un-checked-children="暗色模式" @change="handleSwitch" />

    <div class="custom flex-center">手动配置主题色</div>
    <el-color-picker v-model="color" show-alpha @change="handleChangeColor" /><br />
    <!-- 配置主题 -->
    <!-- algorithm: 通过修改算法可以快速生成风格迥异的主题,分别是默认算法 theme.defaultAlgorithm、暗色算法 theme.darkAlgorithm 和紧凑算法 theme.compactAlgorithm -->
    <a-config-provider
      :theme="{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius
        },
        components: {
          Radio: {
            colorPrimary: '#f60'
          }
        }
      }">
      <a-button type="primary">Primary Button</a-button><br />
      <a-checkbox-group v-model:value="checkbox" name="checkboxgroup" :options="plainOptions" /><br />
      <a-pagination v-model:current="current" :total="500" /><br />
      <a-date-picker v-model:value="value5" picker="year" /><br />
      <a-input-search v-model:value="inputSearchValue" style="width: 200px" placeholder="input search text" /><br />
      <a-radio-group v-model:value="size">
        <a-radio-button value="large">Large</a-radio-button>
        <a-radio-button value="middle">Middle</a-radio-button>
        <a-radio-button value="small">Small</a-radio-button> </a-radio-group
      ><br />

      <a-button
        :style="{
          backgroundColor: token.colorPrimary,
          color: '#fff'
        }"
        >此处按钮还是默认主题背景颜色</a-button
      ><br />
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Tab 1"></a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3"></a-tab-pane> </a-tabs
      ><br />

      <hr />
      <el-button type="primary">Primary</el-button><br />
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-checkbox v-model="checked2" label="Option 2" size="large" /><br />
      <el-slider v-model="slider" />
    </a-config-provider>
    <!-- 配置主题 -->
  </div>
</template>

<script setup lang="ts" name="ConfigTheme">
import { theme } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import type { GlobalToken } from 'ant-design-vue/es/theme'
import type { SelectProps } from 'ant-design-vue'
// const { darkAlgorithm, compactAlgorithm } = theme;
const size = ref<SelectProps['size']>('middle')
// 开始设置 antDesign 的主题颜色
const data = reactive<{
  borderRadius: number
  colorPrimary: string
  [propName: string]: any // 其他属性，定义变量可忽略
}>({
  borderRadius: 12,
  colorPrimary: '#00b96b'
})
const { token: antdToken } = theme.useToken()
const token = ref<GlobalToken>(antdToken.value)
console.log(token.value)
const current = ref<typeof $NAME2>(10)
const inputSearchValue = ref<string>('')
const activeKey = ref('1')
const plainOptions = ['Apple', 'Pear', 'Orange']
const checkbox = reactive(['Apple', 'Pear', 'Orange'])
const state = reactive({
  checked1: true
})
const slider = ref(0)
const checked1 = ref(true)
const checked2 = ref(true)
const value5 = ref<Dayjs>()
const color = ref('#00b96b')
// document.documentElement 是全局变量时
const el = document.documentElement
console.log(el)
// 开始设置 elePlus 的主题颜色
onMounted(() => {
  el.style.setProperty('--el-color-primary', '#00b96b')
  el.style.setProperty('--el-color-primary-dark-2', '#00b96b')
  el.style.setProperty('--el-color-primary-light-3', '#00b96b')
})
const handleChangeColor = (val: string | null) => {
  val && (data.colorPrimary = val) // antdes
  console.log(token.value.colorPrimary)

  // elePlus - 设置 css 变量
  el.style.setProperty('--el-color-primary', val)
  el.style.setProperty('--el-color-primary-dark-2', val)
  el.style.setProperty('--el-color-primary-light-3', val)
}

type themeType = {
  light: 'light'
  dark: 'dark'
}
let rootTheme = ref<keyof themeType>('light')

// type themeType = 'light' | 'dark'
// let rootTheme = ref<themeType>('light')

const handleSwitch = (val: boolean | string | number) => {
  console.log(val)
  if (val) {
    // 亮色模式
    rootTheme.value = 'light'
    el.setAttribute('data-theme', rootTheme.value)
    el.dataset.custom = 'dxy'
  } else {
    // 暗色模式
    rootTheme.value = 'dark'
    el.setAttribute('data-theme', rootTheme.value)
    el.dataset.custom = 'zqc'
  }
}
</script>

<style scoped lang="less">
@charset "UTF-8";

.custom {
  margin: 10px auto;
  width: 300px;
  height: 80px;
  font-size: 20px;
  color: @font-color;
  background-color: @bg-color;
}
</style>
