<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-h6.q-pb-md
    | {{$t('pages.documentExplorer.extend.title')}}
  .row.q-col-gutter-md
    .col-2
      TSelectExtend(
        v-model='form.direction'
        message='Choose direction'
        :options='options'
        dense
      )
    .col-4
      TInput(
        placeholder='Edge name'
        v-model='form.edgeName'
        :dense='true'
      )
  ListContentGroup(:contents_groups="extendContentGroup")
  //- Edges(:edges="extendEdges" @showModal="openModal" :withoutEdges="true")
  //- q-dialog(v-model='showDialogEdge')
  //-   EdgeDialog(@EdgeData='addNewEdge')
  #BtnSection
  .row.q-gutter-md.q-py-lg
    q-btn(
      unelevated
      no-caps
      label='Save'
      class='btnTailwind'
      @click='onSave()'
    )
    q-btn(
      unelevated
      no-caps
      label='Cancel'
      @click='onCancel()'
      class='btnTailwind'
    )
    //- CancelDialog(:show="openDialog" @close='onCancelModal' @ok='onOkModal')
</template>

<script>
import DocInformation from '../page-components/info/DocInformation.vue'
import ListContentGroup from '../page-components/List/list-content-group.vue'
import Edges from '../page-components/edges/edges.vue'
import TInput from '~/components/input/t-input.vue'
import TSelect from '~/components/select/t-select.vue'
import CancelDialog from '../page-components/cancel/cancelDialog.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
import TSelectExtend from '~/components/select/TSelectExtend.vue'
import EdgeDialog from '../page-components/dialog/edgeDialog.vue'
import { mapState } from 'vuex'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    TInput,
    TSelect,
    CancelDialog,
    TSelectExtend,
    EdgeDialog
  },
  computed: {
    ...mapState('documentGraph', ['endpointApollo']),
    Endpoint () {
      return this.endpointApollo
    }
  },
  watch: {
    async Endpoint (newValue, oldvalue) {
      this.$router.push({ name: 'listDocs', query: { endpoint: newValue } })
    }
  },
  data () {
    return {
      extendContentGroup: {
        Content_group: [
          {
            title: 'content_group',
            key: 'Key',
            value: 'Value',
            dataType: 's'
          }
        ]
      },
      extendEdges: [],
      openDialog: false,
      loading: false,
      showDialogEdge: false,
      openDialogEdge: false,
      form: {
        edgeName: undefined,
        direction: undefined
      },
      options: [
        {
          label: 'To ...',
          value: 'To ...'
        },
        {
          label: 'From ...',
          value: 'From ...'
        }
      ]
    }
  },
  methods: {
    onSave () {

    },
    openModal () {
      this.showDialogEdge = true
    },
    async addNewEdge (form) {
      this.extendEdges.push(form)
      await this.$nextTick()
      this.showDialogEdge = false
    },
    onCancel () {
      this.openDialog = true
      this.setIsEdit(false)
      this.$forceUpdate()
      this.$router.push({ name: 'DocumentExplorer' })
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
