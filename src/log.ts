import { createLogger, transports, format, Logform } from 'winston'
import { message } from './message'

interface LogLine extends Logform.TransformableInfo {
  timestamp: string
}

export enum Level {
  warn = 'warn',
  info = 'info',
  error = 'error'
}

const _Log = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  /** TODO: transport IndexedDB  */
  transports: [new transports.Console()]
})

type LogMessage = unknown

function convertLogMessage(mes: LogMessage): string {
  try {
    return JSON.stringify(mes)
  } catch (e) {}
  return String(mes)
}

const info = (mes: LogMessage) => {
  _Log.info(convertLogMessage(mes))
}

const warn = (mes: LogMessage) => {
  _Log.warn(convertLogMessage(mes))
}

const error = (mes: LogMessage) => {
  message.error(convertLogMessage(mes))
  _Log.error(convertLogMessage(mes))
}

export const Log = {
  info,
  warn,
  error
}
