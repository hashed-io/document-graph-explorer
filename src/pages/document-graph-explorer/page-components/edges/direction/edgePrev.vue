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
                template(id='iconPrev')
                  q-icon(style="width: 20px; height:20px" class="cursor-pointer")
                    svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
                      path(fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd")
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
            .row.center-block.justify-start
              .col-xs-12.col-sm-8
                .row
                  .col-7
                    template(id='edgeName')
                      .text-caption.textWrap.alignCenterEdge
                        | {{ item.edgeName }}
                    template(id='arrowIcon')
                      q-icon(class="animated-icon" style="width: 24px; height:24px; right:15px")
                        svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                          path(fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd")

                  .col-5
                    template(id='icon')
                      q-icon(
                        style="width:34px; height:34px;"
                        class='animated-icon'
                      )
                        svg(width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg")
                          path(fill-rule="evenodd" clip-rule="evenodd" d="M16.5 32C25.0604 32 32 25.0604 32 16.5C32 7.93959 25.0604 1 16.5 1C7.93959 1 1 7.93959 1 16.5C1 25.0604 7.93959 32 16.5 32ZM16.5 27.8667C22.7776 27.8667 27.8667 22.7776 27.8667 16.5C27.8667 10.2224 22.7776 5.13333 16.5 5.13333C10.2224 5.13333 5.13333 10.2224 5.13333 16.5C5.13333 22.7776 10.2224 27.8667 16.5 27.8667Z" fill="#7F7F7F")

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
