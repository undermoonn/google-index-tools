import { createApp } from 'vue'
import { createPinia } from 'pinia'
// eslint-disable-next-line import/no-unresolved
import 'virtual:uno.css'

import './samples/nodeApi'
import { createI18n } from './i18n'
import { createRouter } from './router'
import Application from './Application.vue'

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
