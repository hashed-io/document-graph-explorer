<template lang="pug">
div
  .row.q-pb-md.justify-between
    .col-4
      div.text-h6.q-py-md
        | {{$t('pages.documentExplorer.listDocs.title')}}
    .col-5
      .row.justify-end.q-col-gutter-sm
        .col-xs-12.col-sm-12.col-md-9.q-pb-sm
          TInput(
            label='Endpoint'
            v-model='endpoint'
            dense
            :placeholder="currentEndpoint"
          )
        .col-xs-12.col-sm-12.col-md-2.spaceBtn
            div
              q-btn(
                  label='Load'
                  @click='loadFromEndpoint'
                  unelevated
                  no-caps
                  align="around"
              ).btnTailwind
  q-table(
    :data="documents"
    :columns="columns"
    card-class="bg-grey-1"
    :visible-columns='visibleColumns'
  ).TailWind
    template(v-slot:body="props")
      q-tr.cursor-pointer( :props="props")
        q-td(
          v-for="col in props.cols",
          :key="col.name",
          :props="props",
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
          @click='seeDocument(props.row)'
        ) {{ col.value }}
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
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
      )
      q-btn(
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
import TInput from '../../../components/input/t-input.vue'
import ApolloClient from 'apollo-boost'
export default {
  name: 'ListDocs',
  data () {
    return {
      endpoint: undefined,
      documents: undefined,
      assignment: undefined,
      currentEndpoint: undefined,
      visibleColumns: ['creator', 'type', 'hash', 'createdDate', 'docid'],
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
      ]
    }
  },
  mounted () {
    this.loadDocuments()
  },
  computed: {
    ...mapState('documentGraph', ['isHashed'])
  },
  methods: {
    ...mapActions('documentGraph', ['getContractInformation', 'getDocInterface', 'getPropsType', 'getDocuments', 'changeEndpoint', 'getSchema', 'getLocalStorage', 'setLocalStorage']),
    ...mapMutations('documentGraph', ['setIsHashed', 'setContractInfo', 'setDocInterface', 'setDocument', 'setIsEdit', 'pushDocNavigation', 'popDocNavigation', 'setTypesWithSystemNode', 'setCatalog']),
    async loadLocalStorage () {
      let apiEndpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
      this.currentEndpoint = apiEndpoint
    },
    async loadDocuments () {
      await this.getDocInterface()
      await this.getContractInfo()
      this.loadLocalStorage()
      this.documents = []
      const data = await this.getDocuments({ number: 1000, type: 'Document' })
      this.documents = data.queryDocument
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
        this.$router.push({ name: 'DocumentExplorer', query: { hash: row.hash } })
      } else {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: row.docId } })
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
      try {
        this.modifyApolloEndpoint()
        this.setLocalStorage({ key: 'apollo-endpoint', value: this.endpoint })
        await this.loadCatalog()
        await this.loadDocuments()
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to retrieve the documents. Loading from previous endpoint')
        let previousEndpoint = this.getLocalStorage({ key: 'apollo-endpoint' })
        await this.modifyApolloEndpoint(previousEndpoint)
        await this.loadCatalog()
        await this.loadDocuments()
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
  components: { TInput }
}
</script>

<style lang="stylus" scoped>
.container
  height: 200px;
.TailWind
  border-radius: 10px
@media screen and (max-width: 319px) and (min-width: 30px)
  .btnTailwind
    width: 50% !important
    left: 50% !important
@media screen and (max-width: 480px) and (min-width: 320px)
  .btnTailwind
    width: 50% !important
    left: 50% !important
@media screen and (max-width: 768px) and (min-width: 481px)
  .btnTailwind
    width: 50% !important
    left: 50% !important
@media screen and (max-width: 1024px) and (min-width: 769px)
  .btnTailwind
    width: 50% !important
    left: 50% !important
@media screen and (max-width: 1400px) and (min-width: 1024px)
  .btnTailwind
    width: 100% !important
    top:22px
@media screen and (min-width: 1401px)
  .btnTailwind
    width: 100% !important
    top:22px
</style>
