import { type MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

const NOOP = () => {
  console.log('message is not ready')
}

export const message: Pick<
  MessageApiInjection,
  'info' | 'error' | 'success' | 'warning'
> = {
  info: NOOP as any,
  error: NOOP as any,
  success: NOOP as any,
  warning: NOOP as any
}

export function setMessage(messageInstance: MessageApiInjection) {
  message.info = messageInstance.info
  message.error = messageInstance.error
  message.success = messageInstance.success
  message.warning = messageInstance.warning
}
