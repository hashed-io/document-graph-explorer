<template lang="pug">
#NewEdgeDialog
  q-card.full-width
    q-toolbar
      q-toolbar-title New Edge Form
      q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
    q-card-section
      Tinput(
        v-model="form.direction"
        label='Edge direction'
      )
      Tinput(
        v-model="form.edge"
        label='Edge Name'
      )
      Tinput(
        v-model="form.name"
        label='Destination Document '
      )
    q-card-actions
      q-btn(
        unelevated
        color='primary'
        label='Add edge'
        @click ="addEdge"
      )
</template>

<script>
import Tinput from '~/components/input/t-input'
export default {
  name: 'EdgeDialog',
  components: {
    Tinput
  },
  data () {
    return {
      form: {
        direction: undefined,
        edge: undefined,
        name: undefined
      }
    }
  },
  methods: {
    addEdge () {
      this.$emit('EdgeData', this.form)
    }
  }
}
</script>

<style lang="sass">
</style>
