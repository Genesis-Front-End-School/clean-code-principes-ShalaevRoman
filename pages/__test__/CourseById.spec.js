import { shallowMount } from '@vue/test-utils'
import { Course, Lesson } from '~/__mocks__/coursesData'
import CourseById from '@/pages/courses/_id.vue'

describe('CourseById', () => {
  test('renders selected course title and description', () => {
    const selectedCourse = Course

    const wrapper = shallowMount(CourseById, {
      mocks: {
        $route: {
          params: {
            id: selectedCourse.id
          }
        },
        $accessor: {
          coursesData: {
            selectedCourse
          }
        }
      },
      stubs: {
        VideoPlayer: true,
        LessonItem: true
      }
    })

    expect(wrapper.findComponent({ name: 'v-card-title' }).text()).toBe(selectedCourse.title)
    expect(wrapper.findComponent({ name: 'v-card-subtitle' }).text()).toBe(selectedCourse.description)
  })

  test('selects lesson when onSelectLesson is called', () => {
    const wrapper = shallowMount(CourseById, {
      mocks: {
        $accessor: {
          coursesData: {
            selectedLesson: null,
            selectedCourse: Course
          }
        }
      },
      stubs: {
        VideoPlayer: true,
        LessonItem: true
      }
    })
    wrapper.vm.onSelectLesson(Lesson)

    expect(wrapper.vm.selectedLesson).toBe(Lesson)
  })

  test('gets lesson progress correctly', async () => {
    const selectedLesson = { id: 'b9ad7391-0f0b-4fe1-b919-6525d76ad3c4' }

    const wrapper = shallowMount(CourseById, {
      mocks: {
        $accessor: {
          coursesData: {
            selectedLesson: null,
            selectedCourse: Course
          }
        }
      },
      stubs: {
        VideoPlayer: true,
        LessonItem: true
      }
    })
    localStorage.setItem(selectedLesson.id, '50')
    wrapper.vm.selectedLesson = selectedLesson

    await wrapper.vm.$nextTick()

    expect(localStorage.getItem(selectedLesson.id)).toBe('50')
    expect(wrapper.vm.lessonProgress).toBe(50)
  })
})
