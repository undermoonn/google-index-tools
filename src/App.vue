<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import UpdateUrl from './pages/UpdateUrl.vue'

hljs.registerLanguage('json', json)
</script>

<template>
  <NConfigProvider :hljs="hljs">
    <UpdateUrl />
  </NConfigProvider>
</template>
