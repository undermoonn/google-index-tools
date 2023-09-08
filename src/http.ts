import { ofetch, FetchOptions } from 'ofetch'
import { Log } from './log'

type Ofetch = typeof ofetch
type ReqInfo = Parameters<Ofetch>[0]
type ReqOpts = FetchOptions<'json'>

const onRequest: ReqOpts['onRequest'] = ctx => {
  const { options, request } = ctx
}

const onRequestError: ReqOpts['onRequestError'] = ctx => {
  const { options, request, error } = ctx
  Log.error(error)
}

const onResponse: ReqOpts['onResponse'] = ctx => {
  const { options, request, response } = ctx
}

const onResponseError: ReqOpts['onResponseError'] = ctx => {
  const { options, request, response, error } = ctx
  Log.error(response._data || error)
}

const baseOpts: ReqOpts = {
  onRequest,
  onResponse,
  onRequestError,
  onResponseError
}

function mergeOptions(
  method: 'GET' | 'POST',
  baseOpt: ReqOpts,
  opts?: ReqOpts | undefined | null
): ReqOpts {
  // TODO: merge onXxx events
  return {
    ...baseOpt,
    ...(opts || {}),
    method
  }
}

export function GET<RespT>(info: ReqInfo, opts?: Exclude<ReqOpts, 'method'>) {
  return ofetch<RespT>(info, mergeOptions('GET', baseOpts, opts))
}

export function POST<RespT>(info: ReqInfo, opts?: Exclude<ReqOpts, 'method'>) {
  return ofetch<RespT>(info, mergeOptions('POST', baseOpts, opts))
}
