<script lang="ts" setup>
import { NIcon, NButton } from 'naive-ui'
import { LogoGithub } from '@vicons/ionicons5'

function toGithub() {
  window.open('https://github.com/undermoonn/google-index-tools')
}
</script>

<template>
  <NButton text block @click="toGithub">
    <NIcon size="22"><LogoGithub /></NIcon>
  </NButton>
</template>
