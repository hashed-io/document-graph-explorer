<template lang='pug'>
q-dialog(
  v-model='show'
  persistent
)
  q-card(
    class="eraseDialog"
  )
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
      div.text-black.text-subtitle1.q-py-md
        | {{$t('pages.documentExplorer.edit.cancel.text')}}
    template()
      div(class='q-pa-md')
        .row.q-gutter-sm.justify-start
          q-btn(
            @click='onOk'
            class="btnTailwind"
            label= 'Ok'
          )
          q-btn(
            @click='onCancel'
            class="btnTailwind"
            label= 'Cancel'
          )
</template>

<script>
export default {
  name: 'CancelDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onCancel () {
      this.$emit('close', true)
    },
    onOk () {
      this.$emit('ok', true)
    }
  }
}
</script>

<style lang="stylus">
.eraseDialog
  width: 35%

</style>
