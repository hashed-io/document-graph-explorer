<template lang='pug'>
q-card(flat bordered)
  q-card-section
    .text-h6
      b Header
        .label.text-subtitle1.prose
          | {{docInfo.name}}
  q-card-section
    .row.q-col-gutter-md
      .col-6
        div(:class="classes.titleDocInfo" style='font-size:12px;') Document ID
        div(style='font-size:12px;') {{ docInfo.docID }}
      .col-6
        div(:class="classes.titleDocInfo" style='font-size:12px;') Hash
        div(style='font-size:12px;') {{ docInfo.hash }}
      .col-6
        div(:class="classes.titleDocInfo" style='font-size:12px;') Owner
        div(style='font-size:12px;') {{ docInfo.owner }}
      .col-6
        div(:class="classes.titleDocInfo" style='font-size:12px;') Document Type
        div(style='font-size:12px;') {{ docInfo.documentType }}
      .col-6
        div(:class="classes.titleDocInfo" style='font-size:12px;') Created Date
        div(style='font-size:12px;') {{ docInfo.createdDate }}
      .col-6
        div(:class="classes.titleDocInfo" style='font-size:12px;') Updated Date
        div(style='font-size:12px;') {{ docInfo.updatedDate }}
</template>

<script>
import { cssClasses } from 'src/mixins/css-class.js'
export default {
  name: 'DocInformation',
  mixins: [cssClasses],
  props: {
    docInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
    }
  }
}
</script>

<style lang='sass'>
.label
  color: #9296A0
.titleDocInfo
  text-subtitle2
  text-grey-6
  text-bold
</style>
