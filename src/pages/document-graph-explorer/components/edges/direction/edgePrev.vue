<template lang='pug'>
#EdgeNext
  q-card(
    bordered
    flat
    square
    @click="onNextNode(item)"
  )
      q-card-section(
        :key="index"
        :class="index % 2 === 0 ? 'cardWhite' : 'cardGrey'"
      )
        .row.justify-start.q-col-gutter-md
          .col-xs-6.col-sm-4
            .row.q-col-gutter-md
              .col-xs-6.col-sm-3.col-md-1
                template(v-if="isEdit" id='delete')
                  q-btn(
                    size='12px'
                    label='Delete'
                    unelevated
                    align='around'
                    no-caps
                    @click='removeEdge(item)'
                  ).btnTailwind
              .col-xs-6.col-sm-7.col-md-11.alignItems
                template(id='edgeInfo')
                  .text-capitalize
                    | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                  .text-caption.text-grey-6
                    | {{ item.documentType }}
                  .text-caption.text-grey-6
                    | {{ dateToString(item.createdDate)}}
          .col-xs-6.col-sm-3
            .row.center-block.justify-start
              .col-xs-6.col-sm-6
                template(id='edgeName')
                  .text-caption.text-capitalize
                    | {{ item.edgeName }}
                q-icon(
                  name='east'
                  color='grey-5'
                  size='md'
                ).animated-icon.text-caption
              .col-xs-6.col-sm-4
                template(id='icon')
                  q-icon(
                    name="location_on"
                    color='red'
                    size='sm'
                  ).center.animated-icon

</template>

<style lang='stylus' scoped>
.center-block
  text-align: center
.center
  left:5%
.btnTailwind
  border-radius: 10px
  background: #4F46E5
  height: 2rem
  color:white
  width: 3.5rem
.alignItems
  text-align: right
</style>
<script>
export default {
  name: 'EdgePrev',
  props: {
    item: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true,
      default: function () {
        return false
      }
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    onNextNode (item) {
      this.$emit('navigate', item)
    },
    removeEdge (item) {
      this.$emit('deleteEdge', { edge: item, index: this.index })
    }
  }
}
</script>
