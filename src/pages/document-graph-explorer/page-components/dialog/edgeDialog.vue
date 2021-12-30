<template lang="pug">
#NewEdgeDialog
  q-card.cardTailWind
    q-toolbar
      q-toolbar-title New Edge Form
      q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
    q-card-section.modalInfo
      .flex.flex-start.no-wrap
        div(style="width: 5%;" class="q-mr-md")
          svg(xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z")
        div {{$t('pages.documentExplorer.edit.edges.modal')}}
    q-separator
    q-card-section
      q-form(ref='edgeForm' @submit="addEdge").q-px-md
        Tinput(
          class="q-pt-md"
          v-model="form.direction"
          placeholder='Enter the identifier of the document'
          dense
          :rules="[rules.required]"
        )
        Tinput(
          class="q-pt-md"
          v-model="form.edgeName"
          placeholder='Edge Name'
          dense
          :rules="[rules.required]"
        )
        q-btn(
          unelevated
          no-caps
          class="btnTailwind q-mt-md"
          label='Add edge'
          type='submit'
        )
</template>

<script>
import Tinput from '~/components/input/t-input'
import TSelectEdge from '~/components/select/TSelectEdge.vue'
import { validation } from '~/mixins/validation'
export default {
  name: 'EdgeDialog',
  mixins: [validation],
  components: {
    Tinput,
    TSelectEdge
  },
  data () {
    return {
      form: {
        createdDate: '2021-12-10T19:06:11.5Z',
        creator: undefined,
        direction: undefined,
        docId: undefined,
        docId_i: undefined,
        edgeName: undefined,
        hash: undefined,
        system_nodeLabel_s: undefined,
        type: undefined,
        edge: undefined
      },
      options: [
        {
          label: '10',
          value: '10'
        },
        {
          label: '9',
          value: '9'
        },
        {
          label: '8',
          value: '8'
        },
        {
          label: '7',
          value: '7'
        }
      ]
    }
  },
  methods: {
    addEdge () {
      this.$refs.edgeForm.validate().then(success => {
        if (success) {
          /**
           * If the form is valid, this action will send the form to the parent component and call the action create edge
           */
          this.$emit('EdgeData', this.form)
        } else {
          this.showErrorMsg('Form')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@media screen and (max-width: 319px) and (min-width: 30px)
  .cardTailWind
    border-radius: 10px !important
    width 500px
@media screen and (max-width: 480px) and (min-width: 320px)
  .cardTailWind
    border-radius: 10px !important
    width 100%
@media screen and (max-width: 768px) and (min-width: 481px)
  .cardTailWind
    border-radius: 10px !important
    width 100%
@media screen and (max-width: 1024px) and (min-width: 769px)
  .cardTailWind
    border-radius: 10px !important
    width 400px
@media screen and (max-width: 1400px) and (min-width: 1025px)
  .cardTailWind
    border-radius: 10px !important
    width 400px
@media screen and (min-width: 1401px)
  .cardTailWind
    border-radius: 10px !important
    width 500px
</style>
