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
        .row.justify-end.q-col-gutter-xs
          .col-xs-6.col-sm-3
            .row.center-block.justify-start
              .col-xs-10.col-sm-9
                .row
                  .col-6
                    template(id='icon')
                      q-icon(
                        style="width:25px; height:25px; top:10px;"
                        class='animated-icon'
                      )
                        svg(width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg")
                          path(fill-rule="evenodd" clip-rule="evenodd" d="M16.5 32C25.0604 32 32 25.0604 32 16.5C32 7.93959 25.0604 1 16.5 1C7.93959 1 1 7.93959 1 16.5C1 25.0604 7.93959 32 16.5 32ZM16.5 27.8667C22.7776 27.8667 27.8667 22.7776 27.8667 16.5C27.8667 10.2224 22.7776 5.13333 16.5 5.13333C10.2224 5.13333 5.13333 10.2224 5.13333 16.5C5.13333 22.7776 10.2224 27.8667 16.5 27.8667Z" fill="#9e9e9e")
                  .col-6
                    .row
                      template(id='edgeName')
                        .text-caption.textWrap
                          | {{ (item.edgeName.length > 10) ? item.edgeName.substring(0,10)+'...' : item.edgeName  }}
                          q-tooltip(
                            content-class='bg-black'
                            transition-show="fade"
                            transition-hide="fade"
                          ) {{ item.edgeName }}
                    .row
                      template(id='arrowIcon')
                        q-icon(class="animated-icon" style="width: 24px; height:24px; color:#9e9e9e")
                          svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                            path(fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd")

          .col-xs-6.col-sm-4
            .row
              .col-xs-6.col-sm-7.col-md-10
                template(id='edgeInfo')
                  div
                    | {{showEdgeInfo(item)}}
                    q-tooltip(
                      content-class='bg-black'
                      transition-show="fade"
                      transition-hide="fade"
                    ) {{ showTooltip(item) }}
                  .text-caption.text-grey-6
                    | {{ item.type+' | ' }}
                    | {{ dateToString(item.createdDate)}}
              .col-xs-6.col-sm-3.col-md-2
                template(v-if="!isEdit" id='iconNext')
                  q-icon(style="width: 40px; height:40px" class="cursor-pointer text-brand-primary")
                    svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                      path(fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd")
                      path(fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd")
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
  padding-left: 20%;
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
  color:#9e9e9e
</style>
<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('documentGraph', ['isHashed'])
  },
  methods: {
    showTooltip (item) {
      if (this.isHashed) {
        return item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.hash
      } else {
        return item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId
      }
    },
    showEdgeInfo (item) {
      let len
      if (this.isHashed) {
        len = item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s.length : item.hash.length
      } else {
        len = item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s.length : item.docId.length
      }
      if (item.system_nodeLabel_s !== '' && len > 60) {
        return item.system_nodeLabel_s.substring(0, 60) + '...'
      } else if (item.system_nodeLabel_s === '' && len > 60) {
        if (this.isHashed) {
          return item.hash.substring(0, 30) + '...'
        } else {
          return item.docId.substring(0, 30) + '...'
        }
      } else {
        if (this.isHashed) {
          return item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.hash
        } else {
          return item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId
        }
      }
    },
    onNextNode () {
      this.$emit('navigate', this.item)
    },
    removeEdge (item) {
      this.$emit('deleteEdge', { edge: item, index: this.index })
    }
  }
}
</script>
