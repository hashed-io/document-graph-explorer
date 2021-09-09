<template lang='pug'>
  #container
    div.q-px-xl
      .row
        .col-11.q-py-md.text-h6 Manage Contracts
        .col-1.q-py-md
          q-btn(label='back' color="primary" @click="$router.push('dashboard')")
      managedao(:dao="SelectedDao")
</template>

<script>
import { mapState } from 'vuex'
import managedao from './listContracts.vue'
export default {
  name: 'manageContract',
  components: { managedao },
  beforeMount () {
    this.setDAO()
  },
  computed: {
    ...mapState('dao', ['selectedDAO'])
  },
  data () {
    return {
      SelectedDao: null
    }
  },
  methods: {
    setDAO () {
      this.SelectedDao = JSON.parse(JSON.stringify(this.selectedDAO))
    }
  }
}
</script>

<style>

</style>
