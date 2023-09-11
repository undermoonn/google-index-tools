<script lang="ts" setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NSelect, NIcon } from 'naive-ui'
import { Language } from '@vicons/ionicons5'
import { useLocalStorage } from '@vueuse/core'

import { getLocal } from '../i18n'

const i18n = useI18n()
const locale = useLocalStorage<I18nLocale>('__vue_i18n_locale__', '')

watch(locale, val => {
  if (val) {
    i18n.locale.value = val
  } else {
    locale.value = getLocal({ navigatorLanguage: navigator.language })
  }
})
</script>

<template>
  <NSelect
    v-model:value="locale"
    :options="[
      {
        label: '中文',
        value: 'zh'
      },
      {
        label: 'English',
        value: 'en'
      }
    ]"
    style="width: 100px"
    size="small"
  >
    <template #arrow>
      <NIcon><Language /></NIcon>
    </template>
  </NSelect>
</template>
