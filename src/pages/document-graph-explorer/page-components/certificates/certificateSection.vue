<template lang="pug">
div.text-h6.q-pt-md
  .row.cursor-pointer(@click='toggleCertificates')
      div Certificates
      q-icon(
        class="animated-icon q-pt-xs"
        :name="toggle ? 'arrow_drop_up': 'arrow_drop_down'"
        size='sm'
        color='indigo-8'
      )
  div()
    transition(
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    )
      ListCertificates(v-if='toggle' :certificates="propsCertificates")
</template>
<script>
import ListCertificates from './list/ListCertificates.vue'
export default {
  name: 'CertificateSection',
  components: { ListCertificates },
  props: {
    /**
     * Contains the data of each certificate
     * Array of Object
     */
    certificates: {
      type: Array,
      required: false
    },
    /**
     * The props control if the certificates are shown or not
     */
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      propsCertificates: this.certificates,
      toggle: this.show
    }
  },
  methods: {
    toggleCertificates () {
      this.toggle = !this.toggle
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
