import { create as createLog } from './log'
import { create as createFetch } from './fetch'
import { create as createMessage } from './message'

export const { Message } = createMessage()

export const { Log } = createLog({
  onError(error) {
    Message.json(error, 'error')
  }
})

export const { GET, POST } = createFetch({
  onResponseError(ctx) {
    Log.error(ctx.response._data || ctx.error)
  }
})
