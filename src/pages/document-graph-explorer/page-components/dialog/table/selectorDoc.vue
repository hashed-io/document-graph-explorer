<template lang="pug">
q-table(
  :data="documents"
  :columns='columns'
  row-key='docId'
  :dense="$q.screen.lt.md"
  :loading="loadingDocs"
).TailWind
  template(v-slot:top-left)
    .row.text-h5 Selector document
    .row ID {{selected}}
  template(v-slot:top-right)
    TInput(
      class="q-pt-md"
      v-model="search"
      placeholder='Search document'
      dense
      :debounce="500"
      @update="onSearch"
    )
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
        :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        @click='onClick(props.row)'
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
</template>
<script>
import TInput from '~/components/input/t-input.vue'
import { mapActions } from 'vuex'
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
        fuzziness: 'auto'
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
  methods: {
    ...mapActions('elasticSearch', ['searchDoc']),
    getContentGroup (row) {
      console.log(row)
      let contentGroup = row.split('_')
      return contentGroup[0]
    },
    getNameContentGroup (row) {
      let contentGroup = row.split('_')
      return contentGroup[1]
    },
    async onSearch () {
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
        }
        this.loadingDocs = false
      } else {
        this.documents = []
      }
    },
    onClick (rowData) {
      this.selected = rowData.docId
      this.$emit('onSelectDoc', rowData.docId)
    }
  }
}
</script>
<style lang="stylus" scoped>
.badgeColor1
  background: #1e40af
.badgeColor2
  background: #1d4ed8
.badgeColor3
  background: #2563eb
.TailWind
  border-radius: 10px !important
</style>
