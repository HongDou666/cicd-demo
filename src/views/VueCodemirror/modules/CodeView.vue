<template>
  <a-button type="primary" @click="changeTheme">切换模式：{{ theme }}</a-button>
  <a-button type="primary" @click="changeMode">切换语言：{{ options.mode }}</a-button>
  <codemirror
    v-model="codeValue"
    placeholder="Code gose here..."
    :style="options.style"
    :mode="options.mode"
    :spellcheck="options.spellcheck"
    :autofocus="options.autofocus"
    :indent-with-tab="options.indentWithTab"
    :tab-size="options.tabSize"
    :extensions="options.extensions"
    :disabled="false"
    @ready="ready"
    @change="change"
    @focus="focus"
    @blur="blur" />
</template>

<script setup lang="ts" name="CodeView">
import { Codemirror } from 'vue-codemirror'

// 语言模式包
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { vue } from '@codemirror/lang-vue'

// 自定义模式包
import { EditorView } from '@codemirror/view'

// 黑色主题模式包
import { oneDark } from '@codemirror/theme-one-dark'

const theme = ref('黑色主题')
const codeValue = ref()
const javascriptCode = `const route = useRoute()
const formRef = ref<FormInstance>()

const rules: FormInstance['rules'] = {
  name: [
    { required: true, message: '请输入姓名' },
    { maxLength: 4, message: '姓名不超过4个字符' },
    { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Regexp.Phone, message: '手机号格式不正确' }
  ]
}

/**
 * @description useFormCurd 的特性
 * 1. 能够快速实现表单的新增编辑
 * 2. 能够监视表单的更改，在你点击返回按钮的时候提示：'您确定丢弃更改的内容吗？'
 * 3. 封装思路可作为参考
 */
type Form = { id: string; name: string; phone: string }
const { form, title, loading, save, saveLoading, back, reset } = useFormCurd<Form>({
  key: 'id', // 主键
  formRef: formRef, // 表单的实例对象
  initApi: initPerson, // 初始化表单字段接口
  detailApi: () => getPersonById({ id: route.query.id as string }), // 编辑模式下查询详情接口
  addApi: (form) => addPerson({ ...form, extra: '额外参数-新增' }), // 新增接口
  editApi: (form) => updatePerson({ ...form, extra: '额外参数-编辑' }), // 编辑接口
  addToEdit: true, // 新增成功跳到编辑模式
  onSuccess: (form)=> {
    console.log('保存成功后的回调函数', form.id)
  }
})
`
const pythonCode = `$ python
Python 2.7.6 (default, Sep  9 2014, 15:04:36) 
[GCC 4.2.1 Compatible Apple LLVM 6.0 (clang-600.0.39)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>`

codeValue.value = javascriptCode

const options = reactive({
  style: { height: '500px' },
  // 初始化为 javascript模式
  mode: 'text/javascript',
  spellcheck: true,
  autofocus: true,
  indentWithTab: true,
  tabSize: 2,
  // 传递给CodeMirror EditorState。创建({扩展})
  extensions: [javascript(), oneDark]

  // disabled 禁止输入代码
  // placeholder 空数据提示
  // style 编辑器样式
  // autofocus 自动聚焦
  // indent-with-tab 绑定键盘Tab键事件
  // tabSize 指定按下键盘Tab键缩进位置个数
  // fullScreen 全屏功能（不能使用）
  // extensions 创建({扩展})
  // mode: 'application/json', 语言及语法模式
  // theme: 'idea', 主题（monakai | idea）
  // autoRefresh 自动刷新
  // line: true, 显示函数
  // lint: true, 校验
  // matchBrackets: true 括号匹配显示（在光标点击紧挨{、]括号左、右侧时，自动突出显示匹配的括号 }、]）
  // autoCloseBrackets: true 输入和退格时成对
  // indentUnit: 2 缩进单位，默认2
  // lineWrapping: false 软换行
  // ready 初始化完成
  // change 内容发生改变
  // focus 聚焦事件
  // blur 失焦事件
  // lineNumbers: true, 显示行数
  // foldGutter: true,  启用行槽中的代码折叠
  // smartIndent: true, 智能缩进

  // 代码折叠
  // gutters: [
  //   'CodeMirror-linenumbers',
  //   'CodeMirror-foldgutter',
  //   'CodeMirror-lint-markers' 实现语法报错
  // ]
})
const customTheme = EditorView.theme(
  {
    // 输入的字体颜色
    '&': {
      color: '#0052D9',
      backgroundColor: '#FFFFFF'
    },
    '.cm-content': {
      caretColor: '#0052D9'
    },
    // 激活背景色
    '.cm-activeLine': {
      backgroundColor: '#FAFAFA'
    },
    // 激活序列的背景色
    '.cm-activeLineGutter': {
      backgroundColor: '#FAFAFA'
    },
    // 光标的颜色
    '&.cm-focused .cm-cursor': {
      borderLeftColor: 'blueviolet'
    },
    // 选中的状态
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#0052D9',
      color: '#f60'
    },
    // 左侧侧边栏的颜色
    '.cm-gutters': {
      backgroundColor: '#FFFFFF',
      color: '#f60', // 侧边栏文字颜色
      border: 'none'
    }
  },
  { dark: true }
)

const ready = (event) => {
  console.log('代码编辑器-初始化完成', event)
}
const change = (name, event) => {
  console.log('代码编辑器-内容发生改变', name, event)
}
const focus = (event) => {
  console.log('代码编辑器-聚焦事件', event)
}
const blur = (event) => {
  console.log('代码编辑器-失焦事件', event)
}

// 改变主题
const changeTheme = () => {
  if (theme.value === '黑色主题') {
    theme.value = '自定义主题'
    options.extensions = [options.mode === 'text/javascript' ? javascript() : python(), customTheme]
  } else {
    theme.value = '黑色主题'
    options.extensions = [options.mode === 'text/javascript' ? javascript() : python(), oneDark]
  }
}

// 改变模式
const changeMode = () => {
  if (options.mode === 'text/javascript') {
    codeValue.value = pythonCode
    Object.assign(options, {
      mode: 'text/x-python',
      extensions: [python(), theme.value === '黑色主题' ? oneDark : customTheme]
    })
  } else {
    codeValue.value = javascriptCode
    Object.assign(options, {
      mode: 'text/javascript',
      extensions: [javascript(), theme.value === '黑色主题' ? oneDark : customTheme]
    })
  }
}
</script>
