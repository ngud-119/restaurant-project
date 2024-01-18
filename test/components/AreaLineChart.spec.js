import { expect, test, describe } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import AreaLineChart from '../../src/components/AreaLineChart.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives
})

//!-------- snapshot test ---------
// test('mount vue component', () => {
//   const wrapper = mount(AreaLineChart)
//   expect(wrapper.html()).toMatchSnapshot()
// })

//!-------- checking props of a component ---------
describe('props__check', () => {
  test('props__data__check', () => {
    const data = { name: 'Income' }
    const wrapper = shallowMount(AreaLineChart, {
      props: { data },
      global: {
        stubs: {
          Line: {
            template: '<canvas />'
          }
        },
        plugins: [vuetify]
      }
    })

    expect(wrapper.text()).toContain(data.name)
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })
})

//!-------- test a tag/element is exist or not ---------
describe('test__tag', () => {
  const data = { name: 'Income' }
  const wrapper = mount(AreaLineChart, {
    props: { data },
    global: {
      stubs: {
        Line: {
          template: '<canvas />'
        }
      }
    }
  })

  const paraElement = wrapper.find('p')
  const vIcon = wrapper.find('v-icon')

  test('is__contain__paragraph__tag', () => {
    expect(paraElement.exists()).toBe(true)
  })

  test('is__contain__props__data__name', () => {
    expect(paraElement.text()).toContain(data.name)
  })

  test('is__v-icon__contains__icon__props', () => {
    expect(vIcon.exists()).toBe(true)
  })
})
