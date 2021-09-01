<template lang="pug">
q-card.q-pa-md.medium-width
  q-card-section(if="fields")
    div(v-for="field in fields")
      .row
        .col
          .text {{ field.fieldName }}
        .col
          .text {{ field.type }}
        .col
          .text {{ field.value }}
      q-separator
  q-form(@submit="onAddField" @reset="onReset" ref="form")
    q-card-section
      .row
        .col.q-mr-sm
          q-input(
            outlined
            stack-label
            v-model="params.fieldName"
            label="Field Name"
            :rules="[rules.required]"
          )
        .col.q-mr-sm
          q-input(
            outlined
            stack-label
            v-model="params.type"
            label="Type"
            :rules="[rules.required]"
          )
        .col
          q-input(
            outlined
            stack-label
            v-model="params.value"
            label="Value"
            :rules="[rules.required]"
          )
    .q-card-actions(vertical align="right")
      q-btn(
        label="Add Field"
        outline
        color="primary"
        type="submit"
      ).q-mr-sm
      q-btn(
        label="Save"
        outline
        color="primary"
        @click="onSave"
      )
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'managecontract',
  mixins: [validation],
  props: {
    dao: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      params: {
        fieldName: undefined,
        type: undefined,
        value: undefined
      },
      fields: []
    }
  },
  methods: {
    onSave () {
      console.log('On Save')
    },
    async onAddField () {
      console.log()
      if (await this.$refs.form.validate()) {
        this.fields.push({ ...this.params })
        this.onReset()
        this.$refs.form.reset()
      }
    },
    onReset () {
      this.params.fieldName = ''
      this.params.type = ''
      this.params.value = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.medium-width
  width: 50vw !important
  max-width: 50vw !important
</style>
