<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'
import {
  NIcon,
  NBreadcrumb,
  NConfigProvider,
  NBreadcrumbItem,
  NMessageProvider
} from 'naive-ui'
import { LogoGoogle } from '@vicons/ionicons5'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

import HackSetMessage from './components/hack/HackSetMessage'

hljs.registerLanguage('json', json)

const route = useRoute()
</script>

<template>
  <NConfigProvider h-full flex flex-col :hljs="hljs">
    <NMessageProvider>
      <HackSetMessage />
    </NMessageProvider>
    <div bordered p-6 flex flex-items-center flex-justify-between>
      <NIcon size="120" absolute op-10 style="left: -36px; top: -22px">
        <LogoGoogle />
      </NIcon>
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          Google Index Tools
        </NBreadcrumbItem>
        <NBreadcrumbItem v-if="route.meta.title" :clickable="false">
          {{ route.meta.title }}
        </NBreadcrumbItem>
      </NBreadcrumb>
    </div>
    <RouterView v-slot="{ Component }" p-6>
      <Transition>
        <component :is="Component" />
      </Transition>
    </RouterView>
  </NConfigProvider>
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

html,
body,
#app {
  height: 100%;
}
</style>
