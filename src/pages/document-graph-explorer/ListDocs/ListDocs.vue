<template lang="pug">
div(class="q-pa-md items-start")
  .row.q-pb-md
    .col-8
      div.text-h6.q-py-md(style="font-family: metropolis;")
        | {{$t('pages.documentExplorer.listDocs.title')}}
    .col-4
      .row.justify-end
        .col-12.q-pb-sm
          TInput(
            label='Endpoint'
            v-model='endpoint'
            dense
            :placeholder="currentEndpoint"
          )
        .row.justify-end
          .col-12.btn-primary
            q-btn(
                label='Load'
                size='xs'
                @click='loadFromEndpoint'
                unelevated
            )
  q-table(
    :data="documents"
    :columns="columns"
    card-class="bg-grey-1"

  )
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
import { mapActions, mapMutations } from 'vuex'
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
  },
  methods: {
    ...mapActions('documentGraph', ['getDocuments', 'getAssignment', 'getMembers', 'changeEndpoint', 'getSchema', 'getApiEndpoint', 'setApiEndpoint']),
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit', 'pushDocNavigation', 'popDocNavigation', 'setTypesWithSystemNode', 'setCatalog']),
    async loadLocalStorage () {
      let apiEndpoint = await this.getApiEndpoint({ key: 'apollo-endpoint' })
      this.currentEndpoint = apiEndpoint
    },
    async loadDocuments () {
      this.loadLocalStorage()
      this.documents = []
      const data = await this.getDocuments({ number: 1000, type: 'Document' })
      this.documents = data.queryDocument
    },
    async onClickAssignment () {
      const data = await this.getAssignment()
      this.assignment = data.queryAssignment
    },
    smallText (text) {
      return text.slice(0, 250) + '...'
    },
    seeDocument (row) {
      // this.pushDocNavigation(row)
      // this.popDocNavigation()
      this.setDocument(row)
      this.setIsEdit(false)
      this.$router.push({ name: 'DocumentExplorer', query: { document_id: row.docId } })
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
        this.setApiEndpoint({ key: 'apollo-endpoint', value: this.endpoint })
        await this.loadCatalog()
        await this.loadDocuments()
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to retrieve the documents. Loading from previous endpoint')
        let previousEndpoint = this.getApiEndpoint({ key: 'apollo-endpoint' })
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

<styles lang="stylus" scope>
.container {
  height: 200px;
}
</styles>
