import { shallowMount } from '@vue/test-utils'
import VideoPlayer from '~/components/VideoPlayer.vue'

describe('VideoPlayer', () => {
  test('should play the lesson when selectedLesson or lessonProgress changes', async () => {
    const selectedLesson = {
      id: 1,
      link: 'lesson-link',
      duration: 60
    }

    const wrapper = shallowMount(VideoPlayer, {
      propsData: {
        selectedLesson,
        lessonProgress: 50
      }
    })

    const videoElement = wrapper.find('video').element
    wrapper.setProps({ selectedLesson: { ...selectedLesson, link: 'new-link' } })
    await wrapper.vm.$nextTick()
    expect(wrapper.props().selectedLesson.link).toBe('new-link')
    expect(videoElement.currentTime).toBe(0)
    wrapper.setProps({ lessonProgress: 75 })
    await wrapper.vm.$nextTick()
    expect(videoElement.currentTime).toBe(0)
  })

  it('renders a video element with correct attributes', () => {
    const wrapper = shallowMount(VideoPlayer)

    const videoElement = wrapper.find('video')
    expect(videoElement.exists()).toBe(true)
    expect(videoElement.classes()).toContain('videoPlayer')
    expect(videoElement.attributes('controls')).toBe('controls')
  })
})
