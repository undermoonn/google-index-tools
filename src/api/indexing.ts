import { GET, POST } from '../fetch'
import { Defaults } from '../defaults'

export const ApiIndexing = {
  update: (url: string, opt: { token: AuthAccessToken }) => {
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
  },

  delete: (url: string, opt: { token: AuthAccessToken }) => {
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
  },

  get: (url: string, opt: { token: AuthAccessToken }) => {
    return GET(Defaults.IndexingMetadataApiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${opt.token}`
      },
      query: { url }
    })
  }
}
