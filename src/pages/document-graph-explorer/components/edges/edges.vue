<template lang='pug'>
div.q-pt-md
  .row.q-pb-md
    .col-10
      .q-py-md.text-h6(v-if="edges.length > 0")
        | Edges
    .col-2
      TInput(
        v-if="edges.length > 0"
        label='search'
        v-model='search'
        :dense='true'
        :debounce="500"
      )
  EmptyEdges(
    v-if='edges.length === 0'
    :label="$t('pages.documentExplorer.edges.title')"
    :msg="$t('pages.documentExplorer.edges.noEdges')"
    )
  EmptyEdges(
    v-if='edges.length > 0 && resultQuery.length === 0'
    :msg="$t('pages.documentExplorer.edges.search.empty')"
    )
  q-scroll-area(
    :thumb-style="thumbStyle",
    :barStyle="barStyle",
    :style="(edges.length > 0 && resultQuery.length > 0) ? 'height:300px' : 'height: 0px'"
    id="scroll-area-with-virtual-scroll-1"
  )
    q-virtual-scroll(
      scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
      :items="resultQuery"
      type="list"
    )
      template(v-slot="{item, index}")
        q-card(
          bordered
          flat
        )
            q-card-section(
              :key="index"
              :class="index % 2 === 0 ? 'cardWhite' : 'cardGrey'"
            )
              .row.justify-end
                .col-xs-0.col-sm-5
                .col-xs-2.col-sm-1
                  q-icon(
                    name="location_on"
                    color='green'
                    size='sm'
                  ).center
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
                .col-xs-6.col-sm-6
                  .row.q-col-gutter-xl.justify-end
                    .col-xs-4.col-sm-2
                      .text-caption
                        | {{ getEdgeName(item.type) }}
                      .text-caption
                        q-icon(
                          name='arrow_right_alt'
                          color='grey-5'
                          size='md'
                        )
                    .col-xs-4.col-sm-7
                      .text-bold
                        | {{ item.docId }}
                      .text-caption.text-grey-6.text-bold
                        | {{ item.type }}
                      .text-caption.text-grey-6.text-bold
                        | {{ item.createdDate}}
                    .col-xs-4.col-sm-3
                      q-icon.text-black(
                        name="keyboard_double_arrow_right",
                        style="font-size: 2rem",
                        @click="onNextNode(item)"
                      )
                      q-btn(
                        v-if='isEdit'
                        label="remove",
                        style="background: #08183c; color: white"
                        unelevated,
                        @click="removeEdge(item)"
                      )
    //- q-card-actions
    //-   q-btn(label="New edge", unelevated, color="primary", @click="addEdge()")
</template>
<style lang='stylus'>
.cardWhite
  background: white
  &:hover
    background: #F7F7F7
.cardGrey
  background: #FAFAFA
  &:hover
    background: #F7F7F7
.center
  display: block
  margin: auto
  width: 40%
</style>
<script>
import { mapGetters } from 'vuex'
import { cssClasses } from '~/mixins/css-class.js'
import TInput from '~/components/input/t-input.vue'
import EmptyEdges from './emptyComponent/emptyEdges.vue'
import { validation } from '~/mixins/validation'
export default {
  name: 'edges',
  components: {
    TInput,
    EmptyEdges
  },
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
    },
    relations: {
      type: Object,
      required: true
    }
  },
  mixins: [cssClasses, validation],
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit']),
    resultQuery () {
      if (this.search) {
        const value = this.search.charAt(0).toUpperCase() + this.search.slice(1)
        return this.edges.filter(function (edges) {
          return edges.docId.indexOf(value) > -1 ||
            edges.type.indexOf(value) > -1 ||
            edges.creator.indexOf(value) > -1
            // edges.edgeName.indexOf(value) > -1
        })
      } else {
        return this.edges
      }
    }
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
      search: undefined,
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
      ],
      thumbStyle: {
        right: '5px',
        borderRadius: '16px',
        backgroundColor: '#08183C',
        width: '8px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '14px',
        backgroundColor: '#FFFF',
        width: '14px',
        opacity: 0.2,
        marginTop: '-3px',
        marginBottom: '-3px',
        paddingTop: '3px',
        paddingBottom: '3px'
      }
    }
  },
  methods: {
    getEdgeName (type) {
      return this.relations[type]
    },
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
