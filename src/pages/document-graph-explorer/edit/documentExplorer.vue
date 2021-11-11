<template lang='pug'>
div
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" @showModal="openModal")
  q-dialog(v-model='showDialogEdge')
    EdgeDialog(@EdgeData='addNewEdge')
  #BtnSection
  .row.q-gutter-md.q-py-xl
    q-btn(
      unelevated
      label='Save'
      color='primary'
    )
    q-btn(
      unelevated
      label='Cancel'
      color='primary'
    )
</template>

<script>
import { cssClasses } from 'src/mixins/css-class.js'
import DocInformation from './info/DocInformation.vue'
import ListContentGroup from './List/list-content-group.vue'
import Edges from './edges/edges.vue'
import EdgeDialog from './dialog/edgeDialog.vue'
import { mapActions, mapGetters } from 'vuex'
import customRegex from '~/const/customRegex.js'
export default {
  name: 'DocumentExplorer',
  mixins: [cssClasses],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EdgeDialog
  },
  data () {
    return {
      showDialogEdge: false,
      documentInfo: {
        name: undefined,
        docID: undefined,
        hash: undefined,
        owner: undefined,
        documentType: undefined,
        createdDate: undefined,
        updatedDate: undefined
      },
      contentsGroups: [],
      edges: []
    }
  },
  async mounted () {
    this.getDocumentInfo()
    let edges = await this.getContentGroup()
    this.getEdges(edges)
  },
  methods: {
    ...mapGetters('documentGraph', ['getDocument', 'getCatalog']),
    ...mapActions('documentGraph', ['getDocumentsByDocId']),
    getDocumentInfo () {
      let selectDocument = this.getDocument()
      this.documentInfo.name = selectDocument.creator
      this.documentInfo.docID = selectDocument.docId
      this.documentInfo.hash = selectDocument.hash
      this.documentInfo.owner = selectDocument.creator
      this.documentInfo.documentType = selectDocument.type
      this.documentInfo.createdDate = selectDocument.createdDate
      this.documentInfo.updatedDate = selectDocument.createdDate
    },
    async getContentGroup () {
      let _props = this.getCatalog().get(this.documentInfo.documentType)
      let props = ''
      let edges = []
      _props.forEach(element => {
        let type = element.type.kind
        if (type !== 'LIST' && type !== 'OBJECT') {
          props += element.name.toString() + '\n'
        } else {
          edges.push({ edge: element.name, direction: 'next' })
        }
      })
      console.log(props)
      console.log(edges)
      const response = await this.getDocumentsByDocId({
        docID: this.documentInfo.docID,
        props: props,
        type: this.documentInfo.documentType
      })
      let queryLabel = 'query' + this.documentInfo.documentType
      let contentGroup = []
      for (const key in response[queryLabel][0]) {
        var regexContentGroup = new RegExp(customRegex.ISCONTENTGROUP)
        if (regexContentGroup.test(key.toString())) {
          this.contentsGroups.push({ data: [{ key: key, value: response[queryLabel][0][key] }] })
        }
      }
      console.log(contentGroup)
      return edges
      // this.contentsGroups.push({
      //   data: [
      //     {
      //       key: 'details',
      //       value: '1onefiftyfor',
      //       dataType: 'eosio:name'
      //     },
      //     {
      //       key: 'node_label',
      //       value: 'Girl Scount Cookies Cannabis (54543233)',
      //       dataType: 'string'
      //     },
      //     {
      //       key: 'type',
      //       value: 'item',
      //       dataType: 'eosio:name'
      //     }
      //   ]
      // },
      // {
      //   data: [
      //     {
      //       key: 'content_group_label',
      //       value: 'details',
      //       dataType: 'eosio:name'
      //     },
      //     {
      //       key: 'carrier',
      //       value: 'Fedex',
      //       dataType: 'string'
      //     },
      //     {
      //       key: 'tracking_number',
      //       value: 'MjJasdUIeriusdadfcvnmfgdjkldfer',
      //       dataType: 'string'
      //     },
      //     {
      //       key: 'shipped_date',
      //       value: '14 Sep 2021 12:23:33 EST',
      //       dataType: 'timestamp'
      //     },
      //     {
      //       key: 'weight (kg)',
      //       value: '1.239',
      //       dataType: 'numeric'
      //     },
      //     {
      //       key: 'photo_1',
      //       value: 'Open',
      //       dataType: 'file'
      //     },
      //     {
      //       key: 'photo_2',
      //       value: 'Open',
      //       dataType: 'file'
      //     }
      //   ]
      // })
    },
    getEdges (edges) {
      console.log(edges)
      this.edges = edges
      // this.edges.push(
      //   {
      //     direction: 'prev',
      //     name: 'Hashed Partner Forms',
      //     label: 'Facility',
      //     edge: 'produced'
      //   },
      //   {
      //     direction: 'next',
      //     name: 'Item created on 12 sep 2021',
      //     label: 'Checkpoint',
      //     edge: 'scanned'
      //   },
      //   {
      //     direction: 'next',
      //     name: 'Harvested in Upstate NY on 12 sep 2021',
      //     label: 'Checkpoint',
      //     edge: 'scanned'
      //   },
      //   {
      //     direction: 'next',
      //     name: 'Packed and shipped on 14 sep 2021',
      //     label: 'Checkpoint',
      //     edge: 'scanned'
      //   },
      //   {
      //     direction: 'next',
      //     name: 'Arrived at Dispensary on 18 sep 2021',
      //     label: 'Checkpoint',
      //     edge: 'scanned'
      //   }
      // )
    },
    openModal () {
      this.showDialogEdge = true
    },
    addNewEdge (form) {
      this.edges.push(form)
      this.showDialogEdge = false
    }
  }
}
</script>

<style lang='styl'>
</style>
