<template lang='pug'>
.text-h6.q-py-md Header
  div.q-py-sm
  q-card(flat bordered)
    q-card-section.bg-title-table(style='height: 3.5rem;')
      .label.q-pb-md.text-capitalize
        | {{docInfo.name}}
    q-card-section
      .row
        .col-xs-12.col-sm-6
          div(:class="classes.titleDocInfo" style='font-size:15px;') Hash
          div.column-responsive(style='font-size:15px;') {{ docInfo.hash }}
            q-popup-edit(v-model="docInfo.hash")
              q-input(v-model="docInfo.hash" readonly @keyup.enter.stop type='textarea').fitExpand
        .col-xs-12.col-sm-6
          div(:class="classes.titleDocInfo" style='font-size:15px;') Document ID
          div(style='font-size:15px;') {{ docInfo.docID }}
        .col-xs-12.col-sm-6
          div(:class="classes.titleDocInfo" style='font-size:15px;') Owner
          div(style='font-size:15px;') {{ docInfo.owner }}
        .col-xs-12.col-sm-6
          div(:class="classes.titleDocInfo" style='font-size:15px;') Document Type
          div(style='font-size:15px;') {{ docInfo.documentType }}
        .col-xs-12.col-sm-6
          div(:class="classes.titleDocInfo" style='font-size:15px;') Created Date
          div(style='font-size:15px;') {{ docInfo.createdDate }}
        .col-xs-12.col-sm-6
          div(:class="classes.titleDocInfo" style='font-size:15px;') Updated Date
          div(style='font-size:15px;') {{ docInfo.updatedDate }}
</template>

<script>
import { cssClasses } from '~/mixins/css-class.js'
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

<style lang='stylus'>
.label
  color: #9296A0
.titleDocInfo
  text-subtitle2
  text-grey-6
  text-bold
.fitExpand
  height: auto
</style>
