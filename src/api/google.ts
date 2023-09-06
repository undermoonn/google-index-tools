import { google } from 'googleapis'
import { Log } from '../log'

export let urlUpdate = (urls: string[]): Promise<unknown> | void => {
  console.error('plese call `initGoogleAuth` before requesting index')
}

export function initGoogleAuth(config: AuthConfig) {
  return new Promise((resolve, reject) => {
    const jwtClient = new google.auth.JWT(
      config.client_email,
      undefined,
      config.private_key,
      ['https://www.googleapis.com/auth/indexing'],
      undefined
    )

    jwtClient.authorize((err, tokens) => {
      if (err) {
        Log.error(err.message)
        reject(err)
        return
      }
      Log.info('授权成功')

      urlUpdate = async (urls: string[]) => {
        const requests = urls.map(url => async () => {
          try {
            Log.info(
              JSON.stringify({
                url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
                body: {
                  url,
                  type: 'URL_UPDATED'
                }
              })
            )

            const res = await fetch(
              'https://indexing.googleapis.com/v3/urlNotifications:publish',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${tokens?.access_token}`
                },
                body: JSON.stringify({
                  url,
                  type: 'URL_UPDATED'
                })
              }
            )
            const r = await res.json()
            Log.info(JSON.stringify(r))
            return r
          } catch (e) {
            Log.error(e)
          }
        })
        // TODO: 先同时请求，后可控制并发请求数
        return Promise.all(requests.map(_req => _req()))
      }

      resolve('init google auth success')
    })
  })
}
