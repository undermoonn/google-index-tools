import { MaybeRef, VNodeChild, ref, unref } from 'vue'
import { useDialog, NInput, NButton } from 'naive-ui'

export function useFriendlyPrompt() {
  const { create } = useDialog()
  const inputString = ref('')

  const friendlyPrompt = (
    message: MaybeHTML | (() => VNodeChild),
    opt: {
      buttonText: string

      /**
       * If `expected` is equal to input value in prompt,
       * the promise `friendlyPrompt` returns will be resolved
       */
      expected: MaybeRef<string>
    }
  ) => {
    inputString.value = ''

    return new Promise(resolve => {
      const _dialog = create({
        showIcon: false,
        content: () => (
          <div>
            {messageRender(message)}
            <NInput
              value={inputString.value}
              placeholder={''}
              onUpdate:value={e => {
                inputString.value = e
              }}
              class={'my-4'}
            />
            <NButton
              disabled={inputString.value !== unref(opt.expected)}
              secondary
              class={'w-full'}
              onClick={() => {
                _dialog.destroy()
                resolve(undefined)
              }}
            >
              {opt.buttonText}
            </NButton>
          </div>
        )
      })
    })
  }

  return { friendlyPrompt }
}

function messageRender(message: MaybeHTML | (() => VNodeChild)) {
  if (typeof message === 'function') {
    return message()
  }
  return <div innerHTML={message} />
}
