<template lang='pug'>
div
  div(v-show="loading" class="center")
    q-spinner-tail(
      color="indigo"
      size="1.5em"
    )

  div(v-show="!loading")
    BackComponent
    DocInformation(:docInfo="documentInfo" :title="$t('pages.documentExplorer.explorer.title')")
    ListContentGroup(:contents_groups="contentsGroups")
    Edges(:edges="edges" @edgeData="navigateToEdge" @edgeDataPrev="navigateToEdgePrev")
    CertificateSection(
      v-show="certificates.length > 0"
      :certificates='certificates'
      show
    )
    ActionsButtons(
      :docInfo="documentInfo"
      @extend='extendDocument'
      @edit='editDocument'
      @erase='eraseDocument'
      @certificate='openCertificateModal'
      )
    q-dialog(
      v-model='deleteDocument'
    ).eraseDialog
      EraseBox(
        :docTitle="documentInfo.docId"
        :systemNodeLabel="documentInfo.systemNodeLabel"
        @onErase='callErase'
      )
    q-dialog(
      v-model='signDocument'
    )
      CertificateDialog(@onCertify='onCertify')
</template>

<script>
import DocInformation from '../page-components/info/DocInformation.vue'
import ListContentGroup from '../page-components/List/list-content-group.vue'
import Edges from '../page-components/edges/edges.vue'
import EraseBox from '../page-components/erase/eraseBox.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import BackComponent from '~/components/backButton/backComponent.vue'
import ActionsButtons from '../page-components/actions/actionsButtons.vue'
import ListCertificates from '../page-components/certificates/list/ListCertificates.vue'
import CertificateDialog from '../page-components/certificates/certificateDialog/certificateDialog.vue'
import CertificateSection from '../page-components/certificates/certificateSection.vue'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EraseBox,
    BackComponent,
    ActionsButtons,
    ListCertificates,
    CertificateDialog,
    CertificateSection
  },
  watch: {
    async $route (to, from) {
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    async Endpoint (newValue, oldValue) {
      this.$router.push({ name: 'listDocs', query: { endpoint: newValue } })
    }
  },
  data () {
    return {
      deleteDocument: false,
      ActionsApi: undefined,
      signDocument: false
    }
  },
  async mounted () {
  },
  computed: {
    ...mapGetters('accounts', ['account']),
    ...mapState('documentGraph', ['isHashed', 'documentInterface']),
    ...mapState('documentGraph', ['document']),
    ...mapState('documentGraph', ['endpointApollo']),
    Endpoint () {
      return this.endpointApollo
    }
  },
  methods: {
    ...mapActions('documentGraph', ['getDocumentsByDocId']),
    ...mapMutations('documentGraph', ['pushDocNavigation', 'popDocNavigation', 'addInformation']),
    ...mapMutations('documentGraph', ['setContractInfo']),
    ...mapActions('documentGraph', ['deleteDoc']),
    navigateToEdge (edgeData) {
      this.setDocument(edgeData)
      let data = JSON.parse(JSON.stringify(this.documentInfo))
      delete data.creator
      delete data.system_nodeLabel_s
      delete data.updatedDate
      this.pushDocNavigation(data)
      this.addInformation({
        label: 'edgeName',
        value: edgeData.edgeName
      })
      if (this.isHashed) {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.hash, endpoint: this.endpoint } })
      } else {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.docId, endpoint: this.endpoint } })
      }
    },
    navigateToEdgePrev (edgeData) {
      this.popDocNavigation()
      this.setDocument(edgeData)
      if (this.isHashed) {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.hash, endpoint: this.endpoint } })
      } else {
        this.$router.push({ name: 'DocumentExplorer', query: { document_id: edgeData.docId, endpoint: this.endpoint } })
      }
    },
    extendDocument () {
      this.setIsEdit(true)
      this.$router.push({ name: 'extendDoc', query: { document_id: this.$route.query.document_id } })
    },
    editDocument () {
      this.setIsEdit(true)
      this.$router.push({ name: 'editDoc', query: { document_id: this.$route.query.document_id } })
    },
    eraseDocument () {
      this.deleteDocument = true
    },
    async callErase () {
      // CALL ACTION TO DELETE ALL DOCUMENT
      try {
        await this.newInstance()
        let docID = this.document.docId
        await this.ActionsApi.deleteDoc({ documentID: docID })
        this.showSuccessMsg('The document was erase')
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying to delete document ' + error)
      }
    },
    openCertificateModal () {
      // TODO: Open a modal to fill sign data
      this.signDocument = true
    },
    async onCertify (objDialog) {
      try {
        await this.newInstance()
        await this.ActionsApi.certifyDoc({
          documentID: this.documentInfo.docId,
          certifier: this.account,
          signature: objDialog.signature,
          notes: objDialog.notes
        })
        this.signDocument = false
        this.showSuccessMsg('The document was certify correctly')
      } catch (error) {
        this.showErrorMsg('An error ocurred while trying certify the doc ' + error)
        console.log('An error ocurred while trying certify the doc ' + error)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.certificates
  width: 100% !important
.expansionItem
  border-radius: 10px !important
.center
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
.btnTailwind
  width: 120px
  font-size: 14px !important
</style>
