<template lang="pug">
.row.q-gutter-sm.q-pb-md
  q-icon(
    @click="onClick()",
    size="xs"
    class="text-brand-primary cursor-pointer"
  )
    svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
      path(fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd")
  .text-caption.text-brand-primary.cursor-pointer(
    @click="onClick()"
  ) Back
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BackComponent',
  data () {
    return {}
  },
  methods: {
    ...mapMutations('documentGraph', ['clearStack']),
    onClick () {
      this.clearStack()
      this.$router.push({ name: 'listDocs' })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
