<script lang="ts" setup>
import { LogoGoogle } from '@vicons/ionicons5'
import {
  NIcon,
  NSpace,
  NDivider,
  NBreadcrumb,
  NGlobalStyle,
  NConfigProvider,
  NDialogProvider,
  NBreadcrumbItem,
  NMessageProvider
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { RouterView, useRoute } from 'vue-router'

import ResetAuth from './components/ResetAuth.vue'
import GithubLink from './components/GithubLink.vue'
import AppVersion from './components/AppVersion.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import LanguageSelect from './components/LanguageSelect.vue'
import HackSetMessage from './components/hack/HackSetMessage'
import { useNaiveUiTheme } from './composables/useNaiveUiTheme'

const { t } = useI18n()
const route = useRoute()
const { setTheme, theme, themeOverrides } = useNaiveUiTheme()
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
    <AppVersion />
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
      <NSpace align="center" :size="20">
        <LanguageSelect />
        <NDivider vertical />
        <ThemeSwitcher :set-theme="setTheme" :theme="theme" />
        <GithubLink />
        <ResetAuth />
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
</style>
