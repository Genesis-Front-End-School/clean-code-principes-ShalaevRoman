<template>
  <v-list-item
    :disabled="isLessonLocked"
    @click="chooseLesson()"
  >
    <v-list-item-title>{{ lesson.title }}</v-list-item-title>
    <v-list-item-action>
      <v-icon
        v-if="lessonStatus"
        :color="colorForButton"
      >
        mdi-play-circle
      </v-icon>
      <v-icon v-else color="grey">
        mdi-lock
      </v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'LessonItem',
  props: {
    lesson: {
      required: true,
      type: Object
    },
    selectedLesson: {
      required: false,
      type: Object,
      default() {
        return {
          title: 'Hello'
        }
      }
    }
  },
  computed: {
    isLessonLocked () {
      return this.lesson.status === 'locked'
    },
    lessonStatus () {
      return this.lesson.status === 'unlocked'
    },
    colorForButton () {
      return this.selectedLesson === this.lesson ? '#00E676' : 'gray'
    }
  },
  methods: {
    chooseLesson () {
      this.$emit('onSelectLesson', this.lesson)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
