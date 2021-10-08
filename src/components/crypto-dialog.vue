<template lang="pug">
q-dialog(v-model="openDialog" persistent)
  q-card
    q-card-section
      .text-h6 Enter key to encrypt and decrypt your data
    q-form(
        @submit="onSubmit"
        class="q-gutter-md"
    )
      q-card-section
        q-input(
          v-model.trim="cryptoKey"
          id='keyInput'
          data-cy='keyInput'
          filled
          label="Insert your key"
          :rules="[rules.required]"
        )
      q-card-actions(align="right")
        q-btn(
          color="primary"
          id='confirmKey'
          data-cy='confirmKey'
          :label="$t('common.buttons.confirm')"
          type="submit"
        )
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'crypto-dialog',
  mixins: [validation],
  props: {
    openDialog: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cryptoKey: undefined
    }
  },
  methods: {
    onSubmit () {
      this.$emit('close-dialog', this.cryptoKey)
    }
  }
}
</script>

<style>

</style>
