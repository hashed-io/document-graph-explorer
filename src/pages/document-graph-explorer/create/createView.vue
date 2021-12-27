<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-h6.q-pb-md
    | {{$t('pages.documentExplorer.create.title')}}
  .row
    .col-4
      TSelectExtend(
        v-model='documentType'
        message='Choose document type'
        :options='options'
        dense
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
import TSelectExtend from '~/components/select/TSelectExtend.vue'
import EdgeDialog from '../page-components/dialog/edgeDialog.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
import { mapState } from 'vuex'
export default {
  name: 'createView',
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
  beforeMount () {
    this.setIsEdit(true)
  },
  computed: {
    ...mapState('accounts', ['account'])
  },
  data () {
    return {
      extendContentGroup: {
        system: [
          {
            title: 'system',
            key: 'nodeLabel',
            value: 'Value',
            dataType: 's'
          }
        ]
      },
      openDialog: false,
      loading: false,
      showDialogEdge: false,
      openDialogEdge: false,
      documentType: undefined,
      options: [
        {
          label: 'Lot',
          value: 'lot'
        },
        {
          label: 'Farmer',
          value: 'farmer'
        }
      ]
    }
  },
  methods: {
    onSave () {
      try {
        this.formatContentGroups(this.extendContentGroup)
      } catch (error) {
        this.showErrorMsg('An error occured while trying to save the changes ' + error)
      }
    },
    formatContentGroups (contentgroups) {
      // ADD the document type
      try {
        const types = {
          c: 'checksum256',
          n: 'name',
          a: 'asset',
          t: 'time',
          s: 'string',
          i: 'int64'
        }
        var contentGroups = []
        var contentGroup = []
        for (let title in contentgroups) {
          contentGroup.push({
            label: 'content_group_label',
            value: ['string', title]
          })
          contentGroup.push({
            label: 'type',
            value: ['name', this.documentType]
          })
          contentgroups[title].forEach(element => {
            let key = (element.key === 'nodeLabel') ? 'node_label' : element.key
            contentGroup.push({
              label: key,
              value: [types[element.dataType], element.value]
            })
          })
          contentGroups.push(contentGroup)
          contentGroup = []
        }
        this.callCreateAction(contentGroups)
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to format the content groups ' + error)
      }
    },
    async callCreateAction (contentGroups) {
      try {
        await this.newInstance()
        let creator = this.account
        await this.ActionsApi.createDoc({ creator, contentGroups })
        this.setIsEdit(false)
        this.$router.push({ name: 'listDocs' })
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to edit the doc ' + error)
      }
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
      this.$router.push({ name: 'listDocs' })
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
