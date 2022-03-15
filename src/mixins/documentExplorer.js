import customRegex from '~/const/customRegex.js'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { ActionsApi } from '~/services'
import ApolloClient from 'apollo-boost'
export const documentExplorer = {
  async mounted () {
    let queryParams = this.$route.query
    if (queryParams.hasOwnProperty('endpoint')) {
      this.endpoint = queryParams.endpoint
      this.setLocalStorage({ key: 'apollo-endpoint', value: this.endpoint })
      this.setEndpoint(queryParams.endpoint)
      await this.loadFromEndpoint()
    }
    await this.getContractInfo()
    if ((queryParams.hasOwnProperty('document_id') || queryParams.hasOwnProperty('hash')) && this.document === undefined) {
      await this.getDocInterface()
      const docInterface = this.documentInterface
      const documentID = (queryParams.hasOwnProperty('document_id')) ? queryParams.document_id : queryParams.hash
      const response = await this.getDocumentsByDocId({
        byElement: documentID,
        type: 'Document',
        props: '',
        docInterface: docInterface,
        isHashed: this.isHashed
      })
      this.setDocument(response.queryDocument[0])
      this.setIsEdit(false)
      this.loadData()
    } else if (this.$route.query.hasOwnProperty('contract') && this.document === undefined) {
      this.setContractInfo({ contract: queryParams.contract })
    } else {
      await this.loadData()
    }
  },
  beforeMount () {
    this.loading = true
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
      certificates: [],
      showCertificates: false,
      ActionsApi: undefined,
      loading: false,
      endpoint: undefined,
      contentsGroups: {},
      edges: []
    }
  },
  computed: {
    ...mapState('documentGraph', ['stackNavigation', 'isHashed', 'documentInterface', 'document']),
    ...mapState('documentGraph', ['contractInfo']),
    ...mapState('accounts', 'account')
  },
  methods: {
    ...mapGetters('documentGraph', ['getDocument', 'getCatalog', 'getTypesWithSystemNode']),
    ...mapActions('documentGraph', ['getContractInformation', 'getDocumentsByDocId', 'getPropsType', 'setLocalStorage', 'getLocalStorage', 'changeEndpoint', 'getCertificate']),
    ...mapMutations('documentGraph', ['setContractInfo', 'setDocument', 'setIsEdit', 'addInformation', 'setDocInterface', 'setIsHashed', 'setEndpoint']),
    /**
     *
     * @returns The data is in documentExplorer. this.actionsApi is the instance
     */
    async newInstance () {
      if (this.ActionsApi) {
        return
      }
      var _contractAccount
      if (typeof (this.contractInfo) === 'object') {
        _contractAccount = this.contractInfo.contract
      } else {
        _contractAccount = this.account
      }
      let _api = this.$store.$apiMethods
      let mEosApi = this.$store.$defaultApi
      this.ActionsApi = await new ActionsApi({ eosApi: _api, mEosApi }, _contractAccount)
    },
    async getContractInfo () {
      let contractInfo = await this.getContractInformation()
      if (contractInfo) {
        this.setContractInfo(contractInfo.queryDoccacheConfig[0])
      } else {
        this.setContractInfo('Default contract information')
      }
    },
    async getDocInterface () {
      let docInterface = await this.getPropsType({
        type: 'Document'
      })
      let interfaceString = ''
      let flag = 1
      docInterface['__type'].fields.forEach(element => {
        if (element.name === 'hash') {
          flag = 0
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
        this.setLocalStorage({ key: 'apollo-endpoint', value: this.endpoint })
        this.modifyApolloEndpoint()
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
      if (this.$router.currentRoute.name !== 'createView') {
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
        this.documentInfo.createdDate = selectDocument.updatedDate
        this.documentInfo.updatedDate = selectDocument.createdDate
      }
    },
    async loadData () {
      this.loading = true
      this.certificates = []
      if (this.$router.currentRoute.name !== 'createView') {
        await this.getDocumentInfo()
        let edges = await this.getContentGroup()
        if (edges.length > 0) {
          await this.getEdges(edges)
        } else {
          let previousEdge = this.stackNavigation[this.stackNavigation.length - 1]
          if (previousEdge) {
            this.edges = [previousEdge]
          }
        }
        // Load certificates
        if (this.certificates.length > 0) {
          this.showCertificates = true
        } else {
          this.showCertificates = false
        }
      }
      this.loading = false
    },
    async getContentGroup () {
      let typeSchema = await this.getSchemaOfType()
      let { contentGroups, edges } = await this.filterPropsAndEdges(typeSchema)
      // console.log('-------------------------')
      // console.log({ contentGroups, edges })
      // console.log('-------------------------')
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
      const nodeLabel = res[label].find(element => element.key === 'nodeLabel')
      if (!nodeLabel) {
        this.showErrorMsg('The document do not has nodeLabel')
      }
      this.documentInfo.systemNodeLabel = nodeLabel.value
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
    async filterPropsAndEdges (typeSchema) {
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
      edges = this.moveVoteBegin(edges)
      return { contentGroups, edges }
    },
    async moveVoteBegin (edges) {
      let endpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
      // GraphQL problem [solution meanwhile sebs find solution]
      if (endpoint !== 'https://hashed.systems/alpha-dge-test/graphql') {
        let obj = edges.pop()
        if (obj) {
          edges.unshift(obj)
        }
      }
      return edges
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
          let val = document[queryLabel][0][key]
          let value = val || ''
          contentGroup.push(
            {
              key: words[1],
              value: value,
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
      this.certificates = []
      let query = await this.makeQueryForEdgeInfo(edges)
      let responseEdges
      let edgesMixed = []
      let previousEdge = this.stackNavigation[this.stackNavigation.length - 1]
      try {
        responseEdges = await this.retrieveQuery(query)
        let { edges, certificates } = this.processEdges(responseEdges)
        // console.log('-------------------------')
        // console.log({ edges, certificates })
        // console.log('-------------------------')
        // get data from certificate
        this.edges = edges
        this.certificates = await this.retrieveCertificates(certificates)
        if (this.stackNavigation.length > 0 && this.edges.length === 0) {
          edgesMixed.push(previousEdge)
          this.edges = edgesMixed
        }
      } catch (error) {
        if (this.stackNavigation.length > 0) {
          edgesMixed.push(previousEdge)
          this.edges = edgesMixed
        }
      }
    },
    async makeQueryForEdgeInfo (edges) {
      var query = ''
      var docInterface = this.documentInterface
      for (const element of edges) {
        if (element.typeDoc !== 'Document') {
          let _props = await this.getPropsType({
            type: element.typeDoc
          })
          _props = await _props['__type']['fields']
          var found = _props.find(element => element.name === 'system_nodeLabel_s')
        } else {
          found = false
        }
        if (element.type === 'LIST') {
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
      var certificates = []
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
            if (this.isCertificate(QLresponse[key][0])) {
              Array.prototype.push.apply(certificates, QLresponse[key])
            }
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
      return { edges: edgesMixed, certificates: certificates }
    },
    isCertificate (objCertificate) {
      return objCertificate.edgeName === 'certifiedBy'
    },
    async retrieveCertificates (certificates) {
      for (const certificate of certificates) {
        let response = await this.getCertificate({
          docId: certificate.docId
        })
        certificate.notes = response['queryCertificate'][0]['fixedDetails_notes_s']
        certificate.signature = response['queryCertificate'][0]['fixedDetails_signature_s']
      }
      return certificates
    }
  }
}
