import { ref } from 'vue'

import { Log } from '../log'

export function usePromise<T>(
  fn: T extends (...args: any[]) => PromiseLike<unknown> ? T : never
) {
  const loading = ref(false)
  const data = ref<Awaited<ReturnType<typeof fn>>>()
  const send = async (...args: Parameters<typeof fn>) => {
    loading.value = true
    try {
      data.value = (await fn(...args)) as any
    } catch (e) {
      Log.error(e)
    }
    loading.value = false
    return data
  }
  return { loading, data, send }
}
