<template lang='pug'>
div
  .q-py-md(:class="classes.titleSection")
    | Edges
  q-card
    q-card(v-for="(edge, index) in edges", square, :key="edge.name", flat)
      q-card-section(:key="edge.name")
        .row(v-if="edge.direction === 'prev'")
          .col-5
            .row
              .col-3
                q-btn(
                  label="remove",
                  unelevated,
                  color="primary",
                  @click="removeEdge(edge, index)"
                )
                q-icon.text-black(
                  name="keyboard_double_arrow_left",
                  style="font-size: 2rem",
                  @click="onPrevNode(edge)"
                )
              .col-6
                .text-bold {{ edge.name }}
                q-popup-edit(buttons, v-model="edge.name")
                  q-editor(
                    v-model="edge.name",
                    min-height="5rem",
                    autofocus,
                    @keyup.enter.stop
                  )
                q-popup-edit(buttons, v-model="edge.label")
                  q-editor(
                    v-model="edge.label",
                    min-height="5rem",
                    autofocus,
                    @keyup.enter.stop
                  )
                .text-caption.text-grey-6.text-bold {{ edge.label }}
              .col-3
                div {{ edge.edge }}
                .text-caption.text-grey-6.text-bold ------------->
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
        .row(v-else)
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
                div {{ edge.edge }}
                .text-caption.text-grey-6.text-bold ------------->
              .col-7
                .text-bold
                  | {{ edge.name }}
                .text-caption.text-grey-6.text-bold
                  | {{ edge.label }}
              .col-3
                q-icon.text-black(
                  name="keyboard_double_arrow_right",
                  style="font-size: 2rem",
                  @click="onNextNode(edge)"
                )
                q-btn(
                  label="remove",
                  unelevated,
                  color="primary",
                  @click="removeEdge(edge, index)"
                )
    q-card-actions
      q-btn(label="New edge", unelevated, color="primary", @click="addEdge()")
</template>

<script>
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
  data () {
    return {
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
      let url = 'prev.com'
      window.open(url, '_blank')
    },
    onNextNode (edgeData) {
      let url = 'next.com'
      window.open(url, '_blank')
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
