<template lang="pug">
div(class="q-pa-md items-start")
  div.text-h6.q-py-md {{'Documents in the Graph'}}
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
    ...mapMutations('documentGraph', ['setDocument', 'setIsEdit']),
    async onClickButton () {
      const data = await this.getDocuments({ number: 100, type: 'Document' })
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
