<template lang="pug">
div.text-h6.q-pt-md
  .row
    div Certificates
  .row
    ListCertificates( :certificates="certificates")
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
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>

</style>
