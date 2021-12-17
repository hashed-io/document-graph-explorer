<template lang='pug'>
div
  //- DocInformation(:docInfo="documentInfo")
  .text-h6.q-pb-md
    | {{$t('pages.documentExplorer.extend.title')}}
  .row.q-col-gutter-md
    .col-2
      TSelect(
        v-model='form.direction'
        :options='options'
        :dense="true"
      )
    .col-4
      TInput(
        placeholder='Edge name'
        v-model='form.edgeName'
        :dense='true'
      )
  ListContentGroup(:contents_groups="contentsGroups")
  //- Edges(:edges="edges")
  #BtnSection
  .row.q-gutter-md.q-py-sm
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
    //- CancelDialog(:show="openDialog" @close='onCancelModal' @ok='onOkModal')
</template>

<script>
import DocInformation from '../page-components/info/DocInformation.vue'
import ListContentGroup from '../page-components/List/list-content-group.vue'
import Edges from '../page-components/edges/edges.vue'
import TInput from '~/components/input/t-input.vue'
import TSelect from '~/components/select/t-select.vue'
import CancelDialog from '../page-components/cancel/cancelDialog.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    TInput,
    TSelect,
    CancelDialog
  },
  data () {
    return {
      openDialog: false,
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
      this.openDialog = true
      this.setIsEdit(false)
      this.$forceUpdate()
      this.$router.push({ name: 'DocumentExplorer' })
    },
    onCancelModal () {
      this.openDialog = false
      this.$forceUpdate()
    },
    onOkModal () {
      this.openDialog = false
      this.setIsEdit(false)
      this.$router.push({ name: 'DocumentExplorer' })
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
