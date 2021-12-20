<template lang='pug'>
div
  div(v-if="loading" class="center")
    q-spinner-tail(
      color="indigo"
      size="5.5em"
    )

  div(v-if="!loading")
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
    //- CancelDialog(:show="openDialog" @close='onCancelModal' @ok='onOkModal')
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
      loading: false,
      showDialogEdge: false,
      openDialog: false
    }
  },
  methods: {
    openModal () {
      this.showDialogEdge = true
    },
    async addNewEdge (form) {
      this.edges.push(form)
      await this.$nextTick()
      this.showDialogEdge = false
    },
    onCancel () {
      this.$router.push({ name: 'DocumentExplorer' })
      this.setIsEdit(false)
      // this.openDialog = !this.openDialog
      // this.$forceUpdate()
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
.center
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
</style>
