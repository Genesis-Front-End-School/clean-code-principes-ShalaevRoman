import { shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import EmptyLayout from '@/layouts/error.vue'

const vuetify = new Vuetify()
describe('EmptyLayout', () => {
  let wrapper
  const error = {
    response: {
      status: 404
    },
    message: 'Page not found'
  }

  beforeEach(() => {
    wrapper = shallowMount(EmptyLayout, {
      propsData: {
        error
      },
      vuetify,
      stubs: {
        NuxtLink: true
      }
    })
  })

  test('renders the correct error title and message', () => {
    expect(wrapper.find('h1').text()).toBe('404 Not Found sorry)')
    expect(wrapper.find('p').text()).toBe('Page not found')
  })

  test('renders NuxtLink to home page', () => {
    const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })
    expect(nuxtLink.text()).toBe('Home page')
    expect(nuxtLink.attributes('to')).toBe('/')
  })
})
