<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-h6.q-pb-md
    | {{$t('pages.documentExplorer.extend.title')}}
  .row.q-col-gutter-md
    .col-2
      TSelect(
        label='Direction'
        v-model='form.direction'
        :options='options'
        :dense="true"
      )
    .col-4
      TInput(
        label='Edge Name'
        v-model='form.edgeName'
        :dense='true'
      )
  ListContentGroup(:contents_groups="contentsGroups")
  //- Edges(:edges="edges")
  #BtnSection
  .row.q-gutter-md.q-py-xl
    q-btn(
      unelevated
      no-caps
      label='Save'
      class='btnTailwind'
    )
    q-btn(
      unelevated
      no-caps
      label='Cancel'
      @click='onCancel()'
      class='btnTailwind'
    )
</template>

<script>
import DocInformation from '../components/info/DocInformation.vue'
import ListContentGroup from '../components/List/list-content-group.vue'
import Edges from '../components/edges/edges.vue'
import TInput from '~/components/input/t-input.vue'
import TSelect from '~/components/select/t-select.vue'
import { documentExplorer } from '../../../mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    TInput,
    TSelect
  },
  data () {
    return {
      form: {
        edgeName: undefined,
        direction: undefined
      },
      options: [
        'To...', 'From...'
      ]
    }
  },
  methods: {
    onCancel () {
      this.$router.push({ name: 'DocumentExplorer' })
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
