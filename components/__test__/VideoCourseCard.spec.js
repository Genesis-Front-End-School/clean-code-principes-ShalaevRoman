import { shallowMount } from '@vue/test-utils'
import VideoCourseCard from '@/components/VideoCourseCard.vue'
import { Course } from '~/__mocks__/coursesData'

describe('VideoCourseCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VideoCourseCard, {
      propsData: {
        course: Course,
        playVideo: jest.fn(),
        stopVideo: jest.fn()
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

  test('emits the correct event when video player is hovered or stopped', () => {
    const videoPlayer = wrapper.find('video')

    videoPlayer.trigger('mouseenter')
    expect(wrapper.props('playVideo')).toHaveBeenCalledTimes(1)
    expect(wrapper.props('playVideo')).toHaveBeenCalledWith(videoPlayer.element, wrapper.props().course.meta.courseVideoPreview.link)

    videoPlayer.trigger('mouseout')
    expect(wrapper.props('stopVideo')).toHaveBeenCalledTimes(1)
    expect(wrapper.props('stopVideo')).toHaveBeenCalledWith(videoPlayer.element)
  })

  test('events are fired in the correct sequence', () => {
    wrapper.vm.$emit('playVideo')
    wrapper.vm.$emit('stopVideo')

    expect(wrapper.emitted().playVideo).toBeTruthy()
    expect(wrapper.emitted().stopVideo).toBeTruthy()
  })
})
