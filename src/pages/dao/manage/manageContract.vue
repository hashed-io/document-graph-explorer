<template lang='pug'>
  #container
    .q-py-md.text-h6(v-if='showActions') Manage Contracts of {{SelectedDao.dao}}
    .q-py-md.text-h6(v-if='!showActions') Contracts of {{SelectedDao.dao}}
    managedao(:dao="SelectedDao" ).q-pb-xs
</template>
<style lang="sass" scoped>
</style>
<script>
import { mapMutations, mapState } from 'vuex'
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
      SelectedDao: null,
      ShowActions: true
    }
  },
  methods: {
    ...mapMutations('dao', ['setSelectedDao']),
    setDAO () {
      let params = this.$route.params.daoName
      if (params) {
        this.ShowActions = false
        this.setSelectedDao({ dao: params, showActionsButtons: false })
      }
      this.SelectedDao = JSON.parse(JSON.stringify(this.selectedDAO))
    }
  }
}
</script>
