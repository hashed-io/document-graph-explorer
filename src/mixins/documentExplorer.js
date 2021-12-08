import customRegex from '~/const/customRegex.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import ApolloClient from 'apollo-boost'
export const documentExplorer = {
  async mounted () {
    let queryParams = this.$route.query
    if (queryParams.hasOwnProperty('endpoint')) {
      this.endpoint = queryParams.endpoint
    }
    if ((queryParams.hasOwnProperty('document_id') || queryParams.hasOwnProperty('hash')) && this.document === undefined) {
      await this.getDocInterface()
      const docInterface = this.documentInterface
      const documentID = (queryParams.hasOwnProperty('document_id')) ? queryParams.document_id : queryParams.hash
      const response = await this.getDocumentsByDocId({
        byElement: documentID,
        type: 'Document',
        props: '',
        docInterface: docInterface,
        isHashed: !(queryParams.hasOwnProperty('document_id'))
      })
      this.setDocument(response.queryDocument[0])
      this.setIsEdit(false)
      this.loadData()
    } else if (this.$route.query.hasOwnProperty('contract') && this.document === undefined) {
      this.setContractInfo({ contract: queryParams.contract })
    }
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
        edgeName: undefined,
        systemNodeLabel: undefined
      },
      endpoint: undefined,
      contentsGroups: {},
      edges: [],
      relationsEdges: {}
    }
  },
  computed: {
    ...mapState('documentGraph', ['stackNavigation', 'isHashed', 'documentInterface', 'document'])
  },
  methods: {
    ...mapGetters('documentGraph', ['getDocument', 'getCatalog', 'getTypesWithSystemNode']),
    ...mapActions('documentGraph', ['getDocumentsByDocId', 'getPropsType', 'setLocalStorage', 'getLocalStorage', 'changeEndpoint']),
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit', 'addInformation', 'setDocInterface', 'setIsHashed']),
    async getDocInterface () {
      let docInterface = await this.getPropsType({
        type: 'Document'
      })
      let interfaceString = ''
      let flag
      docInterface['__type'].fields.forEach(element => {
        if (element.name === 'docId') {
          flag = 1
        }
        interfaceString += element.name + '\n'
      })
      if (!flag) {
        this.setIsHashed(true)
      } else {
        this.setIsHashed(false)
      }
      this.setDocInterface(interfaceString)
      await this.setLocalStorage({
        key: 'documentInterface',
        value: interfaceString
      })
    },
    async loadFromEndpoint () {
      try {
        this.modifyApolloEndpoint()
        this.setLocalStorage({ key: 'apollo-endpoint', value: this.endpoint })
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to retrieve the documents. Loading from previous endpoint')
        let previousEndpoint = this.getLocalStorage({ key: 'apollo-endpoint' })
        await this.modifyApolloEndpoint(previousEndpoint)
      }
    },
    async modifyApolloEndpoint (localStorage) {
      let endpoint = this.endpoint
      if (localStorage) {
        endpoint = localStorage
      }
      const client = new ApolloClient({
        uri: endpoint
      })
      await this.changeEndpoint({ client })
    },
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
      if (selectDocument.hasOwnProperty('docId')) {
        this.documentInfo.docId = selectDocument.docId
      }
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
      let byElement = this.documentInfo.docId
      if (this.isHashed) {
        byElement = this.documentInfo.hash
      }
      let document = await this.retrieveDoc(
        byElement,
        this.documentInfo.type,
        contentGroups,
        this.isHashed
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
      this.documentInfo.systemNodeLabel = res[label][0].value
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
    async retrieveDoc (byElement, docType, contentGroups, isHashed) {
      const response = await this.getDocumentsByDocId({
        byElement: byElement,
        props: contentGroups,
        type: docType,
        isHashed: isHashed
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
      let query = await this.makeQueryForEdgeInfo(edges)
      let responseEdges = await this.retrieveQuery(query)
      this.edges = this.processEdges(responseEdges)
    },
    async makeQueryForEdgeInfo (edges) {
      var query = ''
      var docInterface = this.documentInterface
      for (const element of edges) {
        let _props = await this.getPropsType({
          type: element.typeDoc
        })
        _props = await _props['__type']['fields']
        console.log(_props)
        const found = _props.find(element => element.name === 'system_nodeLabel_s')
        if (element.type === 'LIST' && element.edge !== 'vote' && element.edge !== 'passedprops') {
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
      }
      return query
    },
    async retrieveQuery (query) {
      let byElement = this.documentInfo.docId
      if (this.isHashed) {
        byElement = this.documentInfo.hash
      }
      let _isHashed = this.isHashed
      const responseEdges = await this.getDocumentsByDocId({
        byElement: byElement,
        props: query,
        type: this.documentInfo.type,
        isHashed: _isHashed,
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
