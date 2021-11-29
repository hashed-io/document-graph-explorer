<template lang='pug'>
q-card(flat bordered)
  q-card-section
    .label.text-subtitle1.docInfoTitle
      | {{docInfo.name}}
  q-separator(color='grey-3')
  q-card-section
    .row.q-col-gutter-md
      .col-6.docInfoInside
        div(:class="classes.titleDocInfo") Document ID
        div {{ docInfo.docID }}
      .col-6.docInfoInside
        div(:class="classes.titleDocInfo") Hash
        div.column-responsive
          | {{ docInfo.hash }}
          q-popup-edit(v-model="docInfo.hash")
            q-input(v-model='docInfo.hash' autogrow dense readonly)
      .col-6.docInfoInside
        div(:class="classes.titleDocInfo") Owner
        div {{ docInfo.owner }}
      .col-6.docInfoInside
        div(:class="classes.titleDocInfo") Document Type
        div {{ docInfo.documentType }}
      .col-6.docInfoInside
        div(:class="classes.titleDocInfo") Created Date
        div {{ dateToString(docInfo.createdDate) }}
      .col-6.docInfoInside
        div(:class="classes.titleDocInfo") Updated Date
        div {{ dateToString(docInfo.updatedDate) }}
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

<style lang='stylus' scoped>
.label
  color: #9296A0
.titleDocInfo
  text-subtitle2
  text-grey-6
  text-bold
.column-responsive
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 600px
</style>
