import { getAccessorType } from 'typed-vuex'
import * as coursesData from '~/store/coursesData'

const initialStore = () => ({
  modules: {
    coursesData
  }
})

export const accessorType = getAccessorType(initialStore())
