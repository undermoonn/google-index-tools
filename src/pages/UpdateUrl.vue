<script setup lang="ts">
import {
  NButton,
  NBreadcrumb,
  NBreadcrumbItem,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NAlert,
  NIcon,
  NInput
} from 'naive-ui'
import { LogoGoogle } from '@vicons/ionicons5'
import { ref } from 'vue'
import { Log } from '../log'
import { useAuth } from '../composables/useAuth'
import { useAuthStatus } from '../composables/useAuthStatus'
import { urlUpdate } from '../api/google'
import Logs from '../components/Logs.vue'

const { auth, authAlertType, authStatusText, AuthStatusIcon } = useAuthStatus()
const { chooseConfigFile, configFilePath } = useAuth(auth)

const input = ref('')
const loading = ref(false)

async function update() {
  if (/https:\/\//.test(input.value)) {
    loading.value = true
    try {
      await urlUpdate([input.value.trim()])
    } catch (_) {}
    loading.value = false
  } else {
    Log.warn(`网页地址: "${input.value}" 不合法，请检查`)
  }
}
</script>

<template>
  <NLayout position="absolute">
    <NLayoutHeader bordered p-6>
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <NIcon mr-2><LogoGoogle /></NIcon>
          Google Index Tools</NBreadcrumbItem
        >
        <NBreadcrumbItem>更新网页索引</NBreadcrumbItem>
      </NBreadcrumb>
    </NLayoutHeader>

    <NLayoutContent p-6>
      <div flex flex-items-center>
        <NButton @click="chooseConfigFile" secondary strong mr-2
          >选择授权文件并授权</NButton
        >
      </div>
      <NAlert :type="authAlertType" :title="authStatusText" mt-6 mb-6>
        <template #icon>
          <AuthStatusIcon />
        </template>
        <template v-if="configFilePath">
          授权文件路径:
          {{ configFilePath }}
        </template>
      </NAlert>

      <template v-if="auth === 'success'">
        <div flex>
          <NInput v-model:value="input" placeholder="请输入网页地址" />
          <NButton
            @click="update"
            ml-4
            secondary
            type="default"
            strong
            style="width: 80px"
            :loading="loading"
            >更新</NButton
          >
        </div>
      </template>

      <Logs my-6 />
    </NLayoutContent>
  </NLayout>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
body {
  /* padding: 1rem; */
}
</style>
