import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDataTable, VDataTableServer } from 'vuetify/labs/VDataTable'

import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const vuetify = createVuetify({
  // components,
  components: { ...components, VDataTable, VDataTableServer },
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(store)
app.use(ToastPlugin)
app.use(FloatingVue)

app.mount('#app')
