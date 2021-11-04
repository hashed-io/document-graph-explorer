<template lang='pug'>
div
  .text-h5 Item History
  .text-caption Document number : 324458123
  TimeLine
</template>

<script>
import TimeLine from './read/timeline.vue'
export default {
  name: 'timeline-page',
  components: { TimeLine }
}
</script>

<style lang="stylus" scoped>
</style>
