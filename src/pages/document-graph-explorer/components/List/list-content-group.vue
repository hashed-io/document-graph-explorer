<template lang='pug'>
div
  div.q-py-md(:class="classes.titleSection") Content Groups
  ContentGroup(
    v-for="(content_group, index) in contents_groups",
    :content_group_data="content_group",
    :index_content_group="index"
    :key="content_group+`${index}`"
  )
  q-btn(
    v-if="isEdit"
    unelevated
    color='primary'
    label='New content_group'
  )
</template>

<script>
import ContentGroup from './Element/content-group.vue'
import { cssClasses } from 'src/mixins/css-class.js'
import { mapGetters } from 'vuex'
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
  mounted () {
    if (this.getIsEdit()) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    alert(this.getIsEdit())
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

<style>
</style>
