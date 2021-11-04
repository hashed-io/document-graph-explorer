<template lang='pug'>
div
  .text-subtitle1 {{label}}
  q-input(
    outlined
    color='indigo-6'
    v-model="content"
    :placeholder="value"
    :rules="[rules.required]"
    @input="$emit('update', content)"
  )
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'Tinput',
  props: ['value', 'label'],
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
