<template>
  <a-button type="primary" @click="() => editorRef.enable()">可写</a-button>
  <a-button type="primary" @click="() => editorRef.disable()">只读</a-button>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="valueHtml"
      style="overflow-y: hidden; height: 500px"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-max-length="handleMaxLength"
      @on-change="handleChange"
      @on-destroyed="handleDestroyed"
      @on-focus="handleFocus"
      @on-blur="handleBlur"
      @custom-paste="handleCustomPaste" />
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { IToolbarConfig, DomEditor, IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { postUpload } from '@/api/mock-js/index'
type InsertFnType = (url: string, alt: string, href: string) => void
export default {
  name: 'WangEditor',
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 编辑器内容
    const valueHtml = ref('<h1>hello</h1>')

    // 编辑器模式，'default' 或 'simple'
    const mode = ref('default')

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
      /* 重新配置工具栏，顺序和分组 */
      // toolbarKeys: [
      //   // 菜单 key
      //   'headerSelect',
      //   // 分割线
      //   '|',
      //   // 菜单 key
      //   'bold',
      //   'italic',
      //   // 菜单组，包含多个菜单
      //   {
      //     key: 'group-more-style', // 必填，要以 group 开头
      //     title: '更多样式', // 必填
      //     iconSvg: '<svg>....</svg>', // 可选
      //     menuKeys: ['through', 'code', 'clearStyle'] // 下级菜单 key ，必填
      //   }
      //   // 继续配置其他菜单...
      // ],
      /* 插入菜单 */
      // insertKeys: {
      //   index: 5, // 插入的位置，基于当前的 toolbarKeys
      //   keys: ['menu-key1', 'menu-key2']
      // }
      /* 除掉某些菜单，其他都保留 */
      // excludeKeys: [
      //   'headerSelect',
      //   'italic',
      //   'group-image' // 排除菜单组，写菜单组 key 的值即可
      // ]
      /* 将 modal 挂载到 body 上 */
      // modalAppendToBody: true
    }

    // 编辑器配置
    const editorConfig = ref<any>({
      placeholder: '请输入内容',
      readOnly: false, // 编辑器只读 (false：可编辑，true：只读)
      autoFocus: false, // 自动获得焦点
      scroll: true, // 配置编辑器是否支持滚动，默认为 true
      maxLength: 200, // 最大长度，默认不限制
      MENU_CONF: {
        // 颜色
        color: {
          colors: ['#000', '#333', '#666', '#f60']
        },
        // 字体
        fontSize: {
          fontSizeList: [
            // 元素支持两种形式
            //   1. 字符串；
            //   2. { name: 'xxx', value: 'xxx' }

            '12px',
            '16px',
            { name: '24号字体', value: '24px' },
            '40px'
          ]
        },
        // 字体
        fontFamily: {
          fontFamilyList: [
            // 元素支持两种形式
            //   1. 字符串；
            //   2. { name: 'xxx', value: 'xxx' }

            '黑体',
            '楷体',
            { name: '仿宋', value: '仿宋' },
            'Arial',
            'Tahoma',
            'Verdana'
          ]
        },
        // 行高
        lineHeight: {
          lineHeightList: ['1', '1.5', '2', '2.5']
        },
        // 表情
        emotion: {
          emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ') // 数组
        }
      }
    })

    // 图片上传
    editorConfig.value.MENU_CONF['uploadImage'] = {
      server: '/api/upload/file', // 服务端地址

      // form-data 文件字段名 ，默认值 'wangeditor-uploaded-image'
      fieldName: 'file-custom-name',

      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 1 * 1024 * 1024, // 1M

      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],

      // 自定义上传参数，例如传递验证的 parkId 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: {
        parkId: '177'
      },

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http header(请求头)
      headers: {
        otherKey: 'key'
      },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒

      // 上传之前触发
      onBeforeUpload(file: File) {
        // file 选中的文件，格式如 { key: file }
        return file

        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },

      // 上传进度的回调函数（progress 是 0-100 的数字）
      onProgress(progress: number) {
        console.log('progress', progress)
      },

      // 单个文件上传成功之后
      onSuccess(file: File, res: any) {
        console.log(`${file.name} 上传成功`, res)
      },

      // 单个文件上传失败
      onFailed(file: File, res: any) {
        console.log(`${file.name} 上传失败`, res)
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {
        console.log(`${file.name} 上传出错`, err, res)
      },

      // 自定义插入图片（如果你的服务端 response body 无法按照上文规定的格式，则无法插入图片，提示失败。但你可以使用 customInsert 来自定义插入图片）
      customInsert(res: any, insertFn: InsertFnType) {
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插入图片
        // insertFn(url, alt, href)
      },

      // 自定义上传 (与自定义插入配合使用  => insertFn()) yyds
      async customUpload(file: File, insertFn: InsertFnType) {
        // file 即选中的文件 自己实现上传，并得到图片 url alt href
        let formData: FormData = new FormData()
        formData.append('file', file)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
          }
        }
        postUpload(formData, config).then((res) => {
          if (res.code !== 200) {
            console.log(`上传失败`)
          } else {
            console.log(`上传成功啦！`, res)
            const url: any = res.data
            insertFn(url, '', url)
          }
        })
      }
    }

    // 当达到 maxlength 限制时，触发该回调函数
    const handleMaxLength = (editor) => {
      console.log('到达最大长度限制', editor)
    }

    // 编辑器创建完成时触发
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！

      nextTick(() => {
        const toolbar: any = DomEditor.getToolbar(editor)
        const curToolbarConfig = toolbar.getConfig()
        const toolbarKeys = curToolbarConfig.toolbarKeys // 当前菜单排序和分组
        console.log('toolbarKeys', toolbarKeys)
      })
    }

    // 编辑器内容、选区变化时的回调函数。
    const handleChange = (editor: IDomEditor) => {
      console.log(editor.children, valueHtml.value)
    }

    // 编辑器销毁时的回调函数
    const handleDestroyed = (editor: IDomEditor) => {
      console.log('content', editor.children)
    }

    // 编辑器 focus 时的回调函数
    const handleFocus = (editor: IDomEditor) => {
      console.log('content', editor.children)
    }

    // 编辑器 blur 时的回调函数。
    const handleBlur = (editor: IDomEditor) => {
      console.log('content', editor.children)
    }

    // 自定义粘贴事件，返回 true 表示继续执行默认的粘贴行为。
    const handleCustomPaste = (editor: IDomEditor, event: ClipboardEvent): boolean => {
      // 同步
      editor.insertText('自定义粘贴内容')

      // 阻止默认的粘贴行为
      event.preventDefault()
      return false

      // 继续执行默认的粘贴行为
      // return true
    }

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = `<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑</p><p>参差荇菜，左右流之。窈窕淑女，寤寐求之</p><p>求之不得，寤寐思服。悠哉悠哉，辗转反侧。</p><p>参差荇菜，左右流之。窈窕淑女，寤寐求之</p><p>参差荇菜，左右采之。窈窕淑女，琴瑟友之</p><p>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之</p>`
      }, 2000)
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor === null) return
      editor.destroy()
    })

    return {
      editorRef,
      valueHtml,
      mode,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleMaxLength,
      handleChange,
      handleDestroyed,
      handleBlur,
      handleFocus,
      handleCustomPaste
    }
  }
}
</script>

<style scoped lang="less"></style>
