<template lang='pug'>
q-card(bordered).cardTailWind
  q-card-section
    .label.text-subtitle1.docInfoTitle
      | {{docInfo.name}}
  q-separator(color='grey-3')
  q-card-section
    .row.q-col-gutter-md
      .col-6.docInfoInside
        div.text-subtitle2.text-grey-6.text-uppercase Document ID
        div {{ docInfo.docId }}
      .col-6.docInfoInside
        div.text-subtitle2.text-grey-6.text-uppercase Hash
        div.column-responsive
          | {{ docInfo.hash }}
          q-popup-edit(v-model="docInfo.hash")
            q-input(v-model='docInfo.hash' autogrow dense readonly)
      .col-6.docInfoInside
        div.text-subtitle2.text-grey-6.text-uppercase Owner
        div {{ docInfo.creator }}
      .col-6.docInfoInside
        div.text-subtitle2.text-grey-6.text-uppercase Document Type
        div {{ docInfo.type }}
      .col-6.docInfoInside
        div.text-subtitle2.text-grey-6.text-uppercase Created Date
        div {{ dateToString(docInfo.createdDate) }}
      .col-6.docInfoInside
        div.text-subtitle2.text-grey-6.text-uppercase Updated Date
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
