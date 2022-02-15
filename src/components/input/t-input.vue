<template lang='pug'>
div
  .text-subtitle3.text-capitalize.colorTailwind {{label}}
  q-input(
    outlined
    v-model="content"
    :placeholder="placeholder"
    :debounce="debounce"
    :type="type"
    :autofocus="autofocus"
    :dense='dense'
    :rules="rules"
    :autogrow='autogrow'
    :mask="mask"
    :fill-mask="fillMask"
    :hint='hint'
  )
    slot(name='append' class="centerIcon")
</template>

<script>
export default {
  name: 'Tinput',
  props: ['value', 'label', 'dense', 'color', 'debounce', 'rules', 'placeholder', 'type', 'autogrow', 'autofocus', 'mask', 'fillMask', 'hint', 'inputFormatting'],
  model: {
    prop: 'value',
    event: 'update'
  },
  emits: ['update'],
  data () {
    return {
      content: this.value
    }
  },
  watch: {
    content: function (newVal, oldVal) {
      if (this.inputFormatting) {
        this.formatContent(this.content, oldVal, newVal)
      }
      this.$emit('update', this.content)
    }
  },
  methods: {
    formatContent (content, oldVal, newVal) {
      if (newVal.match(/[^a-zA-Z0-9\s]/g)) {
        this.content = oldVal
      } else {
        this.content = this.content.toLowerCase()
      }
    }
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
