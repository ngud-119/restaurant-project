import { mount, shallowMount } from '@vue/test-utils'
import AreaLineChart from '../../../src/components/AreaLineChart.vue'
import AdminHome from '../../../src/views/Admin/AdminHome.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives
})

describe('admin__home__test', () => {
  test('child__component__test', () => {
    const wrapper = mount(AdminHome, {
      //   components: { AreaLineChart },
      global: {
        stubs: {
          Line: {
            template: '<canvas />'
          }
        },
        plugins: [vuetify]
      }
    })
    const areaComponents = wrapper.findAllComponents(AreaLineChart)

    expect(areaComponents).toHaveLength(3)
  })
})
