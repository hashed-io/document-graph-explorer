<template lang='pug'>
  #container
    .q-py-md.text-h6 Manage Contracts
    managedao(:dao="SelectedDao").q-pb-xs
</template>
<style lang="sass" scoped>
</style>
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
