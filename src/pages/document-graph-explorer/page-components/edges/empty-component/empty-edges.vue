<template lang='pug'>
div
  div.text-h6.q-pb-md {{label}}
  q-card(
    class="bg-grey-1"
  )
    q-card-section
      .row.justify-center.color {{msg}}
</template>

<script>
export default {
  name: 'EmptyEdges',
  props: {
    label: {
      type: String,
      required: false
    },
    msg: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.color
  color: #6B7280 !important
  font-weight: 500
  font-size: 13px
</style>
