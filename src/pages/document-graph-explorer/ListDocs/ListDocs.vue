<template lang="pug">
div(class="q-pa-md items-start")
  q-table(
    title='Documents in the Graph'
    :data="documents"
    :columns="columns"
    card-class="bg-grey-1 text-primary"
  )
    template(v-slot:body="props")
      q-tr.cursor-pointer(no-hover, :props="props")
        q-td(
          v-for="col in props.cols",
          :key="col.name",
          :props="props",
          no-hover,
          :class="props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-1'"
        ) {{ col.value }}
          template(v-if="col.name == 'actions'")
            q-icon.animated-icon(
              v-if="props.row.ipfs !== ''",
              v-ripple,
              size="sm",
              color="indigo-6",
              @click="editDocument(props.row)",
              data-cy="editContracts"
            )
              svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
                path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01")
              q-tooltip {{ $t('common.buttons.edit') }}
            q-icon.animated-icon(
              v-if="props.row.ipfs !== ''",
              v-ripple,
              size="sm",
              color="indigo-6",
              @click="seeDocument(props.row)",
              data-cy="editContracts"
            )
              svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
                path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")
              q-tooltip {{ $t('common.buttons.see') }}

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
          headerStyle: 'font-weight:bolder; font-size:15px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          field: (row) => row.docId
        },
        {
          name: 'creator',
          label: 'Creator',
          headerStyle: 'font-weight:bolder; font-size:15px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          field: (row) => row.creator
        },
        {
          name: 'type',
          label: 'Type',
          headerStyle: 'font-weight:bolder; font-size:15px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          field: (row) => row.type
        },
        {
          name: 'hash',
          label: 'Hash',
          headerStyle: 'font-weight:bolder; font-size:15px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          field: (row) => row.hash
        },
        {
          name: 'createdDate',
          label: 'Created Date',
          headerStyle: 'font-weight:bolder; font-size:15px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          field: (row) => row.createdDate
        },
        {
          name: 'actions',
          label: 'Actions',
          headerStyle: 'font-size:15px;',
          headerClasses: 'bg-grey-1 text-subtitle2 text-grey-8 text-bold',
          align: 'center',
          field: (row) => row.actions,
          sortable: false
        }
      ]
    }
  },
  mounted () {
    this.onClickButton()
  },
  methods: {
    ...mapActions('documentGraph', ['getDocuments', 'getAssignment', 'getMembers']),
    ...mapMutations('documentGraph', ['setDocument']),
    async onClickButton () {
      // 7655e6a030dcd540708e6bcab0a17affd78f9ffc2043c6cbbdafff15bcc8c200 hash
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
    seeDocument (document) {
      this.setDocument(document)
      this.$router.push({ name: 'DocumentExplorer', query: { document_id: document.docId } })
    },
    editDocument (document) {
      this.setDocument(document)
      this.$router.push({ name: 'editDoc', query: { document_id: document.docId } })
    }
  }
}
</script>

<styles lang="scss" scope>
.container {
  height: 200px;
}
</styles>
