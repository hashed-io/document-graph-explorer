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
      unelevated
      no-caps
    )
      .row
        .col-4
          q-icon(
            color="white",
            left
          )
            svg(xmlns="http://www.w3.org/2000/svg" viewBox="-2 0 26 23" fill="currentColor")
              path(fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd")
        .col-8
          div Extend
    q-btn(
      v-if="documentInfo.creator === account"
      @click="eraseDocument()",
      class='text-white btnTailwind'
      unelevated
      no-caps
    )
      .row
        .col-4
          q-icon(
            color="white",
            size='20px'
            left
            data-cy="editContracts"
          )
            svg(xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 23" fill="currentColor")
              path(fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd")
        .col-8
          div Erase
    q-btn(
      v-if="documentInfo.creator === account"
      @click="editDocument()",
      size='12px'
      class='text-white btnTailwind'
      unelevated
      no-caps
    )
      .row
        .col-4
          q-icon(
            color="white",
            left
          )
            svg(xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 23" fill="currentColor")
              path(d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z")
              path(fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd")
        .col-8
          | Edit
    q-dialog(
      v-model='deleteDoc'
    ).eraseDialog
      EraseBox(
        :docTitle="documentInfo.docId"
        :systemNodeLabel="documentInfo.systemNodeLabel"
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
  height: 38px
  width: 108px
  font-size:14px !important
  background: #4F46E5
</style>
