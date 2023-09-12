<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { CSSProperties, computed } from 'vue'
import { NSwitch, NIcon, type GlobalTheme } from 'naive-ui'
import { DarkModeOutlined, LightModeOutlined } from '@vicons/material'

import { type SetTheme } from '../composables/useNaiveUiTheme'

const props = defineProps<{
  setTheme: SetTheme
  theme: GlobalTheme
}>()

const isDark = useDark({
  onChanged(isDark) {
    props.setTheme(isDark ? 'dark' : 'light')
  }
})

const themeBodyColor = computed(() => {
  return props.theme.common?.bodyColor
})
</script>

<template>
  <NSwitch
    v-model:value="isDark"
    :rail-style="
      opt => {
        const { checked, focused } = opt
        const style: CSSProperties = {
          backgroundColor: theme.common?.hoverColor
        }
        return style
      }
    "
  >
    <template #unchecked-icon>
      <NIcon :color="theme.common?.textColorDisabled"
        ><LightModeOutlined
      /></NIcon>
    </template>
    <template #checked-icon>
      <NIcon :color="theme.common?.textColorDisabled"
        ><DarkModeOutlined
      /></NIcon>
    </template>
  </NSwitch>
</template>

<style scoped>
:deep(.n-switch__button) {
  background-color: v-bind(themeBodyColor) !important;
}
</style>
../composables/useNaiveUiTheme
