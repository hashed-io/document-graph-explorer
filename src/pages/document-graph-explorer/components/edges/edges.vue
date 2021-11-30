<template lang="pug">
div.q-pt-md
  .row.q-pb-md
    .col-8
      .q-py-md.text-h6.text-capitalize(v-if="edges.length > 0")
        | Edges
    .col-4
      TInput(
        v-if="edges.length > 0"
        label='search'
        v-model='search'
        :dense='true'
        :debounce="750"
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
  q-card(
    bordered
  ).cardTailWind
    q-scroll-area(
      :thumb-style="thumbStyle",
      :barStyle="barStyle",
      :style="(edges.length > 0 && resultQuery.length > 0) ? 'height:600px' : 'height: 0px'"
      id="scroll-area-with-virtual-scroll-1"
    )
      q-virtual-scroll(
        scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
        :items="resultQuery"
        type="list"
      )
        template(v-slot="{item, index}")
          EdgeNext(
              v-if="item.direction === 'next'"
              :item="item"
              :isEdit="isEdit"
              :index="index"
              @navigate="onNextNode(item)"
            )
          EdgePrev(
            v-if="item.direction === 'prev'"
              :item="item"
              :isEdit="isEdit"
              :index="index"
              @navigate="onPrevNode(item)"
          )
</template>
<style lang="stylus">
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
.cardTailWind
  border-radius: 10px
.scroll
  border-radius: 10px
</style>
<script>
import { mapGetters } from 'vuex'
import TInput from '~/components/input/t-input.vue'
import { validation } from '~/mixins/validation'
import EmptyEdges from './empty-component/empty-edges.vue'
import EdgeNext from './direction/edgeNext.vue'
import EdgePrev from './direction/edgePrev.vue'
export default {
  name: 'Edge',
  components: {
    TInput,
    EmptyEdges,
    EdgeNext,
    EdgePrev
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
    }
  },
  mixins: [validation],
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit']),
    resultQuery () {
      if (this.search) {
        const value = this.search
        let filter = this.edges.filter(function (edges) {
          return (
            edges.system_nodeLabel_s.toLowerCase().includes(value.toLowerCase())
          )
        })
        if (filter.length === 0) {
          filter = this.edges.filter(function (edges) {
            return edges.edgeName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            edges.type.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            edges.createdDate.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            edges.docId.indexOf(value) > -1
          })
        }
        console.log('Second Filter', filter)
        return filter
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
    onPrevNode (edgeData) {
      this.$emit('edgeDataPrev', edgeData)
    },
    onNextNode (edgeData) {
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
