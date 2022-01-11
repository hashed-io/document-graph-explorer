<template lang="pug">
q-card.signDialog
  q-toolbar
    q-toolbar-title Certify Form
      template(v-if="cryptoKey" )
        svg(xmlns="http://www.w3.org/2000/svg" class="keyIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z")
    q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
  q-card-section
    q-form(ref='edgeForm' @submit="signDoc").q-px-md
      Tinput(
        data-cy="signature"
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
        @input='onIpfsSignature'
      )
      Tinput(
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
        @input='onIpfsNotes'
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
export default {
  name: 'CertificateDialog',
  mixins: [validation],
  components: { Tinput, CryptoDialog },
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
    signDoc () {

    },
    onEncryptSignature () {
      if (!this.cryptoKey) {
        this.cryptoDialog = true
      } else {
        let value = this.form.signature.data
        this.form.signature.data = Encrypt.encryptText(value, this.cryptoKey)
      }
    },
    onEncryptNotes () {
      if (!this.cryptoKey) {
        this.cryptoDialog = true
      } else {
        let value = this.form.signature.data
        this.form.notes.data = Encrypt.encryptText(value, this.cryptoKey)
      }
    },
    async onIpfsSignature () {
      this.$q.loading.show({
        message: 'Saving in IPFS...'
      })
      try {
        let value = this.form.signature.data
        var ipfsString = await BrowserIpfs.addAsJson({ data: value })
      } catch (e) {
        this.showErrorMsg('Error occurred while data was saving in IPFS. ' + e)
      } finally {
        this.$q.loading.hide()
      }
      this.form.signature.data = ipfsString
    },
    async onIpfsNotes () {
      this.$q.loading.show({
        message: 'Saving in IPFS...'
      })
      try {
        let value = this.form.notes.data
        var ipfsString = await BrowserIpfs.addAsJson({ data: value })
      } catch (e) {
        this.showErrorMsg('Error occurred while data was saving in IPFS. ' + e)
      } finally {
        this.$q.loading.hide()
      }
      this.form.notes.data = ipfsString
    },
    onCryptoKey (key) {
      this.cryptoKey = key
      this.cryptoDialog = false
      if (this.form.signature.encrypt) {
        this.onEncryptSignature()
        this.$nextTick()
      } else {
        this.onEncryptNotes()
        this.$nextTick()
      }
    },
    async onCertify () {
      let dataToSave = {
        signature: this.form.signature.data,
        notes: this.form.notes.data
      }
      this.$emit('onCertify', dataToSave)
    }
  }
}
</script>
<style lang="stylus" scoped>
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
