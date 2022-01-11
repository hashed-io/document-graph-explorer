<template lang="pug">
div
  q-spinner-tail(
    color="indigo"
    size="1.5em"
    class="center"
    v-if="loadingData"
  )
  div(v-if="!loadingData")
    .row.justify-between
      .col-12
        div.text-h6.q-py-md
          | {{$t('pages.documentExplorer.listDocs.title')}}
    .row.q-pb-sm.justify-between
      .col-4
        div
          q-btn(
              data-cy="newDocButton"
              label='New Document'
              @click='newDoc'
              unelevated
              no-caps
              align="around"
          ).btnTailwind
      .col-4
        TInput(
          data-cy='search'
          v-model='search'
          dense
          debounce='500'
          @update="onSearchDoc"
          placeholder='Search'
        )
    q-table(
      :pagination.sync="pagination"
      @request="onRequest"
      binary-state-sort
      :loading="loadingDocs"
      :data="documents"
      :columns="columns"
      card-class="bg-grey-1"
      :visible-columns='visibleColumns'
    ).TailWind
      template(v-slot:body="props")
        q-tr.cursor-pointer( :props="props")
          q-td(
            data-cy="rowDoc"
            v-for="col in props.cols",
            :key="col.name",
            :props="props",
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
            @click='seeDocument(props.row)'
          )
            div(style='color: grey') {{ col.value }}
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
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import TInput from '~/components/input/t-input.vue'
import ApolloClient from 'apollo-boost'
import TSelectEdge from '~/components/select/TSelectEdge.vue'

export default {
  name: 'ListDocs',
  data () {
    return {
      loadingData: false,
      endpoint: undefined,
      documents: undefined,
      assignment: undefined,
      currentEndpoint: undefined,
      search: undefined,
      prevDoc: undefined,
      loadingDocs: undefined,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 6
      },
      visibleColumns: ['creator', 'type', 'hash', 'createdDate', 'docid', 'system'],
      columns: [
        {
          name: 'docid',
          label: 'Doc id',
          headerStyle: 'font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          field: (row) => row.docId
        },
        {
          name: 'creator',
          label: 'Creator',
          headerStyle: 'font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          align: 'left',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.creator
        },
        {
          name: 'system',
          label: 'Node Label',
          headerStyle: 'font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          align: 'left',
          style: 'color: rgb(107,114,128);',
          field: (row) => row.system_nodeLabel_s
        },
        {
          name: 'type',
          label: 'Type',
          headerStyle: 'font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          align: 'left',
          style: 'color: rgb(107,114,128)',
          field: (row) => row.type
        },
        {
          name: 'hash',
          label: 'Hash',
          headerStyle: 'font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          align: 'left',
          style: 'color: rgb(107,114,128)',
          field: (row) => row.hash
        },
        {
          name: 'createdDate',
          label: 'Created Date',
          headerStyle: ' font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          style: 'color: rgb(107,114,128)',
          field: (row) => row.createdDate,
          format: (val, row) => {
            return this.dateToString(val)
          }
        }
      ],
      endpoints: [
        {
          label: 'Hypha',
          value: 'https://alpha-st.tekit.io/graphql'
        },
        {
          label: 'Cannabis',
          value: 'https://hashed.systems/alpha-trace-test/graphql'
        },
        {
          label: 'Social',
          value: 'https://hashed.systems/alpha-dge-test/graphql'
        }
      ]
    }
  },
  async beforeMount () {
    this.loadingData = true
  },
  async mounted () {
    try {
      if (this.$route.query.hasOwnProperty('endpoint')) {
        this.endpoint = this.$route.query.endpoint
        await this.modifyApolloEndpoint()
        await this.setLocalStorage({ key: 'apollo-endpoint', value: this.endpoint })
      }
      await this.loadDocuments()
    } catch (e) {
      this.showErrorMsg('An Error occured while trying to retrieve the documents; ' + e)
    } finally {
      this.loadingData = false
    }
  },
  computed: {
    ...mapState('documentGraph', ['isHashed', 'documentInterface']),
    ...mapState('documentGraph', ['endpointApollo']),
    Endpoint () {
      return this.endpointApollo
    }
  },
  watch: {
    async Endpoint (newValue, oldValue) {
      this.loadingData = true
      this.endpoint = newValue
      this.pagination.page = 1
      this.pagination.rowsPerPage = 5
      this.pagination.sortBy = 'desc'
      this.pagination.descending = false
      this.pagination.rowsNumber = 6
      try {
        await this.loadFromEndpoint()
      } catch (e) {
        this.showErrorMsg('An Error occured while trying to retrieve the documents; ' + e)
      } finally {
        this.loadingData = false
      }
    }
  },
  methods: {
    ...mapActions('documentGraph', ['getContractInformation', 'getDocumentsByDocId', 'getDocInterface', 'getPropsType', 'getDocuments', 'changeEndpoint', 'getSchema', 'getLocalStorage', 'setLocalStorage']),
    ...mapMutations('documentGraph', ['setIsHashed', 'setContractInfo', 'setDocInterface', 'setDocument', 'setIsEdit', 'pushDocNavigation', 'popDocNavigation', 'setTypesWithSystemNode', 'setCatalog']),
    async onSearchDoc () {
      const docInterface = this.getLocalStorage('documentInterface')
      const documentID = this.search
      const data = await this.getDocumentsByDocId({
        byElement: documentID,
        type: 'Document',
        props: '',
        docInterface: docInterface,
        isHashed: this.isHashed
      })
      var _documents = []
      for (const doc of data.queryDocument) {
        let typeSchema = await this.getPropsType({
          type: doc['__typename']
        })
        let _props = typeSchema['__type'].fields
        const found = _props.find(element => element.name === 'system_nodeLabel_s')
        // const found = true
        if (found) {
          let byElement = doc.docId
          if (this.isHashed) {
            byElement = doc.hash
          }
          var query = `... on ${doc.type}{
            system_nodeLabel_s
          }`
          let _isHashed = this.isHashed
          let response = await this.getDocumentsByDocId({
            byElement: byElement,
            props: query,
            type: doc['__typename'],
            isHashed: _isHashed
          })
          doc['system_nodeLabel_s'] = response[`query${doc['__typename']}`][0]['system_nodeLabel_s']
          _documents.push(doc)
        }
        query = ''
      }
      if (_documents.length > 0) {
        this.showSuccessMsg('Document found')
        this.documents = _documents
        return _documents.length
      } else {
        await this.loadDocuments()
        if (this.search !== '') {
          this.showErrorMsg('Document not found')
        }
      }
    },
    async onRequest (props) {
      this.loadingDocs = true
      const { page, rowsPerPage, sortBy, descending, rowsNumber } = props.pagination
      let offset = (page - 1) * rowsPerPage
      let limit = rowsPerPage
      const numberDocs = await this.loadDocuments(limit, offset)
      if (numberDocs) {
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        this.pagination.rowsNumber = rowsNumber + numberDocs
      } else {
        this.showSuccessMsg('There is no more data to display')
      }
      this.loadingDocs = false
    },
    newDoc () {
      this.setIsEdit(true)
      this.$router.push({ name: 'createView' })
    },
    async loadLocalStorage () {
      let apiEndpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
      this.currentEndpoint = apiEndpoint
    },
    async loadDocuments (limit, offset) {
      var data
      await this.getDocInterface()
      await this.getContractInfo()
      this.loadLocalStorage()
      if (!limit && !offset) {
        data = await this.getDocuments({ limit: 5, offset: 0, type: 'Document' })
      } else {
        data = await this.getDocuments({ limit: limit, offset: offset, type: 'Document' })
      }
      var _documents = []
      for (const doc of data.queryDocument) {
        let typeSchema = await this.getPropsType({
          type: doc['__typename']
        })
        let _props = typeSchema['__type'].fields
        const found = _props.find(element => element.name === 'system_nodeLabel_s')
        // const found = true
        if (found) {
          let byElement = doc.docId
          if (this.isHashed) {
            byElement = doc.hash
          }
          var query = `... on ${doc.type}{
            system_nodeLabel_s
          }`
          let _isHashed = this.isHashed
          let response = await this.getDocumentsByDocId({
            byElement: byElement,
            props: query,
            type: doc['__typename'],
            isHashed: _isHashed
          })
          doc['system_nodeLabel_s'] = response[`query${doc['__typename']}`][0]['system_nodeLabel_s']
          _documents.push(doc)
        }

        query = ''
      }
      if (_documents.length > 0) {
        this.documents = _documents
        return _documents.length
      } else {
        return 0
      }
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
      let flag
      docInterface['__type'].fields.forEach(element => {
        if (element.name === 'docId') {
          flag = 1
        }
        interfaceString += element.name + '\n'
      })
      const containDocId = (element) => element === 'docid'
      let index = this.visibleColumns.findIndex(containDocId)
      if (!flag) {
        this.setIsHashed(true)
        if (index >= 0) {
          this.visibleColumns.splice(index, 1)
        }
      } else {
        this.setIsHashed(false)
        if (index === -1) {
          this.visibleColumns.push('docid')
        }
      }
      this.setDocInterface(interfaceString)
      await this.setLocalStorage({
        key: 'documentInterface',
        value: interfaceString
      })
    },
    smallText (text) {
      return text.slice(0, 250) + '...'
    },
    seeDocument (row) {
      // this.pushDocNavigation(row)
      // this.popDocNavigation()
      this.setDocument(row)
      this.setIsEdit(false)
      if (this.isHashed) {
        this.$router.push({ name: 'DocumentExplorer', query: { hash: row.hash, endpoint: this.currentEndpoint } })
      } else {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: row.docId, endpoint: this.currentEndpoint } })
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
    async loadFromEndpoint () {
      this.loadingData = true
      try {
        this.modifyApolloEndpoint()
        this.setLocalStorage({ key: 'apollo-endpoint', value: this.endpoint })
        await this.loadDocuments()
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to retrieve the documents. Loading from previous endpoint')
        let previousEndpoint = this.getLocalStorage({ key: 'apollo-endpoint' })
        await this.modifyApolloEndpoint(previousEndpoint)
        await this.loadDocuments()
      } finally {
        this.loadingData = false
      }
    },
    async loadCatalog () {
      try {
        const _response = await this.getSchema()
        const mapType = new Map()
        const nodeLabelTypes = []
        _response.__schema.types.forEach(element => {
          if (!element.name.toLowerCase().includes('aggregate') && element.fields.length > 0) {
            let filteredField = []
            element.fields.forEach(field => {
              if (!field.name.includes('aggregate')) {
                if (field.name === 'system_nodeLabel_s') {
                  nodeLabelTypes.push(element.name)
                }
                filteredField.push(field)
              }
            })
            mapType.set(element.name, filteredField)
          }
        })
        this.setTypesWithSystemNode(nodeLabelTypes)
        this.setCatalog(mapType)
      } catch (e) {
        this.showErrorMsg('An error ocurred while trying to get schema' + e)
        console.error('An error ocurred while trying to get schema ' + e)
      }
    }
  },
  components: { TInput, TSelectEdge }
}
</script>

<style lang="stylus" scoped>
.center
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
.container
  height: 200px;
.TailWind
  border-radius: 10px
.btnTailwind
  height: 42px
  width: 135px
  font-weight: 500
  font-size: 14px
</style>
