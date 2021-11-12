<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-bolder.text-h6 Extend Document
  .row
    .col-2
      TSelect(
        label='Direction'
        v-model='form.direction'
        :options='options'
        :dense="true"
      )
  .row
    .col-2
      TInput(
        label='Edge Name'
        v-model='form.edgeName'
        :dense='true'
      )
  ListContentGroup(:contents_groups="contentsGroups")
  //- Edges(:edges="edges")
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
      @click='onCancel()'
    )
</template>

<script>
import { cssClasses } from 'src/mixins/css-class.js'
import DocInformation from '../components/info/DocInformation.vue'
import ListContentGroup from '../components/List/list-content-group.vue'
import Edges from '../components/edges/edges.vue'
import { mapActions, mapGetters } from 'vuex'
import customRegex from '~/const/customRegex.js'
import TInput from '~/components/input/t-input.vue'
import TSelect from '~/components/select/t-select.vue'
export default {
  name: 'DocumentExplorer',
  mixins: [cssClasses],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    TInput,
    TSelect
  },
  data () {
    return {
      form: {
        edgeName: undefined,
        direction: undefined
      },
      documentInfo: {
        name: undefined,
        docID: undefined,
        hash: undefined,
        owner: undefined,
        documentType: undefined,
        createdDate: undefined,
        updatedDate: undefined
      },
      options: [
        'To...', 'From...'
      ],
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
    ...mapActions('documentGraph', ['getDocumentsByDocId', 'getPropsType']),
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
        // console.log(element.ofType.name)
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
    },
    async getEdges (edges) {
      console.log(edges)
      this.edges = edges
      await Promise.all(edges.map(async (element) => {
        const type = await this.getPropsType({ type: element.edge })
        console.log(element.edge)
        console.log(type)
      }))
    },
    onCancel () {
      this.$router.push({ name: 'DocumentExplorer' })
    }
  }
}
</script>

<style lang='styl'>
</style>
