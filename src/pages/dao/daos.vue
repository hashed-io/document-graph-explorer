<template lang="pug">
div
  .q-pb-xs.col-12.col-md-11
    q-card(flat)
      .text-h6 {{ $t('pages.daos.titleForm') }}
      Listdao(ref='daoTable' @editDaoSimple='isEditDaoSimple' @editDao='isEditDao' @onManageContract='onClickManage')
      //- RegisterDao(v-if='currentView.showRegisterDao' ref='daoForm' @backToListDao="changeView('showListDao')")
      //- ManageContract(v-if='currentView.showManageContract' ref='manageContract' @backToListDao="changeView('showListDao')")
      .row.q-pt-md.justify-end
        q-fab(
          v-model="fab"
          id='createNewDAOButton'
          data-cy='createNewDAOButton'
          label='Create new DAO'
          color='primary'
          :icon="$q.platform.is.mobile? 'keyboard_arrow_down' : 'keyboard_arrow_left'"
          :direction="$q.platform.is.mobile? 'down' : 'left' "
        )
          q-fab-action(color='secondary' data-cy='createDAOButton' @click='onClickCreateDao' :label="$t('pages.daos.createDao')")
          q-fab-action(color='secondary' data-cy='createDAOSimpleButton' @click='onClickCreateDaoSimple' :label="$t('pages.daos.createDaoSimple')")

</template>
<style lang="sass">
.back
  position: absolute
  top: 15px
  left: 10px
</style>
<script>
import Listdao from './listDaos/listDao.vue'
import RegisterDao from './form/daoForm.vue'
import ManageContract from './manage/manageContract.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'daos',
  components: {
    Listdao,
    RegisterDao,
    ManageContract
  },
  data () {
    return {
      fab: false,
      currentView: {
        showListDao: true,
        showRegisterDao: false,
        showManageContract: false
      }
    }
  },
  methods: {
    ...mapMutations('dao', ['setSelectedDao']),
    onClickCreateDao () {
      this.$router.push({ name: 'daoForm' })
    },
    onClickCreateDaoSimple () {
      this.$router.push({ name: 'daoFormSimple' })
    },
    onBack () {
      this.changeView('showListDao')
    },
    onClickManage (row) {
      this.setSelectedDao(row)
      this.$router.push({ name: 'manageContract' })
    },
    isEditDao (row) {
      this.setSelectedDao(row)
      this.$router.push({ name: 'daoForm' })
    },
    isEditDaoSimple (row) {
      this.setSelectedDao(row)
      this.$router.push({ name: 'daoFormSimple' })
    }
  }
}
</script>
