<template lang="pug">
q-card.signDialog
  q-toolbar.modalTitle
    | {{$t('pages.documentExplorer.certify.title')}}
    q-toolbar-title
      q-icon(
        @click="setCryptoDialogState(true)"
        class="cursor-pointer"
      )
        template(v-if="keyToEncrypt" )
          svg(xmlns="http://www.w3.org/2000/svg" class="keyIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z")
    q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
  q-separator
  q-card-section
    q-form(ref='certifyForm').q-px-md
      Tinput(
        data-cy="signature"
        label="Signature"
        class="q-pt-md"
        v-model="form.signature.data"
        placeholder='Signature'
        dense
        type='textarea'
        autogrow
        :rules="[rules.required]"
      )
      q-toggle(
        data-cy='encryptSignatureToggle'
        size='xs',
        no-hover,
        v-model='form.signature.encrypt',
        label='Encrypt',
        @input='onEncryptSignature'
      )
      q-toggle(
        data-cy='ipfsSignatureToggle'
        size='xs',
        v-model='form.signature.ipfs',
        label='IPFS',
      )
      Tinput(
        label="Notes"
        data-cy='notes'
        class="q-pt-md"
        v-model="form.notes.data"
        placeholder='Notes'
        dense
        type='textarea'
        autogrow
        :rules="[rules.required]"
      )
      q-toggle(
        data-cy='encryptNotesToggle'
        size='xs',
        no-hover,
        v-model='form.notes.encrypt',
        label='Encrypt',
        @input='onEncryptNotes'
      )
      q-toggle(
        data-cy='ipfsNotesToggle'
        size='xs',
        v-model='form.notes.ipfs',
        label='IPFS',
      )
      CryptoDialog(:openDialog="cryptoDialog" @close-dialog="onCryptoKey")
  q-card-actions
      q-btn(
        data-cy='certifyActionButton'
        unelevated
        no-caps
        class="btnTailwind q-mt-md"
        label='Certify'
        type='submit'
        @click='onCertify'
      )
</template>
<script>
import BrowserIpfs from '~/services/BrowserIpfs.js'
import Encrypt from '~/utils/EncryptUtil'
import { validation } from '~/mixins/validation'
import Tinput from '~/components/input/t-input.vue'
import CryptoDialog from '~/pages/document-graph-explorer/page-components/List/Element/crypto-dialog.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'CertificateDialog',
  mixins: [validation],
  components: { Tinput, CryptoDialog },
  computed: {
    ...mapState('documentGraph', ['keyToEncrypt'])
  },
  data () {
    return {
      form: {
        signature: {
          data: undefined,
          encrypt: false,
          ipfs: false
        },
        notes: {
          data: undefined,
          encrypt: false,
          ipfs: false
        }
      },
      cryptoDialog: undefined,
      cryptoKey: undefined,
      verifyContentHash: false
    }
  },
  methods: {
    ...mapMutations('documentGraph', ['setCryptoDialogState', 'setKeyToEncrypt']),
    onEncryptSignature () {
      if (!this.keyToEncrypt) {
        this.cryptoDialog = true
      }
    },
    onEncryptNotes () {
      if (!this.keyToEncrypt) {
        this.cryptoDialog = true
      }
    },
    onCryptoKey (key) {
      this.setKeyToEncrypt(key)
      this.cryptoDialog = false
    },
    async encryptData (data) {
      return Encrypt.encryptText(data, this.keyToEncrypt)
    },
    async saveInIPFS (data) {
      return BrowserIpfs.addAsJson({ data: data })
    },
    async onCertify () {
      if (await this.$refs.certifyForm.validate()) {
        this.form.signature.data = await this.processData('signature')
        this.form.notes.data = await this.processData('notes')
        let dataToSave = {
          signature: this.form.signature.data,
          notes: this.form.notes.data
        }
        this.$emit('onCertify', dataToSave)
      }
    },
    async processData (type) {
      let data
      let formData = this.form[type]
      if (formData.encrypt) {
        data = await this.encryptData(formData.data)
      }
      if (formData.ipfs) {
        let dataToSave = formData.encrypt ? data : formData.data
        data = await this.saveInIPFS(dataToSave)
      }
      if (!formData.encrypt && !formData.ipfs) {
        data = formData.data
      }
      return data
    }
  }
}
</script>
<style lang="stylus" scoped>
.modalTitle
  color:black
  font-weight: bolder
  background: #F6F8FA
.keyIcon
  width: 16px
  height: 16px
  margin-left: 5px
@media screen and (max-width: 319px) and (min-width: 30px)
  .signDialog
    width: 100%
@media screen and (max-width: 480px) and (min-width: 320px)
  .signDialog
    width: 100%
@media screen and (max-width: 768px) and (min-width: 481px)
  .signDialog
    width: 85%
@media screen and (max-width: 1024px) and (min-width: 769px)
  .signDialog
    width: 65%
@media screen and (max-width: 1400px) and (min-width: 1025px)
  .signDialog
    width: 60%
@media screen and (min-width: 1401px)
  .signDialog
    width: 65%
</style>
