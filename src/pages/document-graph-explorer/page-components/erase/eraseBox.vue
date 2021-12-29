<template lang='pug'>
q-card.text-white(flat).eraseDialog
  q-toolbar.modalTitle
    | {{$t('pages.documentExplorer.erase.titleModal')}}
    q-toolbar-title
  q-separator
  q-card-section.modalWarning
    .flex.flex-start.no-wrap
      svg(xmlns="http://www.w3.org/2000/svg" fill="none" class='svg q-mr-md' viewBox="0 0 24 24" stroke="currentColor")
        path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
      div(class="wargningText") {{$t('pages.documentExplorer.erase.warning')}}
  q-separator
  q-card-section
    div.text-black.text-subtitle2
      | {{$t('pages.documentExplorer.erase.msg')}} {{(systemNodeLabel === undefined) ?  docTitle : systemNodeLabel}}
  q-separator
  q-card-section
    div.text-black.text-subtitle2.q-pb-md
      | {{$t('pages.documentExplorer.erase.typeMsg')}}
      b.q-px-xs
        | {{$t('pages.documentExplorer.erase.msgDel')}}
        | {{(systemNodeLabel === undefined) ?  docTitle : systemNodeLabel}}
      | {{$t('pages.documentExplorer.erase.typeMsgContinue')}}
    TInput(focus label="", dense v-model="eraseInput", color="white" @input='verifyWrite' debounce="500")
  .row.justify-center.q-pb-md
    q-btn(@click='onErase' no-caps outlined  flat :disable='verifyWrite' :label="$t('pages.documentExplorer.erase.btnErase')", style=" color:red")
</template>
<style lang='stylus'>
.svg
  width: 5%
@media screen and (max-width: 319px) and (min-width: 30px)
  .eraseDialog
    width: 100%
@media screen and (max-width: 480px) and (min-width: 320px)
  .eraseDialog
    width: 100%
@media screen and (max-width: 768px) and (min-width: 481px)
  .eraseDialog
    width: 85%
@media screen and (max-width: 1024px) and (min-width: 769px)
  .eraseDialog
    width: 65%
@media screen and (max-width: 1400px) and (min-width: 1025px)
  .eraseDialog
    width: 40%
@media screen and (min-width: 1401px)
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
    },
    systemNodeLabel: {
      type: String,
      required: false,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {
      eraseInput: undefined
    }
  },
  computed: {
    verifyWrite () {
      if (this.systemNodeLabel === undefined) {
        // docTitle
        return !(this.eraseInput === 'document ' + this.docTitle)
      } else {
        // SystemNodeLabel
        return !(this.eraseInput === 'document ' + this.systemNodeLabel)
      }
    }
  },
  methods: {
    onErase () {
      this.$emit('onErase', true)
    },
    onCancel () {
      // this.$router.back()
    }
  },
  components: { TInput }
}
</script>
