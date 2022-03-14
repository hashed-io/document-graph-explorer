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
    @rejected="onRejected",
    @input="e => handleFileUpload(e)"
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
  props: ['title', 'label', 'size'],
  computed: {
    ...mapState('documentGraph', ['keyToEncrypt'])
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
    ...mapMutations('documentGraph', ['setCryptoDialogState', 'setKeyToEncrypt']),
    checkFileSize (files) {
      return files.filter((file) => file.size < 1024000 * 500)
    },
    onRejected (rejectedEntries) {
      this.showErrorMsg(`The file need to be less than 500MB`)
    },
    async handleFileUpload (e) {
      var self = this
      self.file.loading = true
      try {
        if (this.file.encrypt) e = await Encrypt.encryptFile(e, this.keyToEncrypt, e.name.split('.')[1])
        this.loading = true
        var typeCid = await BrowserIpfs.store(e)
      } catch (e) {
        self.showErrorMsg('Error ocurred while file was uploaded. ' + e)
        console.error(e)
      } finally {
        self.showSuccessMsg('File uploaded success')
        self.file.loading = false
        self.file.name = e
        self.file.cid = 'file://' + typeCid
      }
      this.$emit('update', self.file)
    },
    async onEncrypt () {
      if (!this.keyToEncrypt) {
        this.setCryptoDialogState(true)
        this.showErrorMsg('You need to set a key to encrypt')
      } else {
        this.handleFileUpload(this.file.data)
      }
    }
  }
}
</script>
<style lang="stylus"></style>
