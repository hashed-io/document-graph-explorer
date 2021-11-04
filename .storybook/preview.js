import Vue from 'vue'
import VueRouter from 'vue-router'
import Quasar from 'quasar'
// import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import iconSet from 'quasar/icon-set/fontawesome-v5'
// Import all the quasar css
import 'quasar/dist/quasar.min.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons/index'
import '@quasar/extras/material-icons/index.js'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

import VueI18n from 'vue-i18n'
import messages from '../src/i18n'

Vue.use(Quasar, {
  iconSet: iconSet,
})
Vue.use(VueRouter)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages
})
export const decorators = [
  (story) => ({
    components: { story },
    template: `<story />`,
    i18n,
    router: new VueRouter()
  })
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
}