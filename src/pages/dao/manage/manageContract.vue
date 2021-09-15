<template lang='pug'>
  #container
    q-btn.back( icon='fas fa-arrow-left' color="primary" flat dense size="14px" @click="$router.push({name: 'daos'})")
      q-tooltip {{$t('pages.general.back')}}
    .q-py-md.text-h6 Manage Contracts
    managedao(:dao="SelectedDao").q-pb-xs
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

<style lang='sass' scoped>
  .back
    position: absolute
    top: 55px
    left: 10px
</style>
