<template lang='pug'>
  #container
    .q-py-md.text-h6 Manage Contracts
    managedao(:dao="SelectedDao" @backToListDao="changeView('showListDao')").q-pb-xs
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
    changeView (val) {
      this.$emit('backToListDao', true)
    },
    setDAO () {
      this.SelectedDao = JSON.parse(JSON.stringify(this.selectedDAO))
    }
  }
}
</script>
