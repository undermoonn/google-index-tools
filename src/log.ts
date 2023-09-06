import fs from 'node:fs'
import path from 'node:path'
import { ref } from 'vue'
import { app } from '@electron/remote'
import { createLogger, transports, format, Logform } from 'winston'

interface LogLine extends Logform.TransformableInfo {
  timestamp: string
}

export enum Level {
  warn = 'warn',
  info = 'info',
  error = 'error'
}

function getLogFilePath() {
  return path.resolve(app.getPath('temp'), './google-index-tool.log')
}

if (!fs.existsSync(getLogFilePath())) {
  fs.writeFileSync(getLogFilePath(), '', 'utf-8')
}

export const Log = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: getLogFilePath() }),
    new transports.Console()
  ]
})

export const logMemory = ref<LogLine[]>(getLogMemory())

function getLogMemory() {
  const log = fs.readFileSync(getLogFilePath(), 'utf-8')
  return log
    .split('\n')
    .filter(item => item.trim())
    .map(item => {
      return JSON.parse(`${item}`)
    })
    .reverse()
}

fs.watchFile(
  getLogFilePath(),
  {
    interval: 1000
  },
  () => {
    logMemory.value = getLogMemory()
  }
)
