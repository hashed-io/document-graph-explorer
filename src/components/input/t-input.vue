<template lang='pug'>
div
  .text-subtitle3.text-capitalize.colorTailwind {{label}}
  q-input(
    outlined
    color="indigo-8"
    v-model="content"
    :placeholder="placeholder"
    :debounce="debounce"
    :type="type"
    :autofocus="autofocus"
    :dense='dense'
    :rules="rules"
    :autogrow='autogrow'
    @input="$emit('update', content)"
  )
    slot(name='append' class="centerIcon")
</template>

<script>

export default {
  name: 'Tinput',
  props: ['value', 'label', 'dense', 'color', 'debounce', 'rules', 'placeholder', 'type', 'autogrow', 'autofocus'],
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      content: this.value
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
  background-color: #FFF
  border-radius: 10px
.q-field__marginal
  font-size:16px
.colorTailwind
  color: #374157

</style>
