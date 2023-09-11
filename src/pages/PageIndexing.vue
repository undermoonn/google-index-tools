<script setup lang="tsx">
import { NButton, NInput, NIcon, NSpin, useDialog } from 'naive-ui'
import { TrashBin, Link } from '@vicons/ionicons5'
import {
  getMetadata,
  postDeleteIndexing,
  postUpdateIndexing
} from '../api/indexing'
import { computed, ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { message } from '../message'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const dialog = useDialog()
const loading = ref(false)
const authStore = useAuthStore()
const url = ref('')
const legal = computed(() => /https:\/\//.test(url.value))
const disabled = computed(() => !legal.value || loading.value)

function respMessage(res: unknown) {
  message.info(
    () => {
      return (
        <div
          class={'overflow-scroll'}
          style={'max-width: 80vw; max-height: 80vh'}
        >
          <VueJsonPretty data={res as any} />
        </div>
      )
    },
    {
      keepAliveOnHover: true,
      duration: 10000,
      closable: true,
      icon: () => {}
    }
  )
}

async function get() {
  loading.value = true
  try {
    const res = await getMetadata(url.value, {
      token: authStore.authAccessToken
    })
    respMessage(res)
  } catch (e) {}
  loading.value = false
}

async function update() {
  loading.value = true
  try {
    const res = await postUpdateIndexing(url.value, {
      token: authStore.authAccessToken
    })
    respMessage(res)
  } catch (e) {}
  loading.value = false
}

async function confirmDel() {
  const confirmInputValue = ref('')
  const d = dialog.create({
    showIcon: false,
    content() {
      return (
        <div>
          <div>
            Please type
            <span class={'font-mono py-1 px-2 mx-2 rounded bg-black bg-op-10'}>
              {url.value}
            </span>
            to confirm.
          </div>
          <NInput
            value={confirmInputValue.value}
            placeholder={''}
            onUpdate:value={e => {
              confirmInputValue.value = e
            }}
            class={'my-4'}
          ></NInput>
          <NButton
            disabled={confirmInputValue.value !== url.value}
            secondary
            class={'w-full'}
            onClick={() => {
              d.destroy()
              del()
            }}
          >
            Confirm
          </NButton>
        </div>
      )
    }
  })
}

async function del() {
  loading.value = true
  try {
    const res = await postDeleteIndexing(url.value, {
      token: authStore.authAccessToken
    })
    respMessage(res)
  } catch (e) {}
  loading.value = false
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
      placeholder="Please Input URL"
      :disabled="loading"
      size="large"
      autofocus
    >
      <template #prefix>
        <NSpin mr-1 v-if="loading" :size="18" stroke="#eee" />
        <NIcon mr-1 v-else :size="18"><Link /></NIcon>
      </template>
    </NInput>
    <div flex mt-6 flex-justify-start w-full>
      <NButton :disabled="disabled" secondary @click="update"
        >update url indexing</NButton
      >
      <NButton ml-4 :disabled="disabled" secondary @click="get"
        >get metadata</NButton
      >
      <span flex-1></span>
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
