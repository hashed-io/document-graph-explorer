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
        .row.justify-end
          .col-xs-0.col-sm-2
          .col-xs-2.col-sm-1
            q-icon(
              name="location_on"
              size='sm'
              color='green'
            ).center.animated-icon
            //- q-icon(color="green", size="1.5rem").center
            //-   svg(
            //-     xmlns="http://www.w3.org/2000/svg",
            //-     viewbox="0 0 100 100",
            //-     fill="currentColor"
            //-   )
            //-     path(
            //-       fill-rule="evenodd",
            //-       d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
            //-       clip-rule="evenodd"
            //-     )
          .col-xs-6.col-sm-8
            .row.q-col-gutter-xl.justify-end
              .col-xs-4.col-sm-3
                .text-caption.text-capitalize
                  | {{ item.edgeName }}
                .text-caption
                  q-icon(
                    name='east'
                    color='grey-5'
                    size='md'
                  ).animated-icon
              .col-xs-4.col-sm-7
                .text-capitalize
                  | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                .text-caption.text-grey-6
                  | {{ item.type }}
                .text-caption.text-grey-6
                  | {{ dateToString(item.createdDate)}}
              .col-xs-4.col-sm-2.q-col-gutter-md
                q-icon(
                  v-if='isEdit'
                  name='delete'
                  size='sm'
                  @click="removeEdge(item)"
                ).animated-icon.iconTailwind
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
    }
  }
}
</script>
