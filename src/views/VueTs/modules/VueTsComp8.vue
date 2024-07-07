<template>
  <div class="voa">
    <div ref="mydiv">测试</div>
    <a-input ref="myinput" type="text" />
    <VoaComp1
      style="background: rgb(46 255 168)"
      title="首页"
      :item="{
        name: 'kerwin',
        age: 100,
        list: [1, 2, 3]
      }"
      @event-ok="handleEvent" />
  </div>
</template>

<script lang="ts">
import VoaComp1 from './child/VoaComp1.vue'

interface InterState {
  myname: string
  myage: number
  mytext: string
  list: Array<string>
}

export default {
  name: 'VueTsComp8',
  components: {
    VoaComp1
  },
  data() {
    return {
      myname: 'kerwin',
      mytext: '',
      myage: 100,
      list: []
    } as InterState
  },
  computed: {
    computedName(): string {
      return this.myname.substring(0, 1).toUpperCase() + this.myname.substring(1)
    }
  },
  mounted() {
    // 类型断言
    const mydiv = this.$refs.mydiv as HTMLDivElement
    const myinput = this.$refs.myinput as HTMLInputElement
    console.log(mydiv.innerHTML)
    console.log(myinput.value)
  },
  methods: {
    handleDel(index: number | string = 100): string {
      return String(index)
    },
    handleEvent(data: string) {
      console.log('父组件', data)
    }
  }
}
</script>

<style lang="less" scoped>
.voa {
  // 样式透传成功
  :deep(ul li) {
    margin: 5px 0;
    background-color: rgb(255 186 122 / 91.1%);
  }

  // 样式添加失败
  ul li {
    margin: 10px 0;
    background-color: rgb(98 70 255 / 85.6%);
  }
}
</style>
