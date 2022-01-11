<template lang='pug'>
div
  div.text-h6.q-pb-md
    | {{$t('pages.documentExplorer.erase.title')}}
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges")
  div.q-py-md
    EraseBox
</template>

<script>
import DocInformation from '../page-components/info/DocInformation.vue'
import ListContentGroup from '../page-components/List/list-content-group.vue'
import Edges from '../page-components/edges/edges.vue'
import EraseBox from '../page-components/erase/eraseBox.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [documentExplorer],
  components: {
    DocInformation,
    ListContentGroup,
    Edges,
    EraseBox
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='stylus'>
</style>
