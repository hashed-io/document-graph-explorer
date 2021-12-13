<template lang='pug'>
q-card(bordered).cardTailWind
  q-card-section
    div.text-capitalize Document information
    .label.docInfoTitle
      | {{docInfo.name}}
  q-separator.colorSeparator
  q-card-section
    .row.q-gutter-lg
      .docInfoInside(v-if='docInfo.docId')
        div.text-grey-6.text-capitalize Document ID
        div {{ docInfo.docId }}
      .docInfoInside
        div.text-grey-6.text-capitalize Hash
        div.column-responsive
          | {{ docInfo.hash }}
      .docInfoInside
        div.text-grey-6.text-capitalize Owner
        div {{ docInfo.creator }}
      .docInfoInside
        div.text-grey-6.text-capitalize Document Type
        div {{ docInfo.type }}
      .docInfoInside
        div.text-grey-6.text-capitalize Created Date
        div {{ dateToString(docInfo.createdDate) }}
      .docInfoInside
        div.text-grey-6.text-capitalize Updated Date
        div {{ dateToString(docInfo.updatedDate) }}
</template>

<script>
export default {
  name: 'DocInformation',
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
.colorSeparator
  color:#E5E7EB !important
.label
  color: #9296A0
.column-responsive
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 600px
.cardTailWind
  border-radius: 10px
</style>
