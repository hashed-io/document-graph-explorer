<template lang="pug">
div(class="q-pa-md items-start")
  div.text-h6.q-py-md(style="font-family: metropolis;")
    | {{$t('pages.documentExplorer.listDocs.title')}}
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
export default {
  name: 'ListDocs',
  data () {
    return {
      documents: undefined,
      assignment: undefined,
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
          field: (row) => row.createdDate
        }
      ]
    }
  },
  mounted () {
    this.onClickButton()
  },
  methods: {
    ...mapActions('documentGraph', ['getDocuments', 'getAssignment', 'getMembers']),
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit', 'pushDocNavigation', 'popDocNavigation']),
    async onClickButton () {
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
    }
  }
}
</script>

<styles lang="stylus" scope>
.container {
  height: 200px;
}
</styles>
