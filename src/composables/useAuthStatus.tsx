import { AlertProps, NIcon, NSpin } from 'naive-ui'
import { ref, computed, ExtractPropTypes, FunctionalComponent } from 'vue'
import {
  Attach,
  CheckmarkCircleSharp,
  CloseCircleSharp,
  LogoGoogle,
  CloudUploadOutline
} from '@vicons/ionicons5'

export type Authorizing = 'processing' | 'success' | 'failed' | 'init'

export function useAuthStatus() {
  const auth = ref<Authorizing>('init')

  const authAlertType = computed<ExtractPropTypes<AlertProps>['type']>(() => {
    if (auth.value === 'processing') {
      return 'default'
    }
    if (auth.value === 'failed') {
      return 'error'
    }
    if (auth.value === 'success') {
      return 'success'
    }
    return 'default'
  })

  const authStatusText = computed<string>(() => {
    if (auth.value === 'processing') {
      return '授权中'
    }
    if (auth.value === 'failed') {
      return '授权失败'
    }
    if (auth.value === 'success') {
      return '授权成功'
    }
    return '未授权'
  })

  const AuthStatusIcon: FunctionalComponent = () => {
    if (auth.value === 'processing') {
      return <NSpin size={20} stroke={'rgba(0,0,0,0.1)'} />
    }
    if (auth.value === 'success') {
      return (
        <NIcon>
          <CheckmarkCircleSharp />
        </NIcon>
      )
    }
    if (auth.value === 'failed') {
      return (
        <NIcon>
          <CloseCircleSharp />
        </NIcon>
      )
    }
    return (
      <NIcon>
        <Attach />
      </NIcon>
    )
  }

  return { auth, authAlertType, authStatusText, AuthStatusIcon }
}
