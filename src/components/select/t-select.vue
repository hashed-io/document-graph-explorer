<template lang='pug'>
div
  .text-subtitle3 {{label}}
  q-select(
    outlined
    color='indigo-6'
    v-model="content"
    :placeholder="value"
    :options="options"
    emit-value
    map-options
    :dense='dense'
    :rules="[rules.required]"
    @input="$emit('update', content)"
  )
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'Tselect',
  props: ['value', 'label', 'dense', 'options'],
  mixins: [validation],
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

<style lang="sass">

</style>
