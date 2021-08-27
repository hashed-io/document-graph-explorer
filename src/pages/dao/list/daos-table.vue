<template lang="pug">
#container
  skeleton-table(v-if="!daos")
  q-table.q-mb-sm(
    v-else
    title: 'Daos'
    :data="usersFreeze"
    :columns="columns"
    row-key="account"
    flat
    dense
    :pagination="initialPagination"
    virtual-scroll
    :rows-per-page-options="[0]"
    class="sticky-virtscroll-table"
    :virtual-scroll-item-size="pageSize - 2"
    :virtual-scroll-sticky-size-start="pageSize - 2"
    @virtual-scroll="onScroll"
    ref="table"
    table-header-class="hdTable"
    :hide-pagination="true"
  )
</template>

<script>
import { validation } from '~/mixins/validation'
export default {
  name: 'listdao',
  mixins: [validation],
  data () {
    return {
      loading: false,
      pageSize: 5,
      nextPage: 2,
      initialPagination: {
        // page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      daos: {
        more: true,
        rows: []
      },
      columns: [
        {
          name: 'actions',
          label: this.$t('pages.general.actions'),
          align: 'center',
          field: row => row.actions,
          sortable: true
        }
      ]
    }
  }
}
</script>
