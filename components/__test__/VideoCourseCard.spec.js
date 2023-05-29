import { shallowMount } from '@vue/test-utils'
import VideoCourseCard from '~/components/VideoCourseCard.vue'
import { Course } from '~/__mocks__/coursesData'

describe('VideoCourseCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VideoCourseCard, {
      propsData: {
        course: Course
      }
    })
  })

  test('displays the correct course title', () => {
    const title = wrapper.find('.headline')
    expect(title.text()).toBe(wrapper.props().course.title)
  })

  test('displays the course rating and lessons count', () => {
    const rating = wrapper.findComponent({ name: 'v-rating' })
    const lessonsCount = wrapper.find('.rating-wrapper .subtitle-2')

    expect(rating.exists()).toBe(true)
    expect(rating.props('value')).toBe(5)

    expect(lessonsCount.exists()).toBe(true)
  })
  //
  test('renders the video player with correct attributes and classes', () => {
    const videoPlayer = wrapper.find('video')

    expect(videoPlayer.exists()).toBe(true)
    expect(videoPlayer.attributes('poster')).toBe(wrapper.props().course.previewImageLink + '/cover.webp')
    expect(videoPlayer.classes('cursor-pointer')).toBe(true)
    expect(videoPlayer.classes('video-player')).toBe(true)
  })

  test('events are fired in the correct sequence', () => {
    wrapper.vm.$emit('playVideo')
    wrapper.vm.$emit('stopVideo')

    expect(wrapper.emitted().playVideo).toBeTruthy()
    expect(wrapper.emitted().stopVideo).toBeTruthy()
  })
})
