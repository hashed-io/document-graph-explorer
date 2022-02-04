<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-h6.q-pb-md
    | {{$t('pages.documentExplorer.extend.title')}}
  .row.q-col-gutter-md
    //- .col-2
    //-   TSelectExtend(
    //-     v-model='form.direction'
    //-     message='Choose direction'
    //-     :options='options'
    //-     dense
    //-   )
    .col-4
      q-form(ref='edgeNameForm')
        TInput(
          data-cy='edgeNameInput'
          placeholder='Edge name'
          :rules="[rules.required]"
          v-model='form.edgeName'
          :dense='true'
        )
  q-form(ref='contentGroup')
    ListContentGroup(:contents_groups="extendContentGroup")
  //- Edges(:edges="extendEdges" @showModal="openModal" :withoutEdges="true")
  //- q-dialog(v-model='showDialogEdge')
  //-   EdgeDialog(@EdgeData='addNewEdge')
  #BtnSection
  .row.q-gutter-md.q-py-lg
    q-btn(
      data-cy="saveDoc"
      unelevated
      no-caps
      label='Save'
      class='btnTailwind'
      @click='onSave()'
    )
    q-btn(
      data-cy="cancelDoc"
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
import { validation } from '~/mixins/validation'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer, validation],
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
    ...mapState('accounts', ['account']),
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
        system: [
          {
            title: 'system',
            key: 'nodeLabel',
            value: 'Node label value',
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
      }
      // options: [
      //   {
      //     label: 'To ...',
      //     value: 'To ...'
      //   },
      //   {
      //     label: 'From ...',
      //     value: 'From ...'
      //   }
      // ]
    }
  },
  methods: {
    async onSave () {
      try {
        let edgeName = await this.$refs.edgeNameForm.validate()
        let contentGroup = await this.$refs.contentGroup.validate()
        if (edgeName && contentGroup) {
          this.formatContentGroups(this.extendContentGroup)
        } else {
          this.showErrorMsg('Fill the information')
        }
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
          t: 'time_point',
          s: 'string',
          i: 'int64',
          sd: 'string'
        }
        var contentGroups = []
        var contentGroup = []
        for (let title in contentgroups) {
          contentGroup.push({
            label: 'content_group_label',
            value: ['string', title]
          })
          if (title === 'system') {
            contentGroup.push({
              label: 'type',
              value: ['name', this.documentInfo.type.toLowerCase()]
            })
          }
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
        this.callExtendAction(contentGroups)
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to format the content groups ' + error)
      }
    },
    async callExtendAction (contentGroups) {
      try {
        await this.newInstance()
        let fromNode = this.documentInfo.docId
        let edgeName = this.form.edgeName
        let creator = this.account
        await this.ActionsApi.extendDoc({ creator, edgeName, fromNode, contentGroups })
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.showSuccessMsg('The document was extended correctly')
        this.setIsEdit(false)
        let apiEndpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
        this.currentEndpoint = apiEndpoint
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: this.documentInfo.docId, endpoint: this.currentEndpoint } })
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
