<script lang="ts" setup>
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import {
  NIcon,
  NBreadcrumb,
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NBreadcrumbItem,
  NMessageProvider,
  darkTheme,
  lightTheme,
  type GlobalTheme,
  type GlobalThemeOverrides
} from 'naive-ui'
import { LogoGoogle } from '@vicons/ionicons5'

import HackSetMessage from './components/hack/HackSetMessage'

const route = useRoute()

const theme = ref<GlobalTheme>(darkTheme)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgb(87, 91, 199)',
    primaryColorHover: 'rgb(87, 91, 199)'
  }
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', e => {
    if (e.matches) {
      theme.value = darkTheme
    }
  })

window
  .matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', e => {
    if (e.matches) {
      theme.value = lightTheme
    }
  })
</script>

<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
    h-full
    flex
    flex-col
  >
    <NGlobalStyle />
    <NMessageProvider>
      <HackSetMessage />
    </NMessageProvider>
    <div bordered p-6 flex flex-items-center flex-justify-between>
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <NIcon mr-3>
            <LogoGoogle />
          </NIcon>
          Index Tools
        </NBreadcrumbItem>
        <NBreadcrumbItem v-if="route.meta.title" :clickable="false">
          {{ route.meta.title }}
        </NBreadcrumbItem>
      </NBreadcrumb>
    </div>
    <NDialogProvider>
      <RouterView p-6 />
    </NDialogProvider>
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
body {
  /* background: #191a23;
  color: rgb(210, 211, 224); */
}
</style>
