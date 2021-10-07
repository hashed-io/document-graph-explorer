<template lang="pug">
div
  .q-pb-xs.col-12.col-md-11
    q-card(flat)
      .text-h6(v-if='currentView.showListDao') {{ $t('pages.daos.titleForm') }}
      Listdao(v-if='currentView.showListDao' ref='daoTable' @editDao='isEditDao' @onManageContract='onClickManage')
      //- RegisterDao(v-if='currentView.showRegisterDao' ref='daoForm' @backToListDao="changeView('showListDao')")
      //- ManageContract(v-if='currentView.showManageContract' ref='manageContract' @backToListDao="changeView('showListDao')")
      .row.q-pt-md.justify-end
        q-btn(
          v-if='currentView.showListDao'
          :label="$t('pages.daos.createDao')"
          outline
          color="primary"
          @click="onClickCreateDao"
        )
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
      currentView: {
        showListDao: true,
        showRegisterDao: false,
        showManageContract: false
      }
    }
  },
  methods: {
    ...mapMutations('dao', ['setSelectedDao']),
    // changeView (currentView) {
    //   for (var key in this.currentView) {
    //     this.currentView[key] = false
    //     if (key === currentView) {
    //       this.currentView[key] = true
    //     }
    //   }
    // },
    onClickCreateDao () {
      this.$router.push({ name: 'daoForm' })
      // this.changeView('showRegisterDao')
    },
    onBack () {
      this.changeView('showListDao')
    },
    onClickManage (row) {
      this.setSelectedDao(row)
      this.$router.push({ name: 'manageContract' })
      // this.changeView('showManageContract')
    },
    isEditDao (row) {
      this.setSelectedDao(row)
      this.$router.push({ name: 'daoForm' })
      // this.changeView('showRegisterDao')
    }
  }
}
</script>
