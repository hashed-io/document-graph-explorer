<template lang="pug">
.row.justify-center
  .q-pa-md.col-12.col-md-10
    q-card.q-pa-md
      .text-subtitle1 {{ $t('pages.daos.titleForm') }}
      listdao(ref='daoTable' @onManageContract='onClickManage')
      .row.q-gutter-sm.justify-end
        q-btn(
          :label="$t('pages.daos.createDao')"
          outline
          color="primary"
          @click="onClickCreateDao"
        )
      #modals
        q-dialog(v-model="openCreateDao")
          q-card.q-pa-md.responsive-modal
            managedao(:dao="selectedDao" @success='onManageDao')
            //- form-create-user(@success="onCreatedDao" :dao="selectedDao")
        //- confirm-dialog(
        //-   v-model="showConfirmRemove"
        //-   v-if="selectedDao"
        //-   icon="delete"
        //-   iconColor="negative"
        //-   @confirm="onConfirmRemoveDao"
        //- )
</template>

<script>
import listdao from './list/daos-table.vue'
import managedao from './manage/manageContract.vue'
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

    onConfirmRemoveDao () {
    },
    onClickCreateDao () {
      // this.openCreateDao = true
      // this.selectedDao = undefined
      this.$router.push('/registerDao')
    },
    onClickManage () {
      this.openCreateDao = true
      this.selectedDao = arguments[0]
      console.log(arguments[0])
    },
    onManageDao () {

    }
  }
}
</script>
