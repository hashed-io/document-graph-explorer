<template lang="pug">
div
  q-btn.back( v-if='currentView.showRegisterDao || currentView.showManageContract' icon='fas fa-arrow-left' color="primary" flat dense size="14px" @click="changeView('showListDao')")
    q-tooltip {{$t('pages.general.back')}}
  .q-pb-xs.col-12.col-md-11
    q-card(flat)
      .text-h6(v-if='currentView.showListDao') {{ $t('pages.daos.titleForm') }}
      Listdao(v-if='currentView.showListDao' ref='daoTable' @editDao='isEditDao' @onManageContract='onClickManage')
      RegisterDao(v-if='currentView.showRegisterDao' ref='daoForm' @backToListDao="changeView('showListDao')")
      ManageContract(v-if='currentView.showManageContract' ref='manageContract' @backToListDao="changeView('showListDao')")
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
      test: null,
      currentView: {
        showListDao: false,
        showRegisterDao: false,
        showManageContract: true
      }
    }
  },
  methods: {
    ...mapMutations('dao', ['setSelectedDao']),
    changeView (currentView) {
      for (var key in this.currentView) {
        this.currentView[key] = false
        if (key === currentView) {
          this.currentView[key] = true
        }
      }
    },
    onClickCreateDao () {
      this.changeView('showRegisterDao')
    },
    onBack () {
      this.changeView('showListDao')
    },
    onClickManage (row) {
      this.setSelectedDao(row)
      this.changeView('showManageContract')
    },
    isEditDao (row) {
      this.setSelectedDao(row)
      this.changeView('showRegisterDao')
    }
  }
}
</script>
