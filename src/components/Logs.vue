<script lang="ts" setup>
import { logMemory, Level } from '../log'
import {
  NTimeline,
  NTimelineItem,
  NCode,
  type TimelineItemProps
} from 'naive-ui'
import { format } from 'date-fns'
import { ExtractPropTypes } from 'vue'

type TimelineType = ExtractPropTypes<TimelineItemProps>['type']

function formatLevelToTimelineType(level: Level): TimelineType {
  if (level === Level.error) {
    return 'error'
  }
  if (level === Level.warn) {
    return 'warning'
  }
  return 'default'
}

/**
 * 优化 JSON 字符串显示
 */
function formatJson(input: string) {
  // 简单检查下是不是 json 字符串
  if (/^{/.test(input)) {
    try {
      return JSON.stringify(JSON.parse(input), null, 2)
    } catch (e) {}
  }
  return input
}
</script>

<template>
  <NTimeline :icon-size="6">
    <NTimelineItem
      v-for="row in logMemory"
      :type="formatLevelToTimelineType(row.level as Level)"
      :time="
        row.timestamp
          ? format(new Date(row.timestamp), 'yyyy-MM-dd HH:mm:ss')
          : '-'
      "
    >
      <!-- <template #icon>
        <NIcon><InformationCircleSharp /></NIcon>
      </template> -->
      <NCode :code="formatJson(row.message)" language="json" />
    </NTimelineItem>
  </NTimeline>
</template>
<style scoped>
:deep(pre) {
  overflow-y: auto;
}
</style>
