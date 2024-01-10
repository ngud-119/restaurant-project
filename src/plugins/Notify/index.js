import { createApp } from 'vue'
import Notify from './Notify.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default {
  install(app, options = {}) {
    const vuetify = createVuetify({
      // components,
      components: { ...components },
      directives,
      icons: {
        defaultSet: 'mdi' // This is already the default value - only for display purposes
      }
    })

    const NotifyComponent = app.component(Notify.name)
    console.log(NotifyComponent)
    if (!NotifyComponent) {
      const appInstance = createApp(Notify, {
        ...options
      })
      const vm = appInstance.use(vuetify).mount(document.getElementById('notification-container'))
      document.body.appendChild(vm.$el)
      app.config.globalProperties.$notify = (
        type = 'success',
        title,
        message,
        customOptions = {},
        id = null
      ) => {
        console.log(type, title, message, customOptions, id)
        vm.addItem(type, title, message, customOptions, id)
      }
      console.log(vm)
    }
  }
}

const NotifyPlugin = ()=>{

}
