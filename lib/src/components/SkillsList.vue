<template>
  <ul class="skills-list">
    <li
      v-for="(skill, i) in skills"
      :key="i"
      class="skills-list__item"
    >
      {{ skill }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "SkillsList",
  props: {
    skills: {
      type: Array,
      default: ['some skills']
    }
  }
}
</script>
