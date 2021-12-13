<template lang='pug'>
#EdgeNext
  q-card(
    square
    @click="onNextNode(item)"
  ).tailWind
      q-card-section(
        :key="index"
        :class="index % 2 === 0 ? 'cardWhite' : 'cardGrey'"
      )
        .row.justify-start.q-col-gutter-md
          .col-xs-6.col-sm-4
            .row.q-col-gutter-md
              .col-xs-6.col-sm-3.col-md-2
                template(v-if="isEdit" id='delete')
                  div(
                    class='text-capitalize animated-icon alignCenter'
                    style='color: #DC2626'
                    @click='removeEdge(item)'
                  ) Delete
              .col-xs-6.col-sm-7.col-md-10.alignItems
                template(id='edgeInfo')
                  div
                    | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s.substring(0,40)+'...' : item.docId.substring(0,40)+'...'  }}
                    q-tooltip(
                      content-class='bg-black'
                      transition-show="fade"
                      transition-hide="fade"
                    ) {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                  .text-caption.text-grey-6
                    | {{ item.type+' | ' }}
                    | {{ dateToString(item.createdDate)}}
          .col-xs-6.col-sm-3
            .row.center-block.justify-end
              .col-xs-12.col-sm-8
                template(id='edgeName')
                  .text-caption.textWrap.alignCenterEdge
                    | {{ item.edgeName }}
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
.alignCenterEdge
  margin-top: 4%
.textWrap
  word-break: break-all
.cardWhite
  background: white
  &:hover
    background: #F7F7F7
.cardGrey
  background: #FAFAFA
  &:hover
    background: #F7F7F7
.center-block
  text-align: center
.center
  left:7%
.btnTailwind
  color: #4254E0
  // border-radius: 10px
  // background: #4F46E5
  // height: 2rem
  // color:white
  // width: 3.5rem
.alignItems
  text-align: right
.alignCenter
  margin: auto;
  padding-top: 50%;
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
