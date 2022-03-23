<template lang="pug">
div
  q-file(
    data-cy='fileInput'
    v-model='file.data'
    :loading="file.loading"
    :label="label",
    outlined,
    bottom-slots,
    dense,
    :filter="checkFileSize",
    :rules="rules",
    @rejected="onRejected",
    @input="e => handleFile(e)"
  )
    template(v-slot:before)
      div(style="width: 20px; height: 20px")
        svg.h-5.w-5(
          xmlns="http://www.w3.org/2000/svg",
          viewbox="0 0 20 20",
          fill="currentColor"
        )
          path(
            d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          )
    template(v-slot:hint) {{$t('pages.documentExplorer.file.hint')}}
  q-toggle(
    data-cy='encryptToggle'
    size='xs',
    no-hover,
    v-model='file.encrypt',
    label='Encrypt',
    @input='onEncrypt()'
  )
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import BrowserIpfs from '~/services/BrowserIpfs.js'
import Encrypt from '~/utils/EncryptUtil'
export default {
  name: 'TFile',
  props: ['title', 'label', 'size', 'rules', 'encrypted'],
  watch: {
    uploadFile: async function (newVal) {
      if (newVal) {
        await this.uploadFileToIpfs()
      }
    }
  },
  beforeMount () {
    if (this.encrypted.substring(0, 8) === 'eFile://') {
      this.file.encrypt = true
    }
  },
  computed: {
    ...mapState('documentGraph', ['keyToEncrypt', 'uploadFile'])
  },
  data () {
    return {
      file: {
        encrypt: false,
        loading: undefined,
        data: undefined,
        cid: undefined,
        name: undefined
      }
    }
  },
  methods: {
    ...mapMutations('documentGraph', ['setCryptoDialogState', 'setKeyToEncrypt', 'setUploadFile']),
    checkFileSize (files) {
      return files.filter((file) => file.size < 1024000 * 500)
    },
    onRejected (rejectedEntries) {
      this.showErrorMsg(`The file need to be less than 500MB`)
    },
    async handleFile (e) {
      this.file.data = e
    },
    async uploadFileToIpfs () {
      var self = this
      self.file.loading = true
      let file = this.file.data
      try {
        if (!this.keyToEncrypt && this.file.encrypt) {
          this.setCryptoDialogState(true)
          return
        }
        if (this.file.encrypt) file = await Encrypt.encryptFile(file, this.keyToEncrypt, file.name.split('.')[1])
        this.loading = true
        var typeCid = await BrowserIpfs.store(file)
        self.showSuccessMsg('File uploaded success')
        self.file.name = file
        self.file.cid = this.file.encrypt ? 'eFile://' + typeCid : 'File://' + typeCid
        self.setUploadFile(false)
        self.$emit('update', self.file.cid)
      } catch (error) {
        self.showErrorMsg('Error ocurred while file was uploaded. ' + error)
        console.error(error)
      } finally {
        self.file.loading = false
      }
    },
    async onEncrypt () {
      if (!this.keyToEncrypt) {
        this.file.encrypt = false
        this.setCryptoDialogState(true)
        this.showErrorMsg('You need to set a key to encrypt')
      }
    }
  }
}
</script>
<style lang="stylus"></style>
