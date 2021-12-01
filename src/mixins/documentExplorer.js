import customRegex from '~/const/customRegex.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export const documentExplorer = {
  async mounted () {
    this.loadData()
  },
  data () {
    return {
      documentInfo: {
        name: undefined,
        docId: undefined,
        hash: undefined,
        creator: undefined,
        type: undefined,
        createdDate: undefined,
        updatedDate: undefined,
        edgeName: undefined
      },
      contentsGroups: {},
      edges: [],
      relationsEdges: {}
    }
  },
  computed: {
    ...mapState('documentGraph', ['stackNavigation'])
  },
  methods: {
    ...mapGetters('documentGraph', ['getDocument', 'getCatalog', 'getDocInterface', 'getTypesWithSystemNode']),
    ...mapActions('documentGraph', ['getDocumentsByDocId', 'getPropsType']),
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit', 'addInformation']),
    getDocumentInfo () {
      this.edges = []
      this.contentsGroups = {}
      let selectDocument = this.getDocument()
      if (!selectDocument) {
        this.$router.push({ name: 'listDocs' })
      }
      this.documentInfo.name = selectDocument.creator
      this.documentInfo.hash = selectDocument.hash
      this.documentInfo.creator = selectDocument.creator
      this.documentInfo.docId = selectDocument.docId
      this.documentInfo.type = selectDocument.type
      this.documentInfo.createdDate = selectDocument.createdDate
      this.documentInfo.updatedDate = selectDocument.createdDate
    },
    async loadData () {
      this.getDocumentInfo()
      let edges = await this.getContentGroup()
      if (edges.length > 0) {
        this.getEdges(edges)
      } else {
        let previousEdge = this.stackNavigation[this.stackNavigation.length - 1]
        if (previousEdge) {
          this.edges = [previousEdge]
        }
      }
    },
    async getContentGroup () {
      let typeSchema = await this.getSchemaOfType()
      let { contentGroups, edges } = this.filterPropsAndEdges(typeSchema)
      let document = await this.retrieveDoc(
        this.documentInfo.docId,
        this.documentInfo.type,
        contentGroups
      )
      console.log({ contentGroups, edges })
      let contentGroup = this.matchingContentGroups(document)
      var res = this.agroupByTitle(contentGroup)
      if (res.hasOwnProperty('system')) {
        const sortContentGroups = this.sortResponseBySystem(res)
        this.contentsGroups = JSON.parse(JSON.stringify(sortContentGroups))
      } else {
        this.contentsGroups = JSON.parse(JSON.stringify(res))
      }
      return edges
    },
    sortResponseBySystem (res) {
      let label = 'system'
      let systemElement = res[label]
      let newObj = {}

      newObj[label] = systemElement
      for (const key in res) {
        if (key !== label) {
          newObj[key] = res[key]
        }
      }
      return newObj
    },
    async getSchemaOfType () {
      // Get from catalog
      // let _props = this.getCatalog().get(this.documentInfo.documentType)
      // Get by Query
      let typeSchema = await this.getPropsType({
        type: this.documentInfo.type
      })
      return typeSchema['__type'].fields
    },
    filterPropsAndEdges (typeSchema) {
      let contentGroups = ''
      let edges = []
      typeSchema.forEach(element => {
        let type = element.type.kind
        if (type !== 'LIST' && type !== 'OBJECT') {
          contentGroups += element.name.toString() + '\n'
        } else if (!element.name.toLowerCase().includes('aggregate') && type !== 'OBJECT') {
          edges.push({ edge: element.name, direction: 'next', type: 'LIST', typeDoc: element.type.ofType.ofType.name })
        } else if (!element.name.toLowerCase().includes('aggregate') && type === 'OBJECT') {
          edges.push({ edge: element.name, direction: 'next', type: 'LIST', typeDoc: element.type.name })
        }
      })
      return { contentGroups, edges }
    },
    async retrieveDoc (docId, docType, contentGroups) {
      const response = await this.getDocumentsByDocId({
        docID: docId,
        props: contentGroups,
        type: docType
      })
      return response
    },
    matchingContentGroups (document) {
      let queryLabel = 'query' + this.documentInfo.type
      var contentGroup = []
      for (const key in document[queryLabel][0]) {
        var regexContentGroup = new RegExp(customRegex.ISCONTENTGROUP)
        if (regexContentGroup.test(key.toString())) {
          var words = key.split('_')
          if (key === 'system_nodeLabel_s' && this.stackNavigation.length > 0) {
            this.addInformation({
              label: 'system_nodeLabel_s',
              value: document[queryLabel][0][key]
            })
            this.addInformation({
              label: 'direction',
              value: 'prev'
            })
          }
          contentGroup.push(
            {
              key: words[1],
              value: document[queryLabel][0][key],
              dataType: words[2],
              title: words[0]
            }
          )
        }
      }
      return contentGroup
    },
    agroupByTitle (contentGroup) {
      const groupBy = (arr, key) => {
        const initialValue = {}
        return arr.reduce((acc, cval) => {
          const myAttribute = cval[key]
          acc[myAttribute] = [...(acc[myAttribute] || []), cval]
          return acc
        }, initialValue)
      }
      return groupBy(contentGroup, 'title')
    },
    async getEdges (edges) {
      this.edges = []
      let query = this.makeQueryForEdgeInfo(edges)
      let responseEdges = await this.retrieveQuery(query)
      this.edges = this.processEdges(responseEdges)
    },
    makeQueryForEdgeInfo (edges) {
      var query = ''
      var docInterface = this.getDocInterface()
      edges.map((element) => {
        let _props = this.getCatalog().get(element.typeDoc)
        const found = _props.find(element => element.name === 'system_nodeLabel_s')
        if (element.type === 'LIST' && element.edge !== 'vote') {
          if (found) {
            query += `${element.edge}{
              ${docInterface}
              ... on ${element.typeDoc}{
                system_nodeLabel_s
              }
          }\n`
          } else {
            query += `${element.edge}{${docInterface}}\n`
          }
        }
      })
      return query
    },
    async retrieveQuery (query) {
      const responseEdges = await this.getDocumentsByDocId({
        docID: this.documentInfo.docId,
        props: query,
        type: this.documentInfo.type,
        docInterface: false
      })
      return responseEdges
    },
    processEdges (responseEdges) {
      let queryLabel = 'query' + this.documentInfo.type
      var edgesMixed = []
      if (this.stackNavigation.length > 0) {
        let previousEdge = this.stackNavigation[this.stackNavigation.length - 1]
        edgesMixed.push(previousEdge)
      }
      let QLresponse = responseEdges[queryLabel][0]
      delete QLresponse['__typename']
      console.log(QLresponse)
      for (const key in QLresponse) {
        if (QLresponse[key]) {
          if (QLresponse[key].length > 0) {
            QLresponse[key].forEach(element => {
              if (!element.hasOwnProperty('system_nodeLabel_s')) {
                element['system_nodeLabel_s'] = ''
              }
              element['edgeName'] = key
              element['direction'] = 'next'
            })
            Array.prototype.push.apply(edgesMixed, QLresponse[key])
          } else if (typeof (QLresponse[key]) === 'object' && !QLresponse[key].hasOwnProperty('length')) {
            if (!QLresponse[key].hasOwnProperty('system_nodeLabel_s')) {
              QLresponse[key]['system_nodeLabel_s'] = ''
            }
            QLresponse[key]['edgeName'] = key
            QLresponse[key]['direction'] = 'next'
            Array.prototype.push.apply(edgesMixed, [QLresponse[key]])
          }
        }
      }
      return edgesMixed
    }
  }
}
