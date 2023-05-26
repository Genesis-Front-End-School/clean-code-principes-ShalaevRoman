import { shallowMount } from '@vue/test-utils'
import LessonItem from '@/components/LessonItem.vue'
import { Lesson } from '~/__mocks__/coursesData'

describe('LessonItem', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(LessonItem, {
      propsData: {
        lesson: Lesson,
        selectedLesson: null
      }
    })
  })

  test('displays the correct lesson title', () => {
    const title = wrapper.findComponent({ name: 'v-list-item-title' })
    expect(title.text()).toBe(wrapper.props().lesson.title)
  })

  test('renders the play button when the lesson is not locked', async () => {
    wrapper.setProps({
      lesson: {
        id: '1',
        title: 'Lesson 1',
        status: 'unlocked'
      }
    })

    await wrapper.vm.$nextTick()

    const playButton = wrapper.findComponent({ name: 'v-icon' })
    expect(playButton.exists()).toBe(true)
    expect(playButton.text()).toBe('mdi-play-circle')
  })

  test('renders the lock icon when the lesson is locked', async () => {
    wrapper.setProps({
      lesson: {
        id: '1',
        title: 'Lesson 1',
        status: 'locked'
      }
    })

    await wrapper.vm.$nextTick()

    const lockIcon = wrapper.findComponent({ name: 'v-icon' })
    expect(lockIcon.exists()).toBe(true)
    expect(lockIcon.text()).toBe('mdi-lock')
  })

  test('emits the "onSelectLesson" event when lesson is chosen', () => {
    wrapper.vm.chooseLesson()
    expect(wrapper.emitted('onSelectLesson')).toBeTruthy()
    expect(wrapper.emitted('onSelectLesson')[0][0]).toEqual(wrapper.props().lesson)
  })
})
