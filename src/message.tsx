import { unref } from 'vue'
import 'vue-json-pretty/lib/styles.css'
import VueJsonPretty from 'vue-json-pretty'
import { type MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

const NOOP = () => {
  console.log('message is not ready')
}

export const message: Pick<
  MessageApiInjection,
  'info' | 'error' | 'success' | 'warning'
> & {
  json: (input: unknown) => void
} = {
  info: NOOP as any,
  error: NOOP as any,
  success: NOOP as any,
  warning: NOOP as any,
  json: NOOP as any
}

export function setMessage(messageInstance: MessageApiInjection) {
  message.info = messageInstance.info
  message.error = messageInstance.error
  message.success = messageInstance.success
  message.warning = messageInstance.warning
  message.json = (input: unknown) => {
    messageInstance.info(
      () => {
        return (
          <div
            class={'overflow-scroll'}
            style={'max-width: 80vw; max-height: 80vh'}
          >
            <VueJsonPretty data={unref(input) as any} />
          </div>
        )
      },
      {
        keepAliveOnHover: true,
        duration: 10000,
        closable: true,
        icon: () => {}
      }
    )
  }
}
