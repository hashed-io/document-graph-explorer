<template lang='pug'>
  #container
    .q-py-md.text-h6(v-if='SelectedDao') {{text}}{{SelectedDao.dao}}
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
  mounted () {
    let params = this.$route.params.daoName
    if (params) {
      this.text = 'Contracts of '
    }
  },
  computed: {
    ...mapState('dao', ['selectedDAO'])
  },
  data () {
    return {
      SelectedDao: null,
      text: 'Manage Contracts of '
    }
  },
  methods: {
    ...mapMutations('dao', ['setSelectedDao']),
    setDAO () {
      let params = this.$route.params.daoName
      if (params) {
        this.setSelectedDao({ dao: params, showActionsButtons: false })
      }
      if (this.selectedDAO === null) {
        this.$router.push({ name: 'daos' })
      } else {
        this.SelectedDao = JSON.parse(JSON.stringify(this.selectedDAO))
      }
    }
  }
}
</script>
