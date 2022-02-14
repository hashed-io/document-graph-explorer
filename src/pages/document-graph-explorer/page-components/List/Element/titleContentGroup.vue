<template lang="pug">
div(v-if="isEdit")
  #Title
    template(v-if="!editableTitle")
      .row.justify-start.q-pb-md
          div.q-px-md.color {{title}}
          div(
            data-cy='editTitleButton'
            v-if="!isEditSystem && title !== 'system'"
            class='text-brand-primary text-capitalize animated-icon customAlign'
            @click='editableTitle = true; previousTitle = title'
          ) Edit
    .row.q-py-lg(v-if="editableTitle")
      .col-xs-12.col-sm-6
        TInput(
          data-cy='titleInput'
          label='Title'
          placeholder="Enter the title"
          v-model='titleContent'
          autofocus
          dense
          :inputFormatting="true"
          :debounce="200"
          :rules="[rules.required, rules.validContent, rules.contentLength]"
        ).q-pr-md
      .col-xs-12.col-sm-5
        .row.q-col-gutter-md
          .col-xs-6.col-sm-2.col-md-2
            div(
              data-cy='saveTitleButton'
              class='text-brand-primary text-capitalize animated-icon alignButtons'
              @click='onSaveTitle'
            ) Save
          .col-xs-6.col-sm-1.col-md-1
            div(
              data-cy="deleteTitleButton"
              class='text-red-tail text-capitalize animated-icon alignButtons'
              @click='onDeleteTitle'
            ) Delete
div(
  v-else
  class="q-pb-md q-pl-md fontSize titleClass"
  ) {{this.camelCaseToFormat(title).toLowerCase()}}
</template>
<script>
import { validation } from '~/mixins/validation'
import TInput from '~/components/input/t-input.vue'
export default {
  name: 'TitleContentGroup',
  mixins: [validation],
  components: { TInput },
  props: {
    title: {
      type: String,
      required: true
    },
    isEditSystem: {
      type: Boolean,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      editableTitle: false,
      titleContent: this.title,
      previousTitle: undefined
    }
  },
  methods: {
    // TODO: Apply lower case & underscore
    onSaveTitle () {
      let bool = this.$parent.$parent.titleIsRepeated({ prev: this.previousTitle, current: this.titleContent })
      if (bool) {
        this.editableTitle = false
      }
      this.$forceUpdate()
    },
    onDeleteTitle () {
      this.$emit('deleteTitle', this.titleContent)
    }
  }
}
</script>
<style lang="stylus" scoped>
.color
  color: #686E7C
  font-weight: 500
.alignButtons
  margin-top: 1.9rem
.text-red-tail
  color: #DC2626
</style>
