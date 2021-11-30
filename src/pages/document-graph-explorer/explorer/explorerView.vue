<template lang='pug'>
div
  div.text-h6.q-pb-md
    | {{$t('pages.documentExplorer.explorer.title')}}
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" :relations="relationsEdges" @edgeData="navigateToEdge" @edgeDataPrev="navigateToEdgePrev")
  .q-py-md.row.q-gutter-md
    q-btn(
      v-if="documentInfo.creator === account"
      @click="extendDocument()",
      class='text-white btnTailwind'
      size='12px'
      unelevated
      no-caps
    )
      q-icon(
        left
        color="white",
      )
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1")
      div Extend
    q-btn(
      v-if="documentInfo.creator === account"
      @click="eraseDocument()",
      size='12px'
      class='text-white btnTailwind'
      unelevated
      no-caps
    )
      q-icon(
        color="white",
        left
        data-cy="editContracts"
      )
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16")
      div Erase
    q-btn(
      v-if="documentInfo.creator === account"
      @click="editDocument()",
      size='12px'
      class='text-white btnTailwind'
      unelevated
      no-caps
    )
      q-icon(
        color="white",
        left
      )
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01")
      | Edit
    q-dialog(
      v-model='deleteDoc'
    )
      EraseBox(
        :docTitle="documentInfo.docId"
      )
</template>

<script>
import DocInformation from '../components/info/DocInformation.vue'
import ListContentGroup from '../components/List/list-content-group.vue'
import Edges from '../components/edges/edges.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
import { mapGetters, mapMutations } from 'vuex'
import EraseBox from '../components/erase/eraseBox.vue'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EraseBox
  },
  watch: {
    $route (to, from) {
      this.loadData()
    }
  },
  data () {
    return {
      deleteDoc: false
    }
  },
  computed: {
    ...mapGetters('accounts', ['account'])
  },
  methods: {
    ...mapMutations('documentGraph', ['pushDocNavigation', 'popDocNavigation', 'addInformation']),
    navigateToEdge (edgeData) {
      this.setDocument(edgeData)
      this.pushDocNavigation(this.documentInfo)
      this.addInformation({
        label: 'edgeName',
        value: edgeData.edgeName
      })
      this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.docId } })
    },
    navigateToEdgePrev (edgeData) {
      this.popDocNavigation()
      this.setDocument(edgeData)
      this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.docId } })
    },
    extendDocument () {
      this.$router.push({ name: 'extendDoc', query: { document_id: this.$route.query.document_id } })
    },
    editDocument () {
      this.setIsEdit(true)
      this.$router.push({ name: 'editDoc', query: { document_id: this.$route.query.document_id } })
    },
    eraseDocument () {
      this.deleteDoc = true
      // this.$router.push({ name: 'eraseDoc', query: { document_id: this.$route.query.document_id } })
    }
  }
}
</script>

<style lang='stylus' scoped>
.btnTailwind
  border-radius: 10px
  height: 2rem
  width: 7rem
  background: #4F46E5
</style>
