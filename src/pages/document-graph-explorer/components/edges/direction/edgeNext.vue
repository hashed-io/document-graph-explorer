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
              .col-xs-2.col-sm-4
                template(id='icon')
                  q-icon(
                    name="location_on"
                    size='sm'
                    color='green'
                    class='center animated-icon'
                  )
              .col-xs-8.col-sm-6
                template(id='edgeName')
                  .text-caption.text-capitalize.textWrap
                    | {{ item.edgeName }}
                  .text-caption
                    q-icon(
                      name='east'
                      color='grey-5'
                      size='md'
                    ).animated-icon
          .col-xs-6.col-sm-4
            .row.q-col-gutter-md
              .col-xs-6.col-sm-7.col-md-10
                template(id='edgeInfo')
                  .text-capitalize
                    | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                  .text-caption.text-grey-6
                    | {{ item.type }}
                  .text-caption.text-grey-6
                    | {{ dateToString(item.createdDate)}}
              .col-xs-6.col-sm-3.col-md-2
                template(v-if="isEdit" id='delete')
                  q-btn(
                    size='12px'
                    label='Delete'
                    class='btnTailwind'
                    unelevated
                    align='around'
                    no-caps
                    @click='removeEdge(item)'
                  )

</template>

<style lang='stylus' scoped>
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
