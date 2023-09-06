import fs from 'node:fs'
import { computed, ref, watch, type Ref } from 'vue'
import type { Authorizing } from './useAuthStatus'
import { dialog } from '@electron/remote'
import { initGoogleAuth } from '../api/google'

export function useAuth(authorizing: Ref<Authorizing>) {
  const { configFilePath, setConfigFilePath, config } = useConfig()

  function auth() {
    if (!config.value) {
      return
    }
    authorizing.value = 'processing'
    // setTimeout(() => {
    //   authorizing.value = 'success'
    // }, 1000)

    initGoogleAuth(config.value)
      .then(() => {
        authorizing.value = 'success'
      })
      .catch(() => {
        authorizing.value = 'failed'
      })
  }

  function chooseConfigFile() {
    const paths = dialog.showOpenDialogSync({ properties: ['openFile'] })
    setConfigFilePath(paths?.[0])
  }

  watch(config, auth, { immediate: true })

  return {
    configFilePath,
    chooseConfigFile
  }
}

function useConfig() {
  const Key = 'google-index-auth-config-file-path'

  const configFilePath = ref<string>(localStorage.getItem(Key) || '')
  function setConfigFilePath(v: string | undefined) {
    if (v) {
      configFilePath.value = v
      localStorage.setItem(Key, v)
    }
  }
  const config = computed(() => getConfig(configFilePath.value))

  return { configFilePath, setConfigFilePath, config }
}

function getConfig(configPath: string) {
  if (configPath) {
    try {
      const json = fs.readFileSync(configPath, { encoding: 'utf-8' })
      return JSON.parse(json) as AuthConfig
    } catch (e) {
      console.error('Error[getConfig]', e)
    }
  }
  return null
}
