<template lang='pug'>
div
  .q-py-md(:class="classes.titleSection")
    | Edges
  q-virtual-scroll(
    v-if="edges.length > 0"
    :items="edges"
    style="max-height: 500px;"
  )
    template(v-slot="{item, index}")
      q-card
          q-card-section(:key="index")
            .row
              .col-5
              .col-1
                q-icon(color="green", size="1.5rem")
                  svg(
                    xmlns="http://www.w3.org/2000/svg",
                    viewbox="0 0 100 100",
                    fill="currentColor"
                  )
                    path(
                      fill-rule="evenodd",
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                      clip-rule="evenodd"
                    )
              .col-6
                .row
                  .col-2
                    div {{ item.creator }}
                    .text-caption.text-grey-6.text-bold ------------->
                  .col-7
                    .text-bold
                      | {{ item.type }}
                    .text-caption.text-grey-6.text-bold
                      | {{ item.docId }}
                  .col-3
                    q-icon.text-black(
                      name="keyboard_double_arrow_right",
                      style="font-size: 2rem",
                      @click="onNextNode(item)"
                    )
                    q-btn(
                      v-if='isEdit'
                      label="remove",
                      unelevated,
                      color="primary",
                      @click="removeEdge(item)"
                    )
    //- q-card-actions
    //-   q-btn(label="New edge", unelevated, color="primary", @click="addEdge()")
</template>

<script>
import { mapGetters } from 'vuex'
import { cssClasses } from '~/mixins/css-class.js'
export default {
  name: 'edges',
  props: {
    /**
     * This array must contain objects with the follow props {
     * direction: String,
     * name: String,
     * label: String,
     * edge: String
     * }
     */
    edges: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  mixins: [cssClasses],
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit'])
  },
  mounted () {
    if (this.getIsEdit) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
  },
  data () {
    return {
      isEdit: false,
      columns: [
        {
          name: 'direction',
          label: 'Direction',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.direction,
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.name,
          sortable: true
        },
        {
          name: 'edge',
          label: 'Edge',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.edge,
          sortable: true
        }
      ]
    }
  },
  methods: {
    onPrevNode (edgeData) {
      this.$emit('edgeData', edgeData)
    },
    onNextNode (edgeData) {
      console.log(edgeData)
      this.$emit('edgeData', edgeData)
    },
    removeEdge (edge, index) {
      alert(JSON.stringify(edge))
    },
    addEdge () {
      this.$emit('showModal', true)
    }
  }
}
</script>

<style>
</style>
