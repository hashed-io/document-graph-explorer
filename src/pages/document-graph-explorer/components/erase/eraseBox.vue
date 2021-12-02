<template lang='pug'>
q-card.text-white(flat).eraseDialog
  q-toolbar.modalTitle
    | {{$t('pages.documentExplorer.erase.titleModal')}}
    q-toolbar-title
  q-separator
  q-card-section.modalWarning
    .row.q-gutter-md
      div(style="width: 5%;")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor")
          path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
      div {{'Unexpect bad things will happen if you don\'t read this!'}}
  q-separator
  q-card-section
    div.text-black.text-subtitle2
      | {{$t('pages.documentExplorer.erase.msg')}} {{docTitle}}
  q-separator
  q-card-section
    div.text-black.text-subtitle2.q-pb-md
      | {{$t('pages.documentExplorer.erase.typeMsg')}}
      b.q-px-xs
        | {{$t('pages.documentExplorer.erase.msgDel')}}
        | {{docTitle}}
      | {{$t('pages.documentExplorer.erase.typeMsgContinue')}}
    TInput(focus label="", dense v-model="eraseInput", color="white" @input='verifyWrite' debounce="500")
  .row.justify-center.q-pb-md
    q-btn(@click='onErase' no-caps outlined  flat :disable='verifyWrite' :label="$t('pages.documentExplorer.erase.btnErase')", style=" color:red")
</template>
<style lang='stylus'>
.eraseDialog
  width: 35%
</style>
<script>
import TInput from '~/components/input/t-input.vue'
export default {
  name: 'EraseBox',
  props: {
    docTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      eraseInput: undefined
    }
  },
  computed: {
    verifyWrite () {
      return !(this.eraseInput === 'document with id ' + this.docTitle)
    }
  },
  methods: {
    onErase () {
      this.showSuccessMsg('The document was erase')
    },
    onCancel () {
      // this.$router.back()
    }
  },
  components: { TInput }
}
</script>
