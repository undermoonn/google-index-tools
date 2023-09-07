import { google } from 'googleapis'
import { defineStore } from 'pinia'
import { object, string } from 'yup'
import { useLocalStorage } from '@vueuse/core'
import { computed, ref, ToRefs, watchEffect } from 'vue'

import { Log } from '../log'

export enum AuthStatus {
  Processing,
  Success,
  Failed,
  Init
}

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Init)
  const authrized = computed(() => authStatus.value === AuthStatus.Success)
  const authAccessToken = useLocalStorage<AuthAccessToken>(
    '__store_auth_access_token',
    ''
  )
  const authConfig = ref<ToRefs<AuthConfig>>({
    clientEmail: useLocalStorage('__store_auth_client_email', ''),
    privateKey: useLocalStorage('__store_auth_private_key', '')
  })
  const authConfigScheme = object({
    clientEmail: string().required(),
    privateKey: string().required()
  })
  const authConfigIegal = ref(false)

  watchEffect(async () => {
    try {
      await authConfigScheme.validate(authConfig.value)
      authConfigIegal.value = true
    } catch (_) {
      authConfigIegal.value = false
    }
  })

  async function auth() {
    if (!authConfigIegal) {
      // handle on button disabeld attr
      return
    }
    authStatus.value = AuthStatus.Processing

    const jwtClient = new google.auth.JWT(
      authConfig.value.clientEmail,
      undefined,
      authConfig.value.privateKey,
      ['https://www.googleapis.com/auth/indexing'],
      undefined
    )

    return new Promise((resolve, reject) => {
      jwtClient.authorize((err, tokens) => {
        if (err) {
          Log.error(err)
          reject(err)
          return
        }
        authAccessToken.value = tokens?.access_token || ''
        resolve('auth success')
      })
    })
  }

  return {
    auth,
    authStatus,
    authrized,
    authConfig,
    authConfigIegal,
    authAccessToken
  }
})
