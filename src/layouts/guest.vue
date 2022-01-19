<script>
export default {
  name: 'layout-guest',
  computed: {
    title () {
      return this.$t(this.$route.meta.title || 'common.defaultTitle')
    }
  }
}
</script>

<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-page-container
    q-page.flex.column.relative-position.bg-background
      q-icon(
        @click="$router.go(-1)",
        size="md"
        class="text-brand-primary cursor-pointer back"
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
          path(fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd")
      .col-2.text-center.content-start
      .col-10.flex.flex-center.col-grow.q-pa-lg
        router-view
</template>

<style lang="stylus" scoped>
  .back
    position: absolute
    top: 25px
    left: 10px
  h1
    color: white !important
    font-size: 16px
    padding: 0
    line-height: 60px
    font-weight: 600
</style>
