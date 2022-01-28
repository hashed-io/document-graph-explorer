<template lang="pug">
q-card.cardTailWind
  q-toolbar.modalTitle
    | {{$t('pages.documentExplorer.edges.create')}}
    q-toolbar-title
    q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
  q-separator
  q-card-section
    q-form(ref='edgeForm' @submit="addEdge").q-px-md
      Tinput(
        label='Edge'
        v-model="form.edgeName"
        placeholder='Edge'
        dense
        :rules="[rules.required]"
      )
      SelectorDoc(
        class="q-mt-md"
        @onSelectDoc="onReceiveDocId"
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
import SelectorDoc from './table/selectorDoc.vue'
export default {
  name: 'EdgeDialog',
  mixins: [validation],
  components: {
    Tinput,
    TSelectEdge,
    SelectorDoc
  },
  data () {
    return {
      form: {
        createdDate: undefined,
        creator: undefined,
        direction: undefined,
        docId: undefined,
        docId_i: undefined,
        edgeName: undefined,
        hash: undefined,
        system_nodeLabel_s: undefined,
        type: undefined,
        edge: undefined
      }
    }
  },
  methods: {
    addEdge () {
      this.$refs.edgeForm.validate().then(success => {
        if (success && this.form.direction) {
          /**
           * If the form is valid, this action will send the form to the parent component and call the action create edge
           */
          this.$emit('EdgeData', this.form)
        } else {
          this.showErrorMsg('Choose a document')
        }
      })
    },
    onReceiveDocId (docId) {
      this.form.direction = docId
    }
  }
}
</script>

<style lang="stylus" scoped>
.modalTitle
  color:black
  font-weight: bolder
  background: #F6F8FA
@media screen and (max-width: 319px) and (min-width: 30px)
  .cardTailWind
    border-radius: 10px !important
    width 500px
@media screen and (max-width: 480px) and (min-width: 320px)
  .cardTailWind
    border-radius: 10px !important
    width: 500px
    max-width: 70vw
@media screen and (max-width: 768px) and (min-width: 481px)
  .cardTailWind
    border-radius: 10px !important
    width: 600px
    max-width: 80vw
@media screen and (max-width: 1024px) and (min-width: 769px)
  .cardTailWind
    border-radius: 10px !important
    width: 700px
    max-width: 90vw
@media screen and (max-width: 1400px) and (min-width: 1025px)
  .cardTailWind
    border-radius: 10px !important
    width: 1100px
    max-width: 95vw
@media screen and (min-width: 1401px)
  .cardTailWind
    border-radius: 10px !important
    width: 1200px
    max-width: 90vw
</style>
