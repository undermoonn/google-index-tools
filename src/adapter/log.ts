import { createLogger, transports, format } from 'winston'

export enum Level {
  warn = 'warn',
  info = 'info',
  error = 'error'
}

type LogMessage = unknown

function convertLogMessage(mes: LogMessage): string {
  try {
    return JSON.stringify(mes)
  } catch (e) {}
  return String(mes)
}

export function create(defaultOptions: {
  onError: (error: LogMessage) => void
}) {
  const _Log = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()]
  })

  const info = (mes: LogMessage) => {
    _Log.info(convertLogMessage(mes))
  }

  const warn = (mes: LogMessage) => {
    _Log.warn(convertLogMessage(mes))
  }

  const error = (mes: LogMessage) => {
    defaultOptions.onError(mes)
    _Log.error(convertLogMessage(mes))
  }

  const Log = {
    info,
    warn,
    error
  }

  return { Log }
}
