<template>
  <v-rating
    :value="rating"
    background-color="grey lighten-3"
    color="primary"
    :readonly="true"
    :size="24"
  />
</template>

<script>
export default {
  name: 'MyRating',
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

