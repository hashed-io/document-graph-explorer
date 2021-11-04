<template lang='pug'>
  #container
    .q-py-md.text-h6.q-pr-md(v-if='SelectedDao') {{text}}{{SelectedDao.dao}}
    ListContracts(:dao="SelectedDao" ).q-pb-xs
</template>
<style lang="stylus" scoped>
</style>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import ListContracts from './listContracts.vue'
export default {
  name: 'manageContract',
  components: { ListContracts },
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
    ...mapState('dao', ['selectedDAO']),
    ...mapGetters('dao', ['isGeneral'])
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
      let _website = this.$route.params.website
      if (params) {
        this.setSelectedDao({ dao: params, website: _website, showActionsButtons: false })
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
