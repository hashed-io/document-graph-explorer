<template lang='pug'>
q-card.text-white(flat, style="background: #f87171")
  q-card-section
    div.text-black.text-subtitle2.q-py-md
      | {{ 'This action is irreversible. If you are sure you want to Erase document `Girl Scout Cookies Cannabis (689298)`, type in "ERASE" and click the Erase button.' }}
    TInput(focus label="", v-model="eraseInput", color="white" @input='verifyWrite' debounce="500")
  q-card-actions
    q-btn(@click='onErase' :disable='verifyWrite' label="erase", style="background: #08183c")
    q-btn(@click='onCancel' label="cancel", style="background: #08183c")
</template>
<style lang='stylus'></style>
<script>
import TInput from '~/components/input/t-input.vue'
export default {
  name: 'EraseBox',
  data () {
    return {
      eraseInput: undefined
    }
  },
  computed: {
    verifyWrite () {
      return !(this.eraseInput === 'ERASE')
    }
  },
  methods: {
    onErase () {
      this.showSuccessMsg('The document was erase')
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: { TInput }
}
</script>
