<script setup lang="ts">
import { NButton, NInput, NIcon } from 'naive-ui'
import { TrashBin, Link } from '@vicons/ionicons5'
import {
  getMetadata,
  postDeleteIndexing,
  postUpdateIndexing
} from '../api/indexing'
import { computed, ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { message } from '../message'

const authStore = useAuthStore()
const url = ref('')
const legal = computed(() => /https:\/\//.test(url.value))
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
    <NInput v-model:value="url" placeholder="Please Input URL">
      <template #prefix>
        <NIcon><Link /></NIcon>
      </template>
    </NInput>
    <div flex mt-6 flex-justify-start w-full>
      <NButton disabled secondary>update url indexing</NButton>
      <NButton
        ml-4
        :disabled="!legal"
        secondary
        @click="
          () => {
            // TODO: loading
            getMetadata(url, {
              token: authStore.authAccessToken
            }).then(res => {
              message.success(JSON.stringify(res))
            })
          }
        "
        >get metadata</NButton
      >
      <span flex-1></span>
      <NButton quaternary disabled type="error" round>
        <NIcon><TrashBin /></NIcon>
      </NButton>
    </div>
  </div>
</template>
