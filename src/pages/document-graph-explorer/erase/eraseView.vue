<template lang='pug'>
div
  DocInformation(:docInfo="documentInfo")
  ListContentGroup(:contents_groups="contentsGroups")
  Edges(:edges="edges" :relations="relationsEdges")
  div.q-py-md
    EraseBox
</template>

<script>
import { cssClasses } from '~/mixins/css-class.js'
import DocInformation from '../components/info/DocInformation.vue'
import ListContentGroup from '../components/List/list-content-group.vue'
import Edges from '../components/edges/edges.vue'
import EraseBox from '../components/erase/eraseBox.vue'
import { documentExplorer } from '~/mixins/documentExplorer'
export default {
  name: 'DocumentExplorer',
  mixins: [cssClasses, documentExplorer],
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
