<script lang="ts" setup>
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
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { CodeSlashSharp } from '@vicons/ionicons5'

import { RN } from '../router'
import { useAuthStore } from '../store/auth'
import { readFileAsJsonObject } from '../utils/file'
import { usePromise } from '../composables/usePromise'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const { loading, send } = usePromise(authStore.auth)

checkAuth()

function checkAuth() {
  loading.value = true
  if (authStore.authAccessToken) {
    authStore.authSuccess()
    router.push({ name: RN.PageIndexing })
    return
  }
  loading.value = false
}

async function handleUploadChange(data: { fileList: UploadFileInfo[] }) {
  if (!data.fileList?.[0]?.file) {
    return
  }

  const result = await readFileAsJsonObject<{
    client_email: string
    private_key: string
  }>(data.fileList[0].file)

  if (result) {
    authStore.authConfig.clientEmail = result.client_email
    authStore.authConfig.privateKey = result.private_key
  }
}
</script>

<template>
  <NSpin v-if="loading" flex-1 stroke="#ddd" />
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
              <CodeSlashSharp />
            </NIcon>
          </div>
          <span op-50>{{ t('page_auth_load_file') }}</span>
        </NUploadDragger>
      </NUpload>
    </div>

    <NButton
      :disabled="!authStore.authConfigIegal"
      secondary
      mt-6
      :loading="loading"
      strong
      type="primary"
      @click="send().then(checkAuth)"
      >{{ t('page_auth_button') }}</NButton
    >
  </div>
</template>
