<script lang="ts" setup>
import { ExitOutline } from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NIcon, NPopover } from 'naive-ui'

import { RN } from '../router'
import { useAuthStore } from '../store/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

function reset() {
  authStore.authReset()
  router.push({ name: RN.PageAuth })
}
</script>

<template>
  <div v-if="route.name !== RN.PageAuth">
    <NPopover>
      {{ $t('reset_auth') }}
      <template #trigger>
        <NButton text block @click="reset">
          <NIcon size="22"><ExitOutline /></NIcon>
        </NButton>
      </template>
    </NPopover>
  </div>
</template>
