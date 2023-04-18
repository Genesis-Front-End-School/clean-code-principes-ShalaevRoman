<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="course in displayedCourses"
          :key="course.id"
          cols="12"
          md="6"
          lg="4"
        >
          <VideoCourseCard
            :course="course"
          />
        </v-col>
      </v-row>
      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="paginationLength"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'CoursesList',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    allCourses() {
      return this.$store.state.courses.allCourses
    },
    displayedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allCourses.slice(start, end);
    },
    paginationLength() {
      return Math.ceil(this.allCourses.length / this.itemsPerPage)
    }
  },
};
</script>

<style lang="scss">

</style>
