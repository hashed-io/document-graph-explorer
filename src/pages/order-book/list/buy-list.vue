<template lang="pug">
div
  q-table(
    title="Orders"
    flat
    dense
    :columns="columns",
    :data="ordersFreeze"
    virtual-scroll
    no-data-label="There aren't any Orders"
    ref="table"
    class="sticky-virtscroll-table"
    table-header-class="hdTable"
    :loading='loading'
    :hide-pagination="true"
  )
    template(v-slot:body-cell-actions="props")
      q-td(:props="props")
        q-btn(label="Buy token" size="sm" color="dark" @click="acceptOrder(props.row)")
  q-dialog(v-model="createOrder" persistent :position='positionDialog' seamless)
    CreateOrder(@close="createOrder = false" :order="order")
</template>

<script>
import CreateOrder from '../read/create-order'

export default {
  name: 'buy-list',
  components: {
    CreateOrder
  },
  data () {
    return {
      positionDialog: 'bottom',
      createOrder: false,
      order: undefined,
      loading: false,
      pageSize: 5,
      nextPage: 2,
      selectedOrder: undefined,
      initialPagination: {
        rowsPerPage: 0
      },
      orders: {
        rows: [
          {
            dao: 'Dao Example',
            token: 'Dao Token',
            amount: 89,
            price: '90.00 USD'
          }
        ],
        more: true
      },
      columns: [
        {
          name: 'dao',
          label: this.$t('pages.daos.daoName'),
          field: row => row.dao,
          // field: row => ''row.information.dao_name,
          align: 'center',
          sortable: true
        },
        {
          name: 'token',
          label: 'Token',
          field: row => row.token,
          // field: row => ''row.information.dao_name,
          align: 'center',
          sortable: true
        },
        {
          name: 'amount',
          label: 'Amount',
          field: row => row.amount,
          // field: row => ''row.information.dao_name,
          align: 'center',
          sortable: true
        },
        {
          name: 'price',
          label: 'Price',
          field: row => row.price,
          // field: row => ''row.information.dao_name,
          align: 'center',
          sortable: true
        },
        {
          name: 'actions',
          label: 'actions',
          align: 'center',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    for (let i = 0; i < 20; i++) {
      this.orders.rows.push({
        dao: 'Dao Example',
        token: 'Dao Token',
        amount: 89,
        price: '90.00 USD'
      })
    }
  },
  computed: {
    ordersFreeze () {
      return Object.freeze(this.orders.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  },
  methods: {
    acceptOrder (row) {
      this.order = row
      this.createOrder = true
    }
  }
}
</script>

<style>

</style>
