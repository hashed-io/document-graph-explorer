<template lang='pug'>
div
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" :relations="relationsEdges" @edgeData="navigateToEdge")
  .row.q-gutter-md.q-py-md
    // TODO: Modificar el tamaño de letra
    q-btn(
      @click="extendDocument()",
      style="background: #08183c"
      class='text-white'
      size='14px'
    )
      q-icon.animated-icon(
        left
        color="white",
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1")
      | Extend
    q-btn(
      @click="eraseDocument()",
      style="background: #08183c"
      size='16px'
      class='text-white'
    )
      q-icon.animated-icon(
        color="white",
        left
        data-cy="editContracts"
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16")
      | Erase
    q-btn(
      @click="editDocument()",
      style="background: #08183c"
      size='16px'
      class='text-white'
    )
      q-icon.animated-icon(

        color="white",
        left
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01")
      | Edit
</template>

<script>
import { cssClasses } from 'src/mixins/css-class.js'
import DocInformation from '../components/info/DocInformation.vue'
import ListContentGroup from '../components/List/list-content-group.vue'
import Edges from '../components/edges/edges.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [cssClasses, documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges
  },
  watch: {
    $route (to, from) {
      this.loadData()
    }
  },
  data () {
    return {
    }
  },
  methods: {
    navigateToEdge (edgeData) {
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
      this.$router.push({ name: 'eraseDoc', query: { document_id: this.$route.query.document_id } })
    }
  }
}
</script>

<style lang='stylus'>
</style>
