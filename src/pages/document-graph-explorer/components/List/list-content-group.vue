<template lang='pug'>
div
  div.text-h6.q-py-md.q-py-md Content Groups
  ContentGroup(
    v-for="(content_group, index) in contents_groups",
    :content_group_data="content_group",
    :index_content_group="index"
    :key="content_group+`${index}`"
  )
  q-btn(
    v-if="isEdit"
    unelevated
    label='New content_group'
    no-caps
  ).btnTailwind
</template>

<script>
import ContentGroup from './Element/content-group.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'ListContentsGroup',
  props: {
    contents_groups: {
      type: Object,
      required: true
    }
  },
  components: {
    ContentGroup
  },
  mounted () {
    if (this.getIsEdit) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
  },
  computed: {
    ...mapGetters('documentGraph', ['getIsEdit'])
  },
  data () {
    return {
      isEdit: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.btnTailwind
  border-radius: 10px
  height: 2.5rem
  font-size: 11px
  color:white
  background: #4F46E5
</style>
