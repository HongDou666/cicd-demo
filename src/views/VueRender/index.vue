<template>
  {{
    carsInfo.list?.map((item) => {
      return item.name
    })
  }}

  <el-card header="VueRenderComp1">
    <VueRenderComp1 :props-value-num="valueNum" :props-cars-info="carsInfo">
      <template #default>
        <div>VueRender-默认插槽内容</div>
      </template>

      <template #hello>
        <div>VueRender-具名插槽内容</div>
      </template>
    </VueRenderComp1>
  </el-card>

  <el-card header="VueRenderComp4">
    <VueRenderComp4></VueRenderComp4>
  </el-card>

  <el-card header="Render1">
    <Render1 :props-value-num="valueNum" :props-cars-info="carsInfo" :ok="handlePush" @emit-ok="handlePush">
      <template #default>
        <div>Render1-默认插槽内容</div>
      </template>

      <template #hello>
        <div>Render1-具名插槽内容</div>
      </template>
    </Render1>
  </el-card>

  <el-card header="Render2">
    <Render2 :props-value-num="valueNum" :props-cars-info="carsInfo" :ok="handlePush" @emit-ok="handlePush">
      <template #default>
        <div>Render2-默认插槽内容</div>
      </template>

      <template #hello>
        <div>Render2-具名插槽内容</div>
      </template>
    </Render2>
  </el-card>

  <el-card header="Render3">
    <Render3 :props-value-num="valueNum" :props-cars-info="carsInfo" :ok="handlePush" @emit-ok="handlePush">
      <template #default>
        <div>Render3-默认插槽内容</div>
      </template>

      <template #hello>
        <div>Render3-具名插槽内容</div>
      </template>
    </Render3>
  </el-card>

  <el-card header="Render4">
    <Render4 :props-value-num="valueNum" :props-cars-info="carsInfo" :ok="handlePush" @emit-ok="handlePush">
      <template #default>
        <div>Render4-默认插槽内容</div>
      </template>

      <template #hello>
        <div>Render4-具名插槽内容</div>
      </template>
    </Render4>
  </el-card>

  <el-card header="Render5">
    <Render5>
      <template #left>
        <h3>左侧具名插槽</h3>
      </template>
      <template #default="{ person }">默认插槽-{{ person.name }}-{{ person.address }}</template>
      <template #right="{ address }">
        <h3>右侧具名插槽-{{ address }}</h3>
      </template>
    </Render5>
  </el-card>

  <el-card header="Render6">
    <Render6>
      <template #left>
        <h3>左侧具名插槽</h3>
      </template>
      <template #default="{ person }">默认插槽-{{ person.name }}-{{ person.age }}</template>
      <template #right="{ age }">
        <h3>右侧具名插槽-{{ age }}</h3>
      </template>
    </Render6>
  </el-card>

  <el-card header="Render7">
    <Render7 id="Render7-id" props-text="路飞" data-key="custom-prop" :on-prop="() => {}" @custom-click="customClick">
      <h3>默认插槽</h3>
    </Render7>
  </el-card>

  <el-card header="Render8">
    <Render8></Render8>
  </el-card>

  <el-card header="VueRenderComp5">
    <VueRenderComp5></VueRenderComp5>
  </el-card>
</template>

<script setup lang="ts" name="VueRender">
import VueRenderComp1 from './modules/VueRenderComp1.vue'
import VueRenderComp4 from './modules/VueRenderComp4.vue'
import VueRenderComp5 from './modules/VueRenderComp5.vue'
import { Render1, Render2, Render3, Render4 } from './modules/VueRenderComp5'
import { Render5, Render6, Render7, Render8 } from './modules/VueRenderComp6'

const valueNum = ref(100)
const carsInfo = reactive({
  name: '小张',
  list: [
    {
      name: '劳斯莱斯'
    },
    {
      name: '法拉第'
    },
    {
      name: '红旗H9'
    }
  ]
})

const handlePush = (val) => {
  carsInfo.list.push(val)
}

const customClick = (val) => {
  console.log(val)
}
</script>

<style scoped lang="less">
.el-card {
  margin: 10px 0;
}
</style>
