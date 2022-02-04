<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-h6.q-pb-md
    | {{$t('pages.documentExplorer.create.title')}}
  .row
    q-form(ref='docTypeSelect').col-4
      TSelectFilter(
        data-cy='docTypeName'
        :rules="[rules.required]"
        v-model='documentType'
        :debounce="0"
        message='Choose document type and press enter'
        :stringOptions='options'
        dense
      )
  q-form(ref='contentGroup')
    ListContentGroup(:contents_groups="extendContentGroup")
  //- Edges(:edges="extendEdges" @showModal="openModal" :withoutEdges="true")
  //- q-dialog(v-model='showDialogEdge')
  //-   EdgeDialog(@EdgeData='addNewEdge')
  #BtnSection
  .row.q-gutter-md.q-py-lg
    q-btn(
      data-cy='saveDoc'
      unelevated
      no-caps
      label='Save'
      class='btnTailwind'
      @click='onSave()'
    )
    q-btn(
      data-cy='cancelDoc'
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
import { mapActions, mapState } from 'vuex'
import TSelectFilter from '~/components/select/TSelectFilter.vue'
import { validation } from '~/mixins/validation'
export default {
  name: 'createView',
  mixins: [documentExplorer, validation],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    TInput,
    TSelect,
    CancelDialog,
    TSelectExtend,
    EdgeDialog,
    TSelectFilter
  },
  async beforeMount () {
    await this.getTypesForSelect()
    this.setIsEdit(true)
  },
  computed: {
    ...mapState('accounts', ['account']),
    ...mapState('documentGraph', ['endpointApollo']),
    Endpoint () {
      return this.endpointApollo
    }
  },
  watch: {
    async Endpoint (newValue, oldValue) {
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
      options: undefined
    }
  },
  methods: {
    ...mapActions('documentGraph', ['getTypes']),
    async getTypesForSelect () {
      try {
        let response = await this.getTypes()
        let data = response['__schema']['types']
        var types = []
        data.forEach(element => {
          if (element.interfaces.length > 0) {
            types.push(element.name)
          }
        })
        this.options = types
      } catch (error) {
        this.showErrorMsg('An error occured while trying to retrieve the document types ' + error)
      }
    },
    async onSave () {
      try {
        if (await this.$refs.contentGroup.validate() && await this.$refs.docTypeSelect.validate()) {
          this.formatContentGroups(this.extendContentGroup)
        } else {
          this.showErrorMsg('Fill the information')
        }
      } catch (error) {
        this.showErrorMsg('An error occured while trying to save the changes ' + error)
      }
    },
    formatContentGroups (contentgroups) {
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
              value: ['name', this.documentType.toLowerCase()]
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
        this.$q.loading.show({
          message: 'Refresh cache'
        })
        await new Promise(resolve => setTimeout(resolve, 1250))
        this.$q.loading.hide()
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
