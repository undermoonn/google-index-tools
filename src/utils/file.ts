import { Log } from '../adapter'

export async function readFileAsText(
  file: MaybeUndefined<File>
): Promise<string> {
  if (!file) {
    return ''
  }
  try {
    const render = new FileReader()
    render.readAsText(file, 'utf-8')
    return await new Promise(resolve => {
      render.onload = e => {
        resolve(typeof e.target?.result === 'string' ? e.target.result : '')
      }
    })
  } catch (e) {
    Log.info(file)
    Log.error('read file failed')
  }
  return ''
}

export async function readFileAsJsonObject<T>(
  file: MaybeUndefined<File>
): Promise<T | null> {
  try {
    return JSON.parse(await readFileAsText(file)) as T
  } catch (e) {
    Log.error('illegal JSON')
  }
  return null
}
