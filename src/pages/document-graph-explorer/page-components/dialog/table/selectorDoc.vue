<template lang="pug">
div
  .row.justify-between
    div(class="q-mt-lg text-h5") {{'Document'}}
    TInput(
      class="q-pb-md"
      v-model="search"
      placeholder='Search document'
      dense
      label='search'
      :debounce="500"
      @update="onSearch"
    )
  q-table(
    :data="documents"
    :columns='columns'
    row-key='docId'
    flat
    bordered
    :dense="$q.screen.lt.md"
    :loading="loadingDocs"
  ).TailWind
    template(v-slot:loading)
      transition(
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      )
      q-inner-loading(showing)
        q-spinner-tail(
          class="text-brand-primary"
          size="1.5em"
        )
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
    template(v-slot:no-data="{ icon, message }")
      .full-width.row.flex-center.q-gutter-sm
        div(v-if="search" style="width: 20px; height: 20px;")
          svg(xmlns="http://www.w3.org/2000/svg" viewbox="0 0 10 10" fill="currentColor")
            path(fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd")
        .text-caption.text-grey.text-bold
          | {{ search ? $t('pages.documentExplorer.explorer.noDataOnSearch')+' \"' + search +'\"' : message }}
    template(v-slot:body="props")
      q-tr.cursor-pointer( :props="props")
        q-td(
          data-cy="rowDoc"
          v-for="col in props.cols",
          :key="col.name",
          :props="props",
          :class="getClass(props.rowIndex)"
          @click='onClick(props.row, props.rowIndex)'
        )
          div(v-if="col.name !== 'highlight'" style='color: grey') {{ col.value }}
          div(class="text-left" v-else)
            div(v-for="(item, index) in col.value" :key="props.rowIndex+' '+index")
              q-badge(rounded class="badgeColor") {{getContentGroup(index)}}
              q-icon(size="1.5em" name="chevron_right" color="grey")
              q-badge(rounded class="badgeColor") {{getNameContentGroup(index)}}
              q-icon(size="1.5em" name="chevron_right" color="grey")
              q-badge(rounded class="badgeColor")
                div(v-html="item[0]")
</template>
<script>
import TInput from '~/components/input/t-input.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'selectorDoc',
  components: { TInput },
  data () {
    return {
      selected: undefined,
      search: undefined,
      loadingDocs: undefined,
      documents: undefined,
      paramsElastic: {
        from: 0,
        size: 10,
        fields: ['*'],
        fuzziness: 'auto',
        endpoint: undefined,
        apikey: undefined
      },
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
        }
      ]
    }
  },
  computed: {
    ...mapState('documentGraph', ['contractInfo'])
  },
  methods: {
    ...mapActions('elasticSearch', ['searchDoc']),
    ...mapActions('documentGraph', ['getLocalStorage', 'getDocumentsByDocId', 'getPropsType']),
    getContentGroup (row) {
      let contentGroup = row.split('_')
      return contentGroup[0]
    },
    getNameContentGroup (row) {
      let contentGroup = row.split('_')
      return contentGroup[1]
    },
    async onSearch () {
      if (await this.getEnpointToSearch()) {
        await this.searchOnElastic()
      } else {
        await this.searchOnDgraph()
      }
    },
    async getEnpointToSearch () {
      // TODO: [document selector] identify if the current DGraph endpoint has elastic search endpoint.
      return await this.getLocalStorage({ key: 'apollo-endpoint' }) === 'https://hashed.systems/alpha-trace-test/graphql'
    },
    async searchOnDgraph () {
      this.loadingDocs = true
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
        this.loadingDocs = false
        return _documents.length
      } else {
        if (this.search !== '') {
          this.showErrorMsg('Document not found')
        }
      }
      this.loadingDocs = false
    },
    async getElasticSearchCredentials () {
      const endpoint = 'elasticEndpoint'
      const apikey = 'elasticApiKey'
      return { endpoint: this.contractInfo[endpoint], apikey: this.contractInfo[apikey] }
    },
    async searchOnElastic () {
      this.loadingDocs = true
      if (this.search !== '') {
        let credentialsObj = await this.getElasticSearchCredentials()
        this.paramsElastic.endpoint = credentialsObj.endpoint
        this.paramsElastic.apikey = credentialsObj.apikey
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
        }
      } else {
        this.documents = []
      }
      this.loadingDocs = false
    },
    onClick (rowData, rowIndex) {
      this.selected = rowIndex
      this.$emit('onSelectDoc', rowData.docId)
    },
    getClass (rowIndex) {
      if (this.selected === rowIndex) {
        return 'selectColor text-white'
      } else {
        return rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.selectColor
  background: #e2e8f0
.badgeColor
  background: $secondary
.TailWind
  border-radius: 10px !important
</style>
