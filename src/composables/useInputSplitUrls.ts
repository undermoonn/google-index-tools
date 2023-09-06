import { ref, computed } from 'vue'
import { StepsProps } from 'naive-ui'

export function useInputSplitUrls() {
  const input = ref('')
  const urls = computed<string[]>(() =>
    input.value
      .split('\n')
      .map(url => url.trim())
      .filter(url => /^https:\/\//.test(url))
  )
  const current = ref(0)
  const currentStatus = ref<StepsProps['status']>('process')

  return { input, urls, current, currentStatus }
}
