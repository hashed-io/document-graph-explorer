<template lang='pug'>
  #container
    .q-py-md.text-h6.q-pr-md(v-if='SelectedDao') {{text}}{{SelectedDao.dao}} {{'DHO'}}
    listContractsGeneral(:dao="SelectedDao" ).q-pb-xs
</template>
<style lang="sass" scoped>
</style>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import listContractsGeneral from './listContractsGeneral.vue'
export default {
  name: 'manageContractGeneral',
  components: { listContractsGeneral },
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
    ...mapState('documentsGeneral', ['selectedDAO']),
    ...mapGetters('documentsGeneral', ['isGeneral'])
  },
  data () {
    return {
      SelectedDao: null,
      text: 'Manage Contracts of '
    }
  },
  methods: {
    ...mapMutations('documentsGeneral', ['setSelectedDao']),
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
      console.log('*****************')
      console.log(this.selectedDAO)
      console.log('*****************')
    }
  }
}
</script>
