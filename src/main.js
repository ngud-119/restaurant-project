import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDataTable } from 'vuetify/labs/VDataTable'

const vuetify = createVuetify({
  // components,
  components: { ...components, VDataTable },
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  }
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(store)

app.mount('#app')
