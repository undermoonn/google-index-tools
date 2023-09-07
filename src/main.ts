import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from './router'

import Application from './Application.vue'
import './samples/node-api'
import 'virtual:uno.css'

createApp(Application)
  .use(createPinia())
  .use(createRouter())
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
