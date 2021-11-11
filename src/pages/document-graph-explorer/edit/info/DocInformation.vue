<template lang='pug'>
q-card(flat bordered)
  q-card-section
    .text-h6
      b Explore Document
    .label.text-subtitle1
      | {{docInfo.name}}
  q-separator(color='grey-3')
  q-card-section
    .row.q-col-gutter-md
      .col-6
        div(:class="classes.titleDocInfo") Document ID
        div {{ docInfo.docID }}
      .col-6
        div(:class="classes.titleDocInfo") Hash
        div {{ docInfo.hash }}
      .col-6
        div(:class="classes.titleDocInfo") Owner
        div {{ docInfo.owner }}
      .col-6
        div(:class="classes.titleDocInfo") Document Type
        div {{ docInfo.documentType }}
      .col-6
        div(:class="classes.titleDocInfo") Created Date
        div {{ docInfo.createdDate }}
      .col-6
        div(:class="classes.titleDocInfo") Updated Date
        div {{ docInfo.updatedDate }}
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
