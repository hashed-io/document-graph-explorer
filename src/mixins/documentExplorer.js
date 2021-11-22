import customRegex from '~/const/customRegex.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export const documentExplorer = {
  async mounted () {
    this.getDocumentInfo()
    let edges = await this.getContentGroup()
    this.getEdges(edges)
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
      edges: [],
      relationsEdges: {}
    }
  },
  methods: {
    ...mapGetters('documentGraph', ['getDocument', 'getCatalog', 'getDocInterface']),
    ...mapActions('documentGraph', ['getDocumentsByDocId', 'getPropsType']),
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit']),
    getDocumentInfo () {
      let selectDocument = this.getDocument()
      if (!selectDocument) {
        this.$router.push({ name: 'listDocs' })
      }
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
      console.log('+++++++++++++++++++++++')
      console.log(props)
      console.log(edges)
      console.log('+++++++++++++++++++++++')
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
      const relationEdgeNameType = {}
      for (const key in QLresponse) {
        if (QLresponse[key]) {
          if (QLresponse[key].length > 0) {
            // console.log(QLresponse[key])
            relationEdgeNameType[QLresponse[key][0].type] = key
            Array.prototype.push.apply(edgesMixed, QLresponse[key])
          }
        }
      }
      this.relationsEdges = relationEdgeNameType
      this.edges = edgesMixed
    }
  }
}
