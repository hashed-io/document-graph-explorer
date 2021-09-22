<template lang='pug'>
  .text-subtitle1.q-px-xs Articles Details
    hr
    div(v-if='elementsObj.length === 0')
      p    No Additional Articles Identified...
    div(v-else)
      q-list
        div(v-for='(article, index) in elementsObj')
          template
            q-item
              q-item-section(top class='col-2')
                q-item-label(lines='2')
                  span.text-caption
                    strong
                      | Article: &nbsp; #
                    b {{article.number}}
              q-item-section(top class="col-8")
                q-item-label( lines='30')
                  span.text-caption
                    strong(style='color:black;')
                      p
                        | Detail: &nbsp;
                    div(align='justify') {{article.detail}}
              q-item-section(v-if='actions' side class='col-2' align='left')
                q-btn(size='12px', flat dense, round, icon='delete' @click='deleteElement(index)')
                q-btn(size='12px', flat, dense, round, icon='edit' @click='editElement(index, article)')
</template>

<script>
export default {
  name: 'articlesListComponent',
  props: {
    elementsObj: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    deleteElement (index) {
      this.$emit('deleteElement', index)
    },
    editElement (index, article) {
      this.$emit('editElement', index, article)
    }
  }
}
</script>

<style>

</style>
