<template lang='pug'>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'accountInfo',
  computed: {
    ...mapState('accounts', ['account'])
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
