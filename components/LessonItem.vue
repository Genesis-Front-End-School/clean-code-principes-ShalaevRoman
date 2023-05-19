<template>
  <v-list-item
    :disabled="isLessonLocked"
    @click="chooseLesson()"
  >
    <v-list-item-title>
      {{ lesson.title }}
    </v-list-item-title>
    <v-list-item-action>
      <v-icon
        v-if="!isLessonLocked"
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

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Lesson } from '@/services/api.types'
export default defineComponent({
  name: 'LessonItem',
  props: {
    lesson: {
      required: true,
      type: Object as PropType<Lesson>
    },
    selectedLesson: {
      required: false,
      type: Object as PropType<Lesson | null>,
      default: null
    }
  },
  computed: {
    isLessonLocked (): boolean {
      return this.lesson.status === 'locked'
    },
    colorForButton (): string {
      return this.selectedLesson === this.lesson ? '#00E676' : 'gray'
    }
  },
  methods: {
    chooseLesson (): void {
      this.$emit('onSelectLesson', this.lesson)
    }
  }
})
</script>
