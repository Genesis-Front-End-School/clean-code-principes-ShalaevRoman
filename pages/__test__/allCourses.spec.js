import allCourses from '@/pages/courses/allCourses.vue'

describe('allCourses', () => {
  test('fetch method should call getToken and getCourses', async () => {
    const getTokenMock = jest.fn()
    const getCoursesMock = jest.fn()

    const $accessor = {
      coursesData: {
        getToken: getTokenMock,
        getCourses: getCoursesMock
      }
    }

    const app = {
      $accessor
    }

    await allCourses.fetch({ app })

    expect(getTokenMock).toHaveBeenCalled()
    expect(getCoursesMock).toHaveBeenCalled()
  })
})
