<template lang="pug">
div.text-h6.q-pt-md
  .row
    div Certificates
  .row
    ListCertificates(v-if='toggle' :certificates="certificates")
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
      toggle: this.show
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>

</style>
