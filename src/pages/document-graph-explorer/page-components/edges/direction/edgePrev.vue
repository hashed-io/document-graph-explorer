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
        .row.justify-start.q-col-gutter-xs
          .col-xs-6.col-sm-4
            .row.q-col-gutter-xs.q-pt-xs.justify-start
              .col-xs-6.col-sm-3.col-md-2
                template(v-if="!isEdit" id='iconPrev')
                  q-icon(style="width: 40px; height:40px" class="cursor-pointer text-brand-primary")
                    svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
                      path(fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd")
              .col-xs-6.col-sm-7.col-md-10
                template(id='edgeInfo')
                  div
                    | {{ showEdgeInfo(item) }}
                    q-tooltip(
                      content-class='bg-black'
                      transition-show="fade"
                      transition-hide="fade"
                    ) {{ showTooltip(item)  }}
                  .text-caption.text-grey-6
                    | {{ item.type+' | ' }}
                    | {{ dateToString(item.createdDate)}}
          .col-xs-6.col-sm-3
            .row.center-block.justify-start
              .col-xs-12.col-sm-8
                .row.q-pl-md(style="top:-10px")
                  .col-7
                    .row
                      template(id='edgeName')
                        .text-caption.textWrap.alignCenterEdge
                          | {{ (item.edgeName.length > 20) ? item.edgeName.substring(0,20)+'...' : item.edgeName  }}
                          q-tooltip(
                            content-class='bg-black'
                            transition-show="fade"
                            transition-hide="fade"
                          ) {{ item.edgeName  }}
                    .row
                      template(id='arrowIcon')
                        q-icon(class="animated-icon" style="width: 24px; height:24px; top:-2px; color: #9e9e9e")
                          svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                            path(fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd")

                  .col-5
                    template(id='icon')
                      q-icon(
                        style="width:25px; height:25px; top:10px; right:5px;"
                        class='animated-icon'
                      )
                        svg(width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg")
                          path(fill-rule="evenodd" clip-rule="evenodd" d="M16.5 32C25.0604 32 32 25.0604 32 16.5C32 7.93959 25.0604 1 16.5 1C7.93959 1 1 7.93959 1 16.5C1 25.0604 7.93959 32 16.5 32ZM16.5 27.8667C22.7776 27.8667 27.8667 22.7776 27.8667 16.5C27.8667 10.2224 22.7776 5.13333 16.5 5.13333C10.2224 5.13333 5.13333 10.2224 5.13333 16.5C5.13333 22.7776 10.2224 27.8667 16.5 27.8667Z" fill="#9e9e9e")

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EdgePrev',
  props: {
    /**
     * This props contain all the information from the component [Edges]
     */
    item: {
      type: Object,
      required: true
    },
    /**
     * This render the edition mode or read mode
     */
    isEdit: {
      type: Boolean,
      required: true,
      default: function () {
        return false
      }
    },
    /**
     * This number comes from the edges array [Edges component]
     */
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState('documentGraph', ['isHashed'])
  },
  methods: {
    showTooltip (item) {
      if (this.isHashed) {
        return item.system_nodeLabel_s !== '' ? item.systemNodeLabel : item.hash
      } else {
        return item.system_nodeLabel_s !== '' ? item.systemNodeLabel : item.docId
      }
    },
    showEdgeInfo (item) {
      let len
      if (this.isHashed) {
        len = item.system_nodeLabel_s !== '' ? item.systemNodeLabel.length : item.hash.length
      } else {
        len = item.system_nodeLabel_s !== '' ? item.systemNodeLabel.length : item.docId.length
      }
      if (item.system_nodeLabel_s !== '' && len > 60) {
        return item.system_nodeLabel_s.substring(0, 60) + '...'
      } else if (item.system_nodeLabel_s === '' && len > 60) {
        if (this.isHashed) {
          return item.hash.substring(0, 60) + '...'
        } else {
          return item.docId.substring(0, 60) + '...'
        }
      } else {
        if (this.isHashed) {
          return item.system_nodeLabel_s !== '' ? item.systemNodeLabel : item.hash
        } else {
          return item.system_nodeLabel_s !== '' ? item.systemNodeLabel : item.docId
        }
      }
    },
    onNextNode (item) {
      /**
       * Parent component [Edges.vue]
       * data to send [item]
       * This action send to parent component all the information to navigate to the previous edge
       */
      this.$emit('navigate', item)
    },
    removeEdge (item) {
      /**
       * This action send the edge data to delete in the parent component [Edges]
       * data to send [item, index]
       */
      this.$emit('deleteEdge', { edge: item, index: this.index })
    }
  }
}
</script>
<style lang='stylus' scoped>
.verticalContent
  border-color: red !important

.alignCenterEdge
  margin-top: 4%
  color: #9e9e9e
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
