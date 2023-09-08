<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DocumentOutline } from '@vicons/ionicons5'
import {
  NIcon,
  NForm,
  NSpin,
  NInput,
  NButton,
  NUpload,
  NDivider,
  NFormItem,
  NUploadDragger,
  type UploadFileInfo
} from 'naive-ui'

import { RN } from '../router'
import { useAuthStore, AuthStatus } from '../store/auth'
import { message } from '../message'

const router = useRouter()
const authStore = useAuthStore()
const authLoading = ref(false)

checkAuth()

function checkAuth() {
  authLoading.value = true
  if (authStore.authAccessToken) {
    authStore.authStatus = AuthStatus.Success
    router.push({ name: RN.PageIndexing })
    return true
  }
  authLoading.value = false
  return false
}

async function auth() {
  authLoading.value = true
  try {
    await authStore.auth()
    checkAuth()
  } catch (_) {
    authLoading.value = false
  }
}

function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
  const fileInfo = data.fileList[0]
  if (!fileInfo.file) {
    return
  }
  const render = new FileReader()
  render.readAsText(fileInfo.file, 'utf-8')
  render.onload = e => {
    try {
      const config = JSON.parse(e.target?.result as string) as {
        client_email: string
        private_key: string
      }
      authStore.authConfig.clientEmail = config.client_email
      authStore.authConfig.privateKey = config.private_key
    } catch (_) {
      message.error('illegal JSON')
    }
  }
}
</script>

<template>
  <NSpin v-if="authLoading" flex-1 stroke="#ddd" />
  <div
    v-else
    class="page-auth"
    flex
    flex-col
    flex-justify-center
    flex-items-center
    flex-1
  >
    <div class="page-auth__inputs" flex flex-items-center>
      <NForm>
        <NFormItem label="client_email" required>
          <NInput v-model:value="authStore.authConfig.clientEmail" />
        </NFormItem>
        <NFormItem label="private_key" required>
          <NInput
            v-model:value="authStore.authConfig.privateKey"
            type="password"
          />
        </NFormItem>
      </NForm>
      <div style="width: 70px" mx-4>
        <NDivider>
          <span text-gray op-40 font-italic text-sm>or</span>
        </NDivider>
      </div>
      <NUpload
        style="width: 200px"
        accept=".json"
        :show-file-list="false"
        @change="handleUploadChange"
      >
        <NUploadDragger>
          <div mb-4>
            <NIcon size="48" :depth="3">
              <DocumentOutline />
            </NIcon>
          </div>
          <span>Upload JSON Auth File</span>
        </NUploadDragger>
      </NUpload>
    </div>

    <NButton
      :disabled="!authStore.authConfigIegal"
      secondary
      mt-6
      @click="auth"
      :loading="authLoading"
      strong
      >authorize</NButton
    >
  </div>
</template>
