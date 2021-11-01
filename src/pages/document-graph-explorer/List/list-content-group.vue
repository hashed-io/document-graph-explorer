<template lang='pug'>
div
  div.q-py-md(:class="classes.titleSection") Content Groups
  ContentGroup(
    v-for="(content_group, index) in contents_groups",
    :content_group_data="content_group",
    :index_content_group="index"
  )
</template>

<script>
import ContentGroup from './Element/content-group.vue'
import { cssClasses } from 'src/mixins/css-class.js'
export default {
  name: 'ListContentsGroup',
  props: {
    contents_groups: {
      type: Array,
      required: true
    }
  },
  components: {
    ContentGroup
  },
  mixins: [cssClasses],
  data () {
    return {}
  }
}
</script>

<style>
</style>
