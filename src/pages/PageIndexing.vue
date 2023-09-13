<script setup lang="tsx">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { TrashBin, Link } from '@vicons/ionicons5'
import { NButton, NInput, NIcon, NSpin } from 'naive-ui'

import { Message } from '../adapter'
import { useAuthStore } from '../store/auth'
import { ApiIndexing } from '../api/indexing'
import { usePromise } from '../composables/usePromise'
import { useFriendlyPrompt } from '../composables/useFriendlyPrompt'

const { t } = useI18n()
const authStore = useAuthStore()
const { friendlyPrompt } = useFriendlyPrompt()

const url = ref('')
const token = computed(() => authStore.authAccessToken)
const isUrlLegal = computed(() => /https:\/\//.test(url.value))

const GetUrl = usePromise(ApiIndexing.get)
const UpdateUrl = usePromise(ApiIndexing.update)
const DeleteUrl = usePromise(ApiIndexing.delete)
const loading = computed(() => {
  return (
    GetUrl.loading.value || DeleteUrl.loading.value || UpdateUrl.loading.value
  )
})
const disabled = computed(() => !isUrlLegal.value || loading.value)

async function confirmDel() {
  await friendlyPrompt(
    t('page_indexing_del_confirm_title', {
      url: `<span class="font-mono py-1 px-2 mx-2 rounded bg-black bg-op-10">${url.value}</span>`
    }),
    {
      buttonText: t('page_indexing_del_confirm_button'),
      expected: url
    }
  )

  DeleteUrl.send(url.value, { token: token.value }).then(res =>
    Message.json(res, 'success')
  )
}
</script>

<template>
  <div
    class="page-indexing"
    flex
    flex-col
    flex-items-center
    flex-justify-center
    flex-1
    style="padding: 0 20%"
  >
    <NInput
      v-model:value="url"
      :placeholder="t('page_indexing_input_placeholder')"
      :disabled="loading"
      size="large"
      autofocus
    >
      <template #prefix>
        <NSpin v-if="loading" mr-1 :size="18" stroke="#eee" />
        <NIcon v-else mr-1 :size="18"><Link /></NIcon>
      </template>
    </NInput>
    <div flex mt-6 flex-justify-start w-full>
      <NButton
        :disabled="disabled"
        secondary
        @click="
          UpdateUrl.send(url, { token }).then(res =>
            Message.json(res, 'success')
          )
        "
        >{{ t('page_indexing_update_button') }}</NButton
      >
      <NButton
        ml-4
        :disabled="disabled"
        secondary
        @click="
          GetUrl.send(url, { token }).then(res => Message.json(res, 'success'))
        "
        >{{ t('page_indexing_get_button') }}</NButton
      >
      <span flex-1 />
      <NButton
        quaternary
        :disabled="disabled"
        type="error"
        round
        @click="confirmDel"
      >
        <NIcon><TrashBin /></NIcon>
      </NButton>
    </div>
  </div>
</template>
