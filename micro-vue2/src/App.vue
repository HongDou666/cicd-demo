<template>
  <div class="app_micro">
    <h3>Vue2子应用基础路径：{{ prefix }}</h3>
    <button class="text_color" @click="setData">子应用向基座发送数据</button>
    <button class="text_color" @click="setGlobalData">子应用发送全局数据</button>
    <br />
    <router-link :to="`/home-vue2`">Home-vue2</router-link>
    <router-link :to="`/about-vue2`">About-vue2</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      prefix: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL || '/'
    }
  },
  created() {
    /** 绑定数据【data属性】监听事件 */
    window.microApp && window.microApp.addDataListener(this.dataListener)
  },
  mounted() {},
  unmounted() {
    /** 移除数据【data属性】监听事件 */
    window.microApp && window.microApp.removeDataListener(this.dataListener)
  },
  methods: {
    // 监听基座下发的数据变化
    dataListener(data) {
      console.log('✳ 1. 接收基座下发的数据', data)
    },
    // 子应用向基座发送数据
    setData() {
      window.microApp &&
        window.microApp.dispatch({
          message: '飞流直下三千尺',
          time: new Date()
        })
    },
    // 子应用向全局发送数据 (基座可接收 自己也可接收)
    setGlobalData() {
      // setGlobalData只接受对象作为参数
      window.microApp.setGlobalData({ message: '隔江犹唱后庭花', time: new Date() })
    }
  }
}
</script>

<style scoped>
.app_micro {
  margin: 20px 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app_micro a {
  display: inline-block;
  margin: 10px;
  font-size: 20px;
  color: #2c3e50;
}

.app_micro a.router-link-exact-active {
  color: #42b983;
}

/*  
  主应用 disable-scopecss 为true时，子应用样式会影响基座应用样式
    1. 子应用添加scoped： 
      子应用样式不会影响到主应用的样式

    2. 子应用不添加scoped： 
      子应用会影响到主应用的样式
  主应用 disable-scopecss 为false时，子应用样式不会影响基座应用样式
*/

/* 因添加scoped 此处样式不会影响到宿主应用的样式 */

/* 页面上查看此元素css： 
  1. 刷新页面，查看元素样式 micro-app[name='micro-vue2'] .text_color[data-v-7ba5bd90] { }
  2. 切换路由，查看元素样式 .text_color[data-v-7ba5bd90] { }
*/
.text_color {
  color: rgb(224 45 0);
}
</style>
