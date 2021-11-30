<template lang='pug'>
div
  div.text-h6.q-pb-md
    | {{$t('pages.documentExplorer.erase.title')}}
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" :relations="relationsEdges" @showModal="openModal")
  q-dialog(v-model='showDialogEdge')
    EdgeDialog(@EdgeData='addNewEdge')
  #BtnSection
  .row.q-gutter-md.q-py-xl
    q-btn(
      unelevated
      label='Save'
    ).btnTailwind
    q-btn(
      unelevated
      label='Cancel'
      @click='onCancel()'
    ).btnTailwind
</template>

<script>
import DocInformation from '../components/info/DocInformation.vue'
import ListContentGroup from '../components/List/list-content-group.vue'
import Edges from '../components/edges/edges.vue'
import EdgeDialog from '../components/dialog/edgeDialog.vue'
import { documentExplorer } from '../../../mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EdgeDialog
  },
  data () {
    return {
      showDialogEdge: false
    }
  },
  methods: {
    openModal () {
      this.showDialogEdge = true
    },
    addNewEdge (form) {
      this.edges.push(form)
      this.showDialogEdge = false
    },
    onCancel () {
      this.setIsEdit(false)
      this.$router.push({ name: 'DocumentExplorer' })
    }
  }
}
</script>

<style lang='stylus' scoped>
.btnTailwind
  border-radius: 7px
  background-color: #4F46E5
  color:white
</style>
