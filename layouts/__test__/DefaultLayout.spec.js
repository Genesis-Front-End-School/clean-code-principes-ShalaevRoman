import { shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from 'vue'
import DefaultLayout from '@/layouts/default.vue'

const vuetify = new Vuetify()
Vue.use(Vuetify)

describe('DefaultLayout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DefaultLayout, {
      propsData: {
        darkTheme: true,
        drawer: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Main',
            to: '/'
          },
          {
            title: 'Courses',
            to: '/courses/allCourses'
          }
        ],
        title: 'Genesis_learning_app'
      },
      vuetify,
      stubs: {
        Nuxt: true
      }
    })
  })

  test('renders the navigation drawer with correct items', () => {
    const navigationDrawer = wrapper.findComponent({ name: 'v-navigation-drawer' })
    const listItems = navigationDrawer.findAllComponents({ name: 'v-list-item' })

    expect(listItems.length).toBe(2)

    const firstListItem = listItems.at(0)
    expect(firstListItem.getComponent({ name: 'v-list-item-title' }).text()).toBe('Main')
    expect(firstListItem.attributes('to')).toBe('/')

    const secondListItem = listItems.at(1)
    expect(secondListItem.getComponent({ name: 'v-list-item-title' }).text()).toBe('Courses')
    expect(secondListItem.attributes('to')).toBe('/courses/allCourses')
  })

  test('changes the drawer state on icon click', async () => {
    const appBarNavIcon = wrapper.findComponent({ name: 'v-app-bar-nav-icon' })
    await appBarNavIcon.trigger('click')

    expect(wrapper.vm.drawer).toBe(true)

    await appBarNavIcon.trigger('click')

    expect(wrapper.vm.drawer).toBe(false)
  })

  test('displays the current year in the footer', () => {
    const footer = wrapper.findComponent({ name: 'v-footer' })
    const yearSpan = footer.find('span')

    const currentYear = new Date().getFullYear()
    expect(yearSpan.text()).toBe(`© ${currentYear}`)
  })

  test('toggles darkTheme when v-switch is clicked', async () => {
    const switcher = wrapper.findComponent({ name: 'v-switch' })

    switcher.vm.$emit('change', false)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.darkTheme).toBe(false)


    switcher.vm.$emit('change', true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.darkTheme).toBe(true)
  })
})
