<template lang='pug'>
div
  .text-subtitle3.text-capitalize.colorTailwind {{label}}
  q-input(
    outlined
    color="indigo-8"
    v-model="content"
    :placeholder="value"
    :debounce="debounce"
    :dense='dense'
    :rules="rules"
    @input="$emit('update', content)"
  )
</template>

<script>

export default {
  name: 'Tinput',
  props: ['value', 'label', 'dense', 'color', 'debounce', 'rules'],
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      content: undefined
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.q-field--outlined .q-field__control
  border-width: 0.8px
  border-color: rgba(209,213,219,1)
  border-radius: 8px
.q-field__marginal
  font-size:16px
.colorTailwind
  color: #374157
</style>
