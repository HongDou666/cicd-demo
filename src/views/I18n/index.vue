<template>
  <a-config-provider :locale="antd">
    <el-config-provider :locale="ele">
      <div>I18n - 国际化</div>

      <a-button type="primary" @click="handle1">检查是否为中文环境</a-button>
      <a-button type="primary" @click="handle2">切换多语言</a-button>
      <a-button type="primary" :loading="loading"> {{ loading ? '语言切换中' : '语言切换完毕' }}</a-button>

      <div>
        {{ $t('profile.advanced.step-title') }}
        <br />
        {{ $t('result.success.step2-title') }}
        <br />
        {{ $t('menu.form.step-form.info') }}
        <br />
        {{ $t('result.success.step3-title') }}
      </div>

      <div>
        <a-date-picker v-model:value="value1" />
        <a-date-picker v-model:value="value4" picker="quarter" />
        <a-range-picker v-model:value="value2" />
        <a-table
          :data-source="dataSource"
          :columns="columns"
          :pagination="{
            defaultPageSize: 2,
            pageSizeOptions: pageSizeOptions,
            total: total,
            current: current,
            pageSize: pageSizeRef
          }" />
      </div>

      <div>
        <el-date-picker
          v-model="eleValue"
          type="monthrange"
          range-separator="To"
          :start-placeholder="$t('form.basic-form.placeholder.start')"
          :end-placeholder="$t('form.basic-form.placeholder.end')" />
      </div>
    </el-config-provider>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useI18nLocale, i18nRender } from '@/composables/i18n-locale'
import { Lang } from '@/locales'
import type { Dayjs } from 'dayjs'
import { defineOptions } from 'vue'
defineOptions({
  name: 'I18n'
})
type RangeValue = [Dayjs, Dayjs]

const { antd, ele, t, isZh, setLocale, locale, loading } = useI18nLocale()
const value1 = ref<Dayjs>()
const value4 = ref<Dayjs>()
const value2 = ref<RangeValue>()
const eleValue = ref('')

const dataSource = reactive<any[]>([])

for (let index = 1; index <= 500; index++) {
  const obj = {
    key: index,
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
  dataSource.push(obj)
}

const columns = reactive([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
])
const pageSizeOptions = ref<string[]>(['5', '10'])
const total = ref(500)
const current = ref(1)
const pageSizeRef = ref(5)

console.log(t('profile.advanced.step-title'))
console.log(t('result.success.step2-title'))
console.log(t('menu.form.step-form.info'))
console.log(t('result.success.step3-title'))

console.log(i18nRender('profile.advanced.step-title'))

const handle1 = () => {
  console.log(isZh.value)
}
const handle2 = async () => {
  console.log('现在的语言为：', locale.value)

  await setLocale(locale.value === Lang.zhCN ? Lang.enUS : Lang.zhCN)

  console.log('现在的语言为：', locale.value)
}
</script>

<style scoped></style>
