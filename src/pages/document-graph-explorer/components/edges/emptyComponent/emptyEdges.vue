<template lang='pug'>
div
  div.text-h6.q-py-md
    | {{label}}
  q-card(
    class="bg-grey-1"
  )
    q-card-section
      .row.justify-center
        | {{msg}}
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

<style>

</style>
