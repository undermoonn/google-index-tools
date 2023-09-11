<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'
import {
  NIcon,
  NBreadcrumb,
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  NBreadcrumbItem,
  NMessageProvider,
  NSpace,
  NDivider,
  darkTheme,
  lightTheme,
  type GlobalTheme,
  type GlobalThemeOverrides
} from 'naive-ui'
import { LogoGoogle } from '@vicons/ionicons5'

import GithubLink from './components/GithubLink.vue'
import ThemeSwitcher, { type SetTheme } from './components/ThemeSwitcher.vue'
import LanguageSelect from './components/LanguageSelect.vue'
import HackSetMessage from './components/hack/HackSetMessage'

const { t } = useI18n()
const route = useRoute()
const theme = ref<GlobalTheme>(darkTheme)

const setTheme: SetTheme = type => {
  if (type === 'dark') {
    theme.value = darkTheme
    return
  }
  if (type === 'light') {
    theme.value = lightTheme
    return
  }
  theme.value = darkTheme
}

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgb(87, 91, 199)',
    primaryColorHover: 'rgb(87, 91, 199)'
  }
}
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
          {{ t('nav_root') }}
        </NBreadcrumbItem>
        <NBreadcrumbItem v-if="route.meta.titleI18nKey" :clickable="false">
          {{ t(route.meta.titleI18nKey as string) }}
        </NBreadcrumbItem>
      </NBreadcrumb>
      <NSpace align="center" size="large">
        <LanguageSelect />
        <NDivider vertical />
        <ThemeSwitcher :set-theme="setTheme" :theme="theme" />
        <GithubLink />
      </NSpace>
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
