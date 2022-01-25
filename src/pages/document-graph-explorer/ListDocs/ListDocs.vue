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
              v-if="account"
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
          debounce='750'
          @update="onSearchDoc"
          placeholder='Search'
        )
    q-table(
      :pagination.sync="pagination"
      @request="onRequest"
      binary-state-sort
      :loading="loadingDocs"
      :data="documents"
      :dense="$q.screen.sm"
      :grid="$q.screen.xs"
      :columns="columns"
      card-class="bg-grey-1"
      :visible-columns='visibleColumns'
    ).TailWind
      template(v-slot:loading)
        transition(
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        )
        q-inner-loading(showing)
          q-spinner-tail(
            color="indigo"
            size="1.5em"
          )
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
            div(v-if="col.name !== 'highlight'" style='color: grey') {{ col.value }}
            div(class="text-left" v-else)
              div(v-for="(item, index) in col.value" :key="props.rowIndex+' '+index")
                q-badge(rounded class="badgeColor1") {{getContentGroup(index)}}
                q-icon(size="1.5em" name="chevron_right" color="indigo")
                q-badge(rounded class="badgeColor2") {{getNameContentGroup(index)}}
                q-icon(size="1.5em" name="chevron_right" color="indigo")
                q-badge(rounded class="badgeColor3")
                  div(v-html="item[0]")
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
      template(v-slot:item='props')
        .q-pa-xs.col-xs-12.col-sm-6.col-md-4
          q-card(
            @click="seeDocument(props.row)"
            :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-2'"
          )
            q-card-section.text-justify
              br
              .row.q-col-gutter-md
                .col-4
                  strong DOC ID
                  div {{ props.row.docId }}
                .col-4
                  strong CREATOR
                  div {{ props.row.creator }}
                .col-4
                  strong TYPE
                  div {{ props.row.type }}
              .row.q-pt-md.q-col-gutter-md
                .col-4
                  strong NODE LABEL
                  div {{ props.row.system_nodeLabel_s }}
                .col-4.wrap(v-if="props.row.hasOwnProperty('hash')")
                  strong HASH
                  div {{ props.row.hash.substring(0,9)+'\n...' }}
                div(:class="props.row.hasOwnProperty('hash') ? 'col-4' : 'col-8'")
                  strong CREATED AT
                  div {{ props.row.createdDate }}
      template(v-slot:no-data="{ icon, message }")
        .full-width.row.flex-center.q-gutter-sm
          div(v-if="search" style="width: 20px; height: 20px;")
            svg(xmlns="http://www.w3.org/2000/svg" viewbox="0 0 10 10" fill="currentColor")
              path(fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd")
          .text-caption.text-grey.text-bold
            | {{ search ? $t('pages.documentExplorer.explorer.noDataOnSearch')+' \"' + search +'\"' : message }}
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
      paramsElastic: {
        from: 0,
        size: 10,
        fields: ['*'],
        fuzziness: 'auto'
      },
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 6
      },
      visibleColumns: ['creator', 'type', 'createdDate', 'docid', 'system'],
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
        },
        {
          name: 'score',
          label: 'Score',
          headerStyle: ' font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          style: 'color: rgb(107,114,128)',
          field: (row) => row.score
        },
        {
          name: 'highlight',
          label: 'Highlight',
          headerStyle: ' font-size:14px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-uppercase',
          style: 'color: rgb(107,114,128)',
          field: (row) => row.highlight
          // format: (val, row) => {
          //   let rowHighlight = row.highlight
          //   for (const key in rowHighlight) {
          //     const splitKey = key.split('_')
          //     text += splitKey[0] + ' > ' + splitKey[1] + ' > '
          //     text += rowHighlight[key][0] + '<br>'
          //   }
          //   return text
          // }
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
    ...mapState('accounts', ['account']),
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
    ...mapActions('elasticSearch', ['searchDoc']),
    ...mapActions('documentGraph', ['getContractInformation', 'getDocumentsByDocId', 'getDocInterface', 'getPropsType', 'getDocuments', 'changeEndpoint', 'getSchema', 'getLocalStorage', 'setLocalStorage']),
    ...mapMutations('documentGraph', ['setIsHashed', 'setContractInfo', 'setDocInterface', 'setDocument', 'setIsEdit', 'pushDocNavigation', 'popDocNavigation', 'setTypesWithSystemNode', 'setCatalog']),
    getContentGroup (row) {
      let contentGroup = row.split('_')
      return contentGroup[0]
    },
    getNameContentGroup (row) {
      let contentGroup = row.split('_')
      return contentGroup[1]
    },
    async onSearchDoc () {
      if (this.search !== '') {
        this.loadingDocs = true
        let response = await this.searchDoc({
          search: this.search,
          params: this.paramsElastic
        })
        response = response.hits.hits.length > 0 ? response.hits.hits : undefined
        if (response) {
          var docsArr = []
          response.forEach(element => {
            let _element = element._source
            let obj = {
              contract: _element.contract,
              createdDate: _element.createdDate,
              creator: _element.creator,
              docId: _element.docId,
              docId_i: _element.docId_i,
              system_nodeLabel_s: _element.system_nodeLabel_s,
              type: _element.type,
              updatedDate: _element.updatedDate,
              __typename: _element.type,
              score: element._score.toString(),
              highlight: element.highlight
            }
            docsArr.push(obj)
          })
          this.documents = docsArr
          this.visibleColumns.push('score')
          this.visibleColumns.push('highlight')
        } else {
          this.documents = []
          this.clearElasticColumns()
        }
        this.loadingDocs = false
      } else {
        this.loadingDocs = true
        this.clearElasticColumns()
        await this.loadDocuments()
        this.loadingDocs = false
      }
    },
    clearElasticColumns () {
      const existScore = (element) => element === 'score'
      let index = this.visibleColumns.findIndex(existScore)
      if (index >= 0) {
        this.visibleColumns.pop()
        this.visibleColumns.pop()
      }
    },
    async onRequest (props) {
      this.loadingDocs = true
      this.clearElasticColumns()
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
          this.visibleColumns.splice(index, 1, 'hash')
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
.badgeColor1
  background: #1e40af
.badgeColor2
  background: #1d4ed8
.badgeColor3
  background: #2563eb
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
