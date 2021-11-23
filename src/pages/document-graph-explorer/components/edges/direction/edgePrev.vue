<template lang='pug'>
#EdgeNext
  q-card(
    bordered
    flat
    square
  )
      q-card-section(
        :key="index"
        :class="index % 2 === 0 ? 'cardWhite' : 'cardGrey'"
      )
        .row.justify-end
          .col-xs-6.col-sm-6
            .row.q-col-gutter-xl.justify-end
              .col-xs-4.col-sm-3.q-col-gutter-md
                q-icon.text-black(
                  name="keyboard_double_arrow_left",
                  style="font-size: 2rem",
                  @click="onNextNode(item)"
                ).animated-icon
                q-icon(
                  v-if='isEdit'
                  name='delete'
                  size='sm'
                  @click="removeEdge(item)"
                ).animated-icon
              .col-xs-4.col-sm-7
                .text-bold
                  | {{ item.system_nodeLabel_s !== '' ? item.system_nodeLabel_s : item.docId  }}
                .text-caption.text-grey-6.text-bold
                  | {{ item.documentType }}
                .text-caption.text-grey-6.text-bold
                  | {{ item.createdDate}}
              .col-xs-4.col-sm-2
                .text-caption.text-capitalize
                  | {{ item.edgeName }}
                .text-caption
                  q-icon(
                    name='west'
                    color='grey-5'
                    size='md'
                  ).animated-icon
          .col-xs-0.col-sm-2
            q-icon(
              name="location_on"
              color='red'
              size='sm'
            ).center
          .col-xs-2.col-sm-3
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
</template>

<style lang='stylus'>
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
    }
  }
}
</script>
