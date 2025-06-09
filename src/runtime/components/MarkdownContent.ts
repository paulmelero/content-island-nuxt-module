import { defineComponent, h } from 'vue'
import MDC from '@nuxtjs/mdc/runtime/components/MDC.vue'
import { useRuntimeConfig } from '#app'

export default defineComponent({
  name: 'MarkdownContent',
  props: {
    value: String,
    tag: String,
  },
  components: { MDC },
  setup(props) {
    const config = useRuntimeConfig()

    return () =>
      h(MDC, {
        value: props.value || '',
        tag: props.tag || 'div',
        class:
          (
            config.public?.contentIsland as {
              markdownContentComponentClass?: string
            }
          )?.markdownContentComponentClass || 'md-content',
      })
  },
})
