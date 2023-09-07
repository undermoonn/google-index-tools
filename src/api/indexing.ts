import { GET, POST } from '../http'
import { Defaults } from '../defaults'

export const postUpdateIndexing = (
  url: string,
  opt: { token: AuthAccessToken }
) => {
  return POST(Defaults.IndexingPublishApiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${opt.token}`
    },
    body: {
      url,
      type: 'URL_UPDATED'
    }
  })
}

export const postDeleteIndexing = (
  url: string,
  opt: { token: AuthAccessToken }
) => {
  return POST(Defaults.IndexingPublishApiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${opt.token}`
    },
    body: {
      url,
      type: 'URL_DELETED'
    }
  })
}

export const getMetadata = (url: string, opt: { token: AuthAccessToken }) => {
  return GET(Defaults.IndexingMetadataApiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${opt.token}`
    },
    query: { url }
  })
}
