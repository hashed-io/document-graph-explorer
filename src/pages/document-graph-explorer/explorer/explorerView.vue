<template lang='pug'>
div
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" @edgeData="navigateToEdge")
  .row.q-gutter-md.q-py-md
    q-btn(
      @click="extendDocument()",
      color='primary'
    )
      q-icon.animated-icon(
        size="xs",
        left
        color="white",
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1")
      | Extend
    q-btn(
      @click="eraseDocument()",
      color='primary'
    )
      q-icon.animated-icon(
        v-ripple,
        size="sm",
        color="white",
        data-cy="editContracts"
      )
        svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16")
      | Erase
    q-btn(
      @click="editDocument()",
      color='primary'
    )
      q-icon.animated-icon(
        size="sm",
        color="white",
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import customRegex from '~/const/customRegex.js'
export default {
  name: 'DocumentExplorer',
  mixins: [cssClasses],
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
      documentInfo: {
        name: undefined,
        docID: undefined,
        hash: undefined,
        owner: undefined,
        documentType: undefined,
        createdDate: undefined,
        updatedDate: undefined
      },
      contentsGroups: {},
      edges: []
    }
  },
  async mounted () {
    this.getDocumentInfo()
    let edges = await this.getContentGroup()
    this.getEdges(edges)
  },
  methods: {
    ...mapGetters('documentGraph', ['getDocument', 'getCatalog', 'getDocInterface']),
    ...mapActions('documentGraph', ['getDocumentsByDocId', 'getPropsType']),
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit']),
    getDocumentInfo () {
      let selectDocument = this.getDocument()
      this.documentInfo.name = selectDocument.creator
      this.documentInfo.docID = selectDocument.docId
      this.documentInfo.hash = selectDocument.hash
      this.documentInfo.owner = selectDocument.creator
      this.documentInfo.documentType = selectDocument.type
      this.documentInfo.createdDate = selectDocument.createdDate
      this.documentInfo.updatedDate = selectDocument.createdDate
    },
    async loadData () {
      this.getDocumentInfo()
      let edges = await this.getContentGroup()
      this.getEdges(edges)
    },
    async getContentGroup () {
      let _props = this.getCatalog().get(this.documentInfo.documentType)
      let props = ''
      let edges = []
      _props.forEach(element => {
        let type = element.type.kind
        if (type !== 'LIST' && type !== 'OBJECT') {
          props += element.name.toString() + '\n'
        } else if (!element.name.toLowerCase().includes('aggregate')) {
          edges.push({ edge: element.name, direction: 'next', type: 'LIST' })
        }
      })
      const response = await this.getDocumentsByDocId({
        docID: this.documentInfo.docID,
        props: props,
        type: this.documentInfo.documentType
      })
      let queryLabel = 'query' + this.documentInfo.documentType
      var contentGroup = []
      for (const key in response[queryLabel][0]) {
        var regexContentGroup = new RegExp(customRegex.ISCONTENTGROUP)
        if (regexContentGroup.test(key.toString())) {
          var words = key.split('_')
          contentGroup.push(
            {
              key: words[1],
              value: response[queryLabel][0][key],
              dataType: words[2],
              title: words[0]
            }
          )
        }
      }
      const groupBy = (arr, key) => {
        const initialValue = {}
        return arr.reduce((acc, cval) => {
          const myAttribute = cval[key]
          acc[myAttribute] = [...(acc[myAttribute] || []), cval]
          return acc
        }, initialValue)
      }
      const res = groupBy(contentGroup, 'title')
      this.contentsGroups = JSON.parse(JSON.stringify(res))
      return edges
    },
    async getEdges (edges) {
      var query = ''
      var docInterface = this.getDocInterface()
      let count = 0
      // Filter [Aggregate] Only List Element
      edges.map((element) => {
        if (element.type === 'LIST' && count > 2 && element.edge !== 'vote') {
          query += `${element.edge}{${docInterface}}\n`
        }
        count++
      })

      const responseEdges = await this.getDocumentsByDocId({
        docID: this.documentInfo.docID,
        props: query,
        type: this.documentInfo.documentType,
        docInterface: false
      })
      let queryLabel = 'query' + this.documentInfo.documentType
      var edgesMixed = []
      let QLresponse = responseEdges[queryLabel][0]
      delete QLresponse['__typename']
      for (const key in QLresponse) {
        if (QLresponse[key]) {
          if (QLresponse[key].length > 0) {
            Array.prototype.push.apply(edgesMixed, QLresponse[key])
          }
        }
      }
      this.edges = edgesMixed
    },
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

<style lang='styl'>
</style>
