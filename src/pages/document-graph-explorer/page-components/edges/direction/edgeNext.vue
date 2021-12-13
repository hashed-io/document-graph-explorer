<template lang='pug'>
#EdgeNext
  q-card(
    square
    @click="onNextNode"
  ).tailWind
      q-card-section(
        :key="index"
        :class="index % 2 === 0 ? 'cardWhite' : 'cardGrey'"
      )
        .row.justify-end.q-col-gutter-md
          .col-xs-6.col-sm-3
            .row.center-block.justify-start
              .col-xs-10.col-sm-9.alignCenterEdge
                template(id='edgeName')
                  .text-caption.textWrap
                    | {{ item.edgeName }}
                template(id='icon')
                  q-icon(
                  ).animated-icon
                  svg(width="108" height="38" viewBox="0 0 108 38" fill="none" xmlns="http://www.w3.org/2000/svg")
                    path(d="M98 13.5L106.5 19L98 24.5V13.5Z" fill="#BDBDBD")
                    rect(x="19" y="18" width="82" height="2" fill="#BDBDBD")
                    circle(cx="9.5" cy="18.5" r="9.5" fill="#BDBDBD")

          .col-xs-6.col-sm-4
            .row.q-col-gutter-md
              .col-xs-6.col-sm-7.col-md-10
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
              .col-xs-6.col-sm-3.col-md-2
                template(v-if="isEdit" id='delete')
                  div(
                    class='text-capitalize animated-icon alignCenter'
                    style='color: #DC2626'
                    @click='removeEdge(item)'
                  )
                    | Delete
</template>

<style lang='stylus' scoped>
.alignCenterEdge
  margin-top: 4%
.alignCenter
  margin: auto;
  padding-top: 50%;
.cardWhite
  background: white
  &:hover
    background: #F7F7F7
.cardGrey
  background: #FAFAFA
  &:hover
    background: #F7F7F7
.iconTailwind
  color: #4254E0
.btnTailwind
  border-radius: 10px
  height: 2rem
  color:white
  width: 3.5rem
  background: #4F46E5
.center-block
  text-align: center
.textWrap
  word-break: break-all
</style>
<script>
export default {
  name: 'EdgeNext',
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
    onNextNode () {
      this.$emit('navigate', this.item)
    },
    removeEdge (item) {
      this.$emit('deleteEdge', { edge: item, index: this.index })
    }
  }
}
</script>
