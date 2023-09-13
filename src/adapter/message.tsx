import { unref } from 'vue'
import 'vue-json-pretty/lib/styles.css'
import VueJsonPretty from 'vue-json-pretty'
import { type MessageOptions, type MessageReactive } from 'naive-ui'
import { type MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

const NOOP = () => {
  console.log('message is not ready')
}

export function create() {
  const Message: Pick<
    MessageApiInjection,
    'info' | 'error' | 'success' | 'warning'
  > & {
    json: (input: unknown, type: MessageOptions['type']) => MessageReactive
    setInstance: (messageInstance: MessageApiInjection) => void
  } = {
    info: NOOP as any,
    error: NOOP as any,
    success: NOOP as any,
    warning: NOOP as any,
    json: NOOP as any,

    setInstance(instance) {
      Message.info = instance.info
      Message.error = instance.error
      Message.success = instance.success
      Message.warning = instance.warning
      Message.json = (input, type = 'default') => {
        return instance.create(
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
            type
          }
        )
      }
    }
  }
  return { Message }
}
