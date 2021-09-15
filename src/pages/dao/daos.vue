<template lang="pug">
div
  .q-pb-xs.col-12.col-md-11
    q-card.q-pa-md(flat)
      .text-h6 {{ $t('pages.daos.titleForm') }}
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
      this.$router.push({ name: 'daoForm' })
    },
    onClickManage () {
      this.setSelectedDao(arguments[0])
      this.$router.push({ name: 'manageContract' })
    },
    onManageDao () {

    }
  }
}
</script>
