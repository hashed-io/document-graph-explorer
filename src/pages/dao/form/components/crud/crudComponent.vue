<template lang='pug'>
div(v-if='elementsObj.length === 0')
  p  No elements Currently Assigned...
div(v-else)
  div.text-subtitle1
    | elements
    hr
    div(v-for='(element, index) in elementsObj')
      template
        q-item
          q-item-section(top)
            q-item-label(lines='5')
              span.text-caption
                | Name: &nbsp;
                | {{element.name}}
            q-item-label(caption='', lines='1').text-caption
              span.text-caption
                | type: &nbsp;
                | {{element.typeName}}
            q-item-label.q-mt-xs.text-caption.text-primary.text-uppercase(lines='1')
              span Address:  &nbsp;
                | {{element.addressInfo}}
          q-item-section(top='', side='')
            .text-grey-8.q-gutter-xs
              q-btn(size='12px', flat='', dense='', round='', icon='delete' @click='deleteElement(index)')
              q-btn(size='12px', flat='', dense='', round='', icon='edit' @click='editElement(index, element)')
</template>

<script>
export default {
  name: 'crud',
  props: {
    elementsObj: {
      type: Array,
      required: true
    }
  },
  watch: {
    'elementsObj.name': {
      handler (val, oldVal) {
        console.log('Item Changed')
        console.log(val)
      },
      deep: true
    }
  },
  data () {
    return {
      element: null
    }
  },
  methods: {
    deleteElement (index) {
      this.$emit('deleteElement', index)
    },
    editElement (index, element) {
      this.$emit('editElement', index, element)
    }
  }
}
</script>

<style lang='sass'>

</style>
