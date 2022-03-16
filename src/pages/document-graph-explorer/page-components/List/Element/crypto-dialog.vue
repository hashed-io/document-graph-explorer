<template lang="pug">
q-dialog(v-model="openDialog" persistent)
  q-card(data-cy='cryptoDialog' class="roundCard")
    q-card-section
      .text-h6 Enter key to encrypt and decrypt your data
    q-form(
        @submit="onSubmit"
        class="q-gutter-md"
    )
      q-card-section
        TInput(
          v-model="cryptoKey"
          id='keyInput'
          data-cy='keyInput'
          :type="isPwd ? 'password' : 'text'"
          label="Insert your key"
          :rules="[rules.required]"
        )
          template(v-slot:append )
              q-icon(
                class="cursor-pointer"
                style="top:29%; width:24px; height:24px;"
                @click="isPwd = !isPwd"
              )
                template(v-if="!isPwd")
                  svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                    path(fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd")
                    path(d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z")
                template(v-if="isPwd")
                  svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                    path(d="M10 12a2 2 0 100-4 2 2 0 000 4z")
                    path(fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd")

      q-card-actions(align="right")
        q-btn(
          id='confirmKey'
          data-cy='confirmKey'
          unelevated
          class="btnTailwind"
          :label="$t('common.buttons.confirm')"
          type="submit"
        )
</template>

<script>
import { validation } from '~/mixins/validation'
import TInput from '~/components/input/t-input.vue'
import { mapState } from 'vuex'

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
  beforeMount () {
    this.cryptoKey = this.keyToEncrypt
  },
  computed: {
    ...mapState('documentGraph', ['keyToEncrypt'])
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
  },
  components: { TInput }
}
</script>

<style lang="stylus" scoped>
.roundCard
  border-radius: .5rem !important
</style>
