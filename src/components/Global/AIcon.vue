<!-- 第一种封装的方式(不支持 type的改变进而使得setup函数重新执行(icon还是以前的icon)) -->
<!-- <script lang="ts">
  import * as AntDesignIconsVue from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'AIcon',
    props: {
      type: {
        type: String,
        required: true,
        default: ''
      }
    },
    setup(props, { attrs }) {
      const computedName = computed(() => {
        const iconType = (props.type?.split('-') || [])?.map((item) => {
          return item.substring(0, 1).toUpperCase() + item.substring(1)
        })
        return iconType.join('')
      })
      const createAIconDom = () => {
        const iconType = `${computedName.value}Outlined`
        return () =>
          h((AntDesignIconsVue as any)[iconType], {
            ...attrs
          })
      }
      return createAIconDom()
    }
  })
</script> -->

<!-- 第二种封装的方式 -->

<script lang="tsx">
import * as AntDesignIconsVue from '@ant-design/icons-vue'

const THEME = ['filled', 'outlined', 'twoTone']
export default defineComponent({
  name: 'AIcon',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    theme: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup(props, { attrs }) {
    // console.log('只执行一次')
    const computedName = computed(() => {
      const iconTypeArr = props.type?.split('-') || []
      if (iconTypeArr && computedType.value) {
        // <a-icon type="step-backward-outlined" />（v3写法）可支持不同风格主题
        // <a-icon type="step-backward-filled" />（v3写法）可支持不同风格主题
        const iconName = iconTypeArr?.map((val) => val.substring(0, 1).toUpperCase() + val.substring(1))?.join('')
        return iconName
      } else {
        // <a-icon type="step-backward" theme="outlined" />（v1写法）可支持不同风格主题
        // <a-icon type="step-backward" theme="filled" />（v1写法）可支持不同风格主题
        // <a-icon type="android" theme="filled" /> （v1写法）可支持不同风格主题
        const theme = props.theme
        let iconType = iconTypeArr?.map((item) => item.substring(0, 1).toUpperCase() + item.substring(1))?.join('')
        if (theme && THEME.findIndex((val) => val === theme) !== -1) {
          iconType = iconType + theme?.substring(0, 1)?.toUpperCase() + theme?.substring(1)
        } else {
          iconType = `${iconType}Outlined`
        }
        return iconType
      }
    })

    const computedType = computed(() => {
      const iconTypeArr = props.type?.split('-') || []
      const isSplit = THEME.findIndex((val) => val === iconTypeArr[iconTypeArr.length - 1]) !== -1 || props.type?.includes('two-tone')
      return isSplit
    })

    const createAIconDom = () => {
      // console.log('随着参数状态的改变多次执行')
      const iconType = `${computedName.value}`

      if ((AntDesignIconsVue as any)[iconType]) {
        return h((AntDesignIconsVue as any)[iconType], {
          ...attrs
        })
      }
      return h('')
    }
    return () => <>{createAIconDom()}</>
  }
})
</script>
