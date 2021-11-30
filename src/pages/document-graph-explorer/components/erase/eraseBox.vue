<template lang='pug'>
q-card.text-white(flat)
  q-toolbar.modalTitle
    | {{$t('pages.documentExplorer.erase.titleModal')}}
    q-toolbar-title
  q-card-section.modalWarning
    | {{'Unexpect bad things will happen if you don\'t read this!'}}
  q-card-section
    div.text-black.text-subtitle2.q-py-md
      //- | {{ 'This action is irreversible. If you are sure you want to Erase document `Girl Scout Cookies Cannabis (689298)`, type in "ERASE" and click the Erase button.' }}
      | {{$t('pages.documentExplorer.erase.msg')}} {{docTitle}}
      br
      | {{$t('pages.documentExplorer.erase.typeMsg')}}
      b.q-px-xs
        | {{$t('pages.documentExplorer.erase.msgDel')}}
        | {{docTitle}}
      | {{$t('pages.documentExplorer.erase.typeMsgContinue')}}
    TInput(focus label="", v-model="eraseInput", color="white" @input='verifyWrite' debounce="500")
  .row.justify-center.q-pb-md
    q-btn(@click='onErase'  outlined  flat :disable='verifyWrite' :label="$t('pages.documentExplorer.erase.btnErase')", style=" color:red")
</template>
<style lang='stylus'></style>
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
