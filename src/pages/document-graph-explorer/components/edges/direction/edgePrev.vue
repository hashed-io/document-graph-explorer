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
                  div
                    | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                  .text-caption.text-grey-6
                    | {{ item.documentType }}
                  .text-caption.text-grey-6
                    | {{ dateToString(item.createdDate)}}
          .col-xs-6.col-sm-3
            .row.center-block.justify-start
              .col-xs-6.col-sm-6
                template(id='edgeName')
                  .text-caption
                    | {{ item.edgeName }}
                  q-icon(
                    color='grey-5'
                    class='animated-icon'
                    style="width:47px; height:38px;"
                  )
                    svg(width="47" height="38" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg")
                      path(d="M38.5 14L47 19.5L38.5 25V14Z" fill="#BDBDBD")
                      rect(y="18" width="39" height="2" fill="#BDBDBD")
              .col-xs-6.col-sm-4
                template(id='icon')
                  q-icon(
                    color='green'
                    class='center animated-icon'
                    style='width:48px; height: 38px;'
                  )
                    svg(width="48" height="38" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg")
                      circle(cx="38.5" cy="18.5" r="9.5" fill="#BDBDBD")
                      path(d="M19.5 13.5L28 19L19.5 24.5V13.5Z" fill="#BDBDBD")
                      rect(y="18" width="20" height="2" fill="#BDBDBD")
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
