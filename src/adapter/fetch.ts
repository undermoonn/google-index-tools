import { createFetch, type FetchOptions, type FetchRequest } from 'ofetch'

interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}
type ResponseType = keyof ResponseMap | 'json'

export function create(defaultOptions: FetchOptions) {
  const globalFetch = createFetch({
    defaults: defaultOptions
  })

  const GET = <T, R extends ResponseType = 'json'>(
    request: FetchRequest,
    options?: Exclude<FetchOptions<R>, 'method'>
  ) => globalFetch<T, R>(request, { ...options, method: 'GET' })

  const POST = <T, R extends ResponseType = 'json'>(
    request: FetchRequest,
    options?: Exclude<FetchOptions<R>, 'method'>
  ) => globalFetch<T, R>(request, { ...options, method: 'POST' })

  return {
    GET,
    POST
  }
}
