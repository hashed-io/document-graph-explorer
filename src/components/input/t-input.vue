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
  data () {
    return {
      content: this.value
    }
  },
  watch: {
    content: function (newVal, oldVal) {
      if (!this.inputFormatting) {
        this.$emit('update', this.content)
      } else {
        this.$emit('update', this.formatContent(this.content, oldVal))
      }
    }
  },
  methods: {
    formatContent (content, oldVal) {
      const regex = /^[a-zA-Z0-9\s]+$/
      if (regex.test(content)) {
        if (content === ' ') {
          return this.content.toLowerCase()
        }
        const regex2 = /^[a-z\s]+\s\d\w+$/
        return !(regex2.test(content)) ? this.content.toLowerCase() : this.showErrorMsg('Only alphanumeric characters are allowed')
      } else {
        this.showErrorMsg('Only alphanumeric characters')
        return oldVal
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
