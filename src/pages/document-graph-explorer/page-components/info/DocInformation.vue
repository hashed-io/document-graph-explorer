<template lang='pug'>
div
  div.text-h6.q-pb-md {{title}}
  q-card(bordered class='q-pt-md cardTailWind')
    q-card-section
      div.text-capitalize.documentHeader Header
    q-separator.colorSeparator
    q-card-section
      .row.q-gutter-lg.justify-between
        .docInfoInside(v-if='docInfo.docId')
          div.headerTitle.text-uppercase ID
          div.headerField.q-pt-sm {{ docInfo.docId }}
        .docInfoInside.column-responsive(v-if="docInfo.hash")
          div.headerTitle.text-uppercase Hash
          div.headerField.q-pt-sm {{ docInfo.hash }}
        .docInfoInside
          div.headerTitle.text-uppercase Owner
          div.headerField.q-pt-sm {{ docInfo.creator }}
        .docInfoInside
          div.headerTitle.text-uppercase Type
          div.headerField.q-pt-sm {{ docInfo.type }}
        .docInfoInside
          div.headerTitle.text-uppercase Created Date
          div.headerField.q-pt-sm {{ dateToString(docInfo.createdDate) }}
        .docInfoInside
          div.headerTitle.text-uppercase Updated Date
          div.headerField.q-pt-sm {{ dateToString(docInfo.updatedDate) }}
</template>

<script>
export default {
  name: 'DocInformation',
  props: {
    /**
     * This props requires the follow structure: {
     * name [creator]
     * docId [id]
     * hash
     * creator [creator]
     * type [Doc type]
     * createdDate
     * updatedDate
     * }
     */
    docInfo: {
      type: Object,
      required: true
    },
    /**
     * This is the title of the page
     */
    title: {
      type: String,
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
.header
  background: #FAFAFA
.column-responsive
  word-break: break-all

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
