<script lang="tsx">
import { createFromIconfontCN } from '@ant-design/icons-vue'
const IconFont = import.meta.glob('../../assets/iconfont.js', {
  eager: true
})
console.log(IconFont)
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
    const IconFontDom = createFromIconfontCN({
      scriptUrl: IconFont
    } as any)
    return () => (
      <>
        <IconFontDom type={props.type} {...attrs}></IconFontDom>
      </>
    )
  }
})
</script>

<style scoped>
.icons-list :deep(.anticon) {
  margin-right: 6px;
  font-size: 24px;
}
</style>
