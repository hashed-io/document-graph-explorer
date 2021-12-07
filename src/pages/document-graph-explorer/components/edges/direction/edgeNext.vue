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
            .row.center-block.justify-end
              .col-xs-2.col-sm-4.alignCenterEdge
                template(id='icon')
                  q-icon(
                    color='green'
                    class='center animated-icon'
                    style='width:48px; height: 38px;'
                  )
                  svg(width="48" height="38" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg")
                    circle(cx="9.5" cy="18.5" r="9.5" fill="#BDBDBD")
                    path(d="M39.5 13.5L48 19L39.5 24.5V13.5Z" fill="#BDBDBD")
                    rect(x="20" y="18" width="20" height="2" fill="#BDBDBD")

              .col-xs-8.col-sm-6.alignCenterEdge
                template(id='edgeName')
                  .text-caption.textWrap
                    | {{ item.edgeName }}
                  div
                    q-icon(
                      color='grey-5'
                      class='animated-icon'
                      style="width:47px; height:38px;"
                    )
                      svg(width="47" height="38" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg")
                        path(d="M38.5 14L47 19.5L38.5 25V14Z" fill="#BDBDBD")
                        rect(y="18" width="39" height="2" fill="#BDBDBD")
          .col-xs-6.col-sm-4
            .row.q-col-gutter-md
              .col-xs-6.col-sm-7.col-md-10
                template(id='edgeInfo')
                  div
                    | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                  .text-caption.text-grey-6
                    | {{ item.type }}
                  .text-caption.text-grey-6
                    | {{ dateToString(item.createdDate)}}
              .col-xs-6.col-sm-3.col-md-2
                template(v-if="isEdit" id='delete')
                  div(
                    class='text-capitalize text-bold animated-icon alignCenter'
                    style='color: #DC2626'
                    @click='removeEdge(item)'
                  )
                    | Delete
</template>

<style lang='stylus' scoped>
.alignCenterEdge
  margin-top: 8%
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
