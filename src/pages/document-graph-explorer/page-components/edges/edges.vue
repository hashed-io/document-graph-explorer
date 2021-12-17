<template lang="pug">
div.q-pt-md
  .row.q-pb-md
    .col-8
      .q-py-md.text-h6.text-capitalize(v-if="edges.length > 0")
        | Edges
    .col-4.searchInput
      TInput(
        v-if="edges.length > 0"
        placeholder='Search'
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
    v-if='edges.length > 0'
    bordered
    :style="calculateSizeEdges(edges.length, resultQuery.length)"
  ).cardTailWind
    q-scroll-area(
      :thumb-style="thumbStyle",
      :barStyle="barStyle",
      :style="calculateSizeEdges(edges.length, resultQuery.length)"
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
              @deleteEdge="removeEdge(item,index)"
            )
          EdgePrev(
            v-if="item.direction === 'prev'"
              :item="item"
              :isEdit="isEdit"
              :index="index"
              @navigate="onPrevNode(item)"
          )
  .row.justify-end
    q-icon(
        v-if='isEdit'
        class='text-brand-primary q-py-sm animated-icon',
        size="2rem",
        @click="addEdge()"
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
          path(fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd")
</template>
<style lang="stylus" scoped>
.searchInput
  margin-top: 10px !important
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
  width: 10%
.cardTailWind
  border-radius: 10px
.scroll
  border-radius: 10px
</style>
<script>
import { mapGetters, mapState } from 'vuex'
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
    ...mapState('documentGraph', ['isHashed']),
    resultQuery () {
      if (this.search) {
        const value = this.search
        let filter = this.edges.filter(function (edges) {
          return (
            edges.system_nodeLabel_s.toLowerCase().includes(value.toLowerCase())
          )
        })
        if (filter.length === 0) {
          if (this.isHashed) {
            filter = this.edges.filter(function (edges) {
              return edges.edgeName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.type.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.createdDate.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.docId.indexOf(value) > -1
            })
          } else {
            filter = this.edges.filter(function (edges) {
              return edges.edgeName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.type.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.createdDate.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.hash.indexOf(value) > -1
            })
          }
        }
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
      edgesMutate: this.edges,
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
        right: '2px',
        borderRadius: '12px',
        backgroundColor: '#4338CA',
        width: '4px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '20px',
        backgroundColor: '#FFFF',
        width: '7px',
        opacity: 0.2,
        marginTop: '-3px',
        marginBottom: '-3px',
        paddingTop: '3px',
        paddingBottom: '3px'
      }
    }
  },
  methods: {
    calculateSizeEdges (edgesLength, resultQueryLength) {
      if (edgesLength > 0 && resultQueryLength > 0) {
        let pixels = parseInt(edgesLength) * 75
        if (pixels > 600) {
          return 'height:' + '600' + 'px'
        } else {
          return 'height:' + pixels.toString() + 'px'
        }
      } else {
        return 'height: 0px'
      }
    },
    onPrevNode (edgeData) {
      this.$emit('edgeDataPrev', edgeData)
    },
    onNextNode (edgeData) {
      this.$emit('edgeData', edgeData)
    },
    removeEdge (item, index) {
      // TODO: Information for delete action
      console.log({ item, index })
      this.edges.splice(index, 1)
    },
    addEdge () {
      this.$emit('showModal', true)
    }
  }
}
</script>
