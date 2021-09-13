<template lang="pug">
.row.justify-center
  .q-pa-md.col-12.col-md-11
    q-card.q-pa-md(flat)
      .text-subtitle1 {{ $t('pages.daos.titleForm') }}
      listdao(ref='daoTable' @onManageContract='onClickManage')
      .row.q-gutter-sm.justify-end
        q-btn(
          :label="$t('pages.daos.createDao')"
          outline
          color="primary"
          @click="onClickCreateDao"
        )
</template>

<script>
import listdao from './listDaos/listDao.vue'
import managedao from './manage/listContracts.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'daos',
  components: { listdao, managedao },
  data () {
    return {
      openCreateDao: false,
      selectedDao: false,
      showConfirmRemove: false
    }
  },
  methods: {
    ...mapMutations('dao', ['setSelectedDao']),
    onConfirmRemoveDao () {
    },
    onClickCreateDao () {
      // this.openCreateDao = true
      // this.selectedDao = undefined
      this.$router.push('/registerDao')
    },
    onClickManage () {
      this.setSelectedDao(arguments[0])
      this.$router.push('/manageContract')
      // this.openCreateDao = true
      // this.selectedDao = arguments[0]
    },
    onManageDao () {

    }
  }
}
</script>
