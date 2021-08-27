<template lang="pug">
.row.justify-center
  .q-pa-md.col-12.col-md-10
    q-card.q-pa-md
      .text-subtitle1 {{ $t('pages.daos.titleForm') }}
      listdao(ref='daoTable' @onManageContract='onClickManage')
      .row.q-gutter-sm
        q-btn(
          :label="$t('pages.daos.createDao')"
          outline
          color="primary"
          @click="onClickCreateDao"
        )
      #modals
        q-dialog(v-model="openCreateDao")
          q-card.q-pa-md.responsive-modal
            //- form-create-user(@success="onCreatedDao" :dao="selectedDao")
        confirm-dialog(
          v-model="showConfirmRemove"
          v-if="selectedDao"
          icon="delete"
          iconColor="negative"
          @confirm="onConfirmRemoveDao"
        )
</template>

<script>
import listdao from './list/daos-table.vue'
export default {
  name: 'daos',
  components: { listdao },
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
      this.openCreateDao = true
      this.selectedDao = undefined
    },
    onClickManage () {

    }
  }
}
</script>
