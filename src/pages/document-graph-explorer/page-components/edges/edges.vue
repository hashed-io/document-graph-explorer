<template lang="pug">
div.q-pt-xs
  .row
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
    v-if="edges.length === 0 && withoutEdges"
    :label="$t('pages.documentExplorer.edges.title')"
    :msg="$t('pages.documentExplorer.edges.extend')"
  )
  EmptyEdges(
    v-if='edges.length === 0 && !withoutEdges'
    :label="$t('pages.documentExplorer.edges.title')"
    :msg="$t('pages.documentExplorer.edges.noEdges')"
    )
  EmptyEdges(
    v-if='edges.length > 0 && resultQuery.length === 0 && !withoutEdges'
    :msg="$t('pages.documentExplorer.edges.search.empty')"
    )
  q-table(
    v-if='edges.length > 0'
    :data="resultQuery"
    hide-header,
    dense
    :columns="columns"
    card-class="bg-grey-1"
    class="cardTailWind"
  )
    template(#body="props")
      q-tr(:props="props")
        EdgeNext(
            v-if="props.row.direction === 'next'"
            :item="props.row"
            :isEdit="isEdit"
            :index="props.rowIndex"
            @navigate="onNextNode(props.row)"
            @deleteEdge="removeEdge(props.row,props.rowIndex)"
          )
        EdgePrev(
          v-if="props.row.direction === 'prev'"
            :item="props.row"
            :isEdit="isEdit"
            :index="props.rowIndex"
            @navigate="onPrevNode(props.row)"
        )
    template(v-slot:pagination="scope")
      q-btn(
          v-if="scope.pagesNumber > 2"
          icon="first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
      )
      q-btn(
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
      )
      q-btn(
          data-cy="nextPage"
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
      )
      q-btn(
          data-cy="lastPage"
          v-if="scope.pagesNumber > 2"
          icon="last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
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
import { ActionsApi } from '~/services'
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
     * docId
     * docId_i
     * hash
     * type [document Type]
     * creator
     * createdDate
     * system_nodeLabel_s
     * edgeName
     * __typename [comes from GraphQL]
     * direction [next or prev]
     *  NOTE: There are difference between next edge object and prev egde object
     * }
     */
    edges: {
      type: Array,
      required: true
    },
    /**
     * Allow identify if edges array is empty because don't contain
     * edges or don't contain because is new document
     */
    withoutEdges: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  mixins: [validation],
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit']),
    ...mapState('documentGraph', ['isHashed', 'document']),
    ...mapState('accounts', ['account']),
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
              edges.hash.indexOf(value) > -1
            })
          } else {
            filter = this.edges.filter(function (edges) {
              return edges.edgeName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.type.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.createdDate.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              edges.docId.indexOf(value) > -1
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
          name: 'edge',
          label: 'Edge',
          align: 'center',
          headerStyle: 'font-weight: bolder;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          classes: '',
          field: (row) => row.direction,
          sortable: true
        }
      ]
    }
  },
  methods: {
    calculateSizeEdges (edgesLength, resultQueryLength) {
      if (edgesLength > 0 && resultQueryLength > 0) {
        let pixels = parseInt(resultQueryLength) * 75
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
      /**
       * This sends the row information to backward navigation
       */
      this.$emit('edgeDataPrev', edgeData)
    },
    onNextNode (edgeData) {
      /**
       * This sends the row information to forward navigation
       */
      this.$emit('edgeData', edgeData)
    },
    async removeEdge (item, index) {
      try {
        let _contractAccount = this.account
        let _api = this.$store.$apiMethods
        let mEosApi = this.$store.$defaultApi
        this.ActionsApi = await new ActionsApi({ eosApi: _api, mEosApi }, _contractAccount)
        let fromNode = this.document.docId
        let toNode = item.docId
        let edgeName = item.edgeName
        console.log({ fromNode, toNode, edgeName })
        await this.ActionsApi.deleteEdge({ fromNode, toNode, edgeName })
        this.edges.splice(index, 1)
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to delete the edge of the node' + error)
      }
    },
    addEdge () {
      /**
       * This change the v-model to show the edge form [EdgesDialog Component]
       */
      this.$emit('showModal', true)
    }
  }
}
</script>
