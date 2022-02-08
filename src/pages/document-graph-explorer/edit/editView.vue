<template lang='pug'>
div
  div(v-if="loading" class="center")
    q-spinner-tail(
      data-cy="spinner"
      class="text-brand-primary"
      size="1.5em"
    )

  div(v-if="!loading")
    DocInformation(:docInfo="documentInfo" :title="$t('pages.documentExplorer.edit.title')")
    q-form(ref='contentGroup')
      ListContentGroup(:contents_groups="contentsGroups")
    Edges(:edges="edges" @showModal="openModal")
    q-dialog(
      v-model='showDialogEdge'
      transition-show="fade"
      transition-hide="fade"
    )
      EdgeDialog(@EdgeData='addNewEdge')
    #BtnSection
    .row.q-gutter-md.q-py-md
      q-btn(
        data-cy='saveDoc'
        unelevated
        label='Save'
        no-caps
        class="btnTailwind"
        @click='onSave()'
      )
      q-btn(
        data-cy='cancelDoc'
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
import { mapActions, mapState } from 'vuex'
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
      currentEndpoint: undefined,
      openDialog: false
    }
  },
  computed: {
    ...mapState('documentGraph', ['document']),
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
  methods: {
    ...mapActions('documentGraph', ['getLocalStorage']),
    async onSave () {
      try {
        if (await this.$refs.contentGroup.validate()) {
          this.formatContentGroups(this.contentsGroups)
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
            if (element.value !== '') {
              contentGroup.push({
                label: key,
                value: [types[element.dataType], element.value]
              })
            }
          })
          contentGroups.push(contentGroup)
          contentGroup = []
        }
        this.callEditAction(contentGroups)
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to format the content groups ' + error)
      }
    },
    async callEditAction (contentGroups) {
      try {
        await this.newInstance()
        let documentID = this.documentInfo.docId
        await this.ActionsApi.editDoc({ documentID, contentGroups })
        let apiEndpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
        this.currentEndpoint = apiEndpoint
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.setIsEdit(false)
        await this.showSuccessMsg('The changes was saved')
        this.loadData()
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: this.documentInfo.docId, endpoint: this.currentEndpoint } })
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to edit the doc ' + error)
      }
    },
    openModal () {
      this.showDialogEdge = true
    },
    async addNewEdge (form) {
      await this.newInstance()
      let fromNode = this.document.docId
      let toNode = form.direction
      let edgeName = form.edgeName
      let creator = this.account
      await this.ActionsApi.createEdge({ fromNode, toNode, edgeName, creator })
      this.showDialogEdge = false
      this.$q.loading.show({
        message: 'Waiting doc cache'
      })
      await new Promise(resolve => setTimeout(resolve, 1250))
      this.loadData()
      this.$q.loading.hide()
    },
    async onCancel () {
      this.setIsEdit(false)
      let apiEndpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
      this.currentEndpoint = apiEndpoint
      this.$router.push({ name: 'DocumentExplorer', query: { document_id: this.documentInfo.docId, endpoint: this.currentEndpoint } })
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
