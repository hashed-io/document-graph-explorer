<template lang='pug'>
div
  div(:class='classes.titleSection').q-py-md
    | Edges
  q-card(v-for='(edge,index) in edges' square :key='edge.name')
    q-card-section(:key='edge.name')
      .row(v-if="edge.direction === 'prev'")
        .col-5
          .row
            .col-1
              q-icon(name="keyboard_double_arrow_left" class="text-black" style="font-size: 2rem;")
            .col-8
              div {{edge.name}}
            .col-3
              div {{edge.label}}
              div ------------->
        .col-2
          q-icon(color="green" size="2rem")
            svg(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 100 100' fill='currentColor')
              path(fill-rule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clip-rule='evenodd')
      .row(v-else)
        .col-5
        .col-2
          q-icon(color="green" size="2rem")
            svg(xmlns='http://www.w3.org/2000/svg' viewbox='0 0 100 100' fill='currentColor')
              path(fill-rule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clip-rule='evenodd')
        .col-5
          .row
            .col-2
              div {{edge.label}}
              div ------------->
            .col-9
              | {{edge.name}}
            .col-1
              q-icon(name="keyboard_double_arrow_right" class="text-black" style="font-size: 2rem;")
</template>

<script>
import { cssClasses } from 'src/mixins/css-class.js'
export default {
  name: 'ListContentsGroup',
  props: {
    edges: {
      type: Array,
      required: true
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
          field: row => row.direction,
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'edge',
          label: 'Edge',
          align: 'left',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: row => row.edge,
          sortable: true
        }
      ]
    }
  }
}
</script>

<style>

</style>
