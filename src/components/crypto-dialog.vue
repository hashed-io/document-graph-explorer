<template lang="pug">
q-dialog(v-model="openDialog" persistent)
  q-card(data-cy='cryptoDialog')
    q-card-section
      .text-h6 Enter key to encrypt and decrypt your data
    q-form(
        @submit="onSubmit"
        class="q-gutter-md"
    )
      q-card-section
        q-input(
          v-model="cryptoKey"
          id='keyInput'
          data-cy='keyInput'
          filled
          :type="isPwd ? 'password' : 'text'"
          label="Insert your key"
          :rules="[rules.required]"
        )
          template(v-slot:append)
            q-icon(
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
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
      cryptoKey: undefined,
      isPwd: true
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
