import { shallowMount } from '@vue/test-utils'
import CoursesList from '@/components/CoursesList.vue'
import VideoCourseCard from '@/components/VideoCourseCard.vue'
import { Courses } from '~/__mocks__/coursesData'

describe('CoursesList', () => {
  let wrapper
  const { courses } = Courses

  beforeEach(() => {
    wrapper = shallowMount(CoursesList, {
      mocks: {
        $accessor: {
          coursesData: {
            allCourses: courses
          }
        }
      },
      components: {
        VideoCourseCard
      }
    })
  })

  test('renders the correct number of VideoCourseCard components', () => {
    const courseCards = wrapper.findAllComponents(VideoCourseCard)
    expect(courseCards).toHaveLength(3)
  })

  test('updates the current page when the pagination is changed', async () => {
    const pagination = wrapper.findComponent({ name: 'VPagination' })

    await pagination.vm.$emit('input', 2)
    expect(wrapper.vm.currentPage).toBe(2)
  })

  test('displays the correct courses based on the current page', async () => {
    wrapper.setData({ currentPage: 1 })

    await wrapper.vm.$nextTick()

    const courseCards = wrapper.findAllComponents(VideoCourseCard)

    expect(courseCards.at(0).props('course')).toEqual(courses[0])
    expect(courseCards.at(1).props('course')).toEqual(courses[1])
  })
})
