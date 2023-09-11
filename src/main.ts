import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from './i18n'
import { createRouter } from './router'

import Application from './Application.vue'
import './samples/node-api'
import 'virtual:uno.css'

createApp(Application)
  .use(createPinia())
  .use(createRouter())
  .use(
    createI18n({
      savedLocale: localStorage.getItem('__vue_i18n_locale__') as I18nLocale,
      navigatorLanguage: navigator.language
    })
  )
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
