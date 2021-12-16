<template lang='pug'>
div
  div.text-h6.q-pb-md
    | {{$t('pages.documentExplorer.edit.title')}}
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" :relations="relationsEdges" @showModal="openModal")
  q-dialog(v-model='showDialogEdge')
    EdgeDialog(@EdgeData='addNewEdge')
  #BtnSection
  .row.q-gutter-md.q-py-md
    q-btn(
      unelevated
      label='Save'
      no-caps
      class="btnTailwind"
    )
    q-btn(
      unelevated
      label='Cancel'
      @click='onCancel()'
      no-caps
      class="btnTailwind"
    )
  CancelDialog(:show="openDialog" @close='onCancelModal' @ok='onOkModal')
</template>

<script>
import DocInformation from '../page-components/info/DocInformation.vue'
import ListContentGroup from '../page-components/List/list-content-group.vue'
import Edges from '../page-components/edges/edges.vue'
import EdgeDialog from '../page-components/dialog/edgeDialog.vue'
import CancelDialog from '../page-components/cancel/cancelDialog.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EdgeDialog,
    CancelDialog
  },
  data () {
    return {
      showDialogEdge: false,
      openDialog: false
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
      this.openDialog = !this.openDialog
      this.$forceUpdate()
    },
    onCancelModal () {
      this.openDialog = false
      this.$forceUpdate()
    },
    onOkModal () {
      this.openDialog = false
      this.setIsEdit(false)
      this.$router.push({ name: 'DocumentExplorer' })
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
