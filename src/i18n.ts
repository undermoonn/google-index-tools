import { createI18n as _createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import zh from '../locales/zh.json'

interface GetLocaleOptions {
  savedLocale?: I18nLocale
  navigatorLanguage: string
}

export function createI18n(opt: GetLocaleOptions) {
  return _createI18n({
    legacy: false,
    locale: getLocal(opt),
    fallbackLocale: 'en',
    globalInjection: true,
    messages: { en, zh }
  })
}

export function getLocal(opt: GetLocaleOptions): I18nLocale {
  if (opt.savedLocale) {
    return opt.savedLocale
  }
  if (opt.navigatorLanguage.toLowerCase().match('zh')) {
    return 'zh'
  }
  return 'en'
}
