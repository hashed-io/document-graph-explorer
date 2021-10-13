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
        q-btn(label="Accept order" size="sm" color="dark" @click="onBuy(props.row)")
  q-dialog(v-model="acceptOrder" persistent)
        AcceptOrder(@close="acceptOrder = false" :order="selectedOrder")
</template>

<script>
import AcceptOrder from '../read/accept-order'
export default {
  name: 'buy-list',
  components: {
    AcceptOrder
  },
  data () {
    return {
      acceptOrder: false,
      selectedOrder: undefined,
      loading: false,
      pageSize: 5,
      nextPage: 2,
      initialPagination: {
        rowsPerPage: 0
      },
      orders: {
        rows: [
          {
            buyer: 'Daniel Poot',
            token: 'Dao token',
            amount: 9,
            price: '90.00 USD'
          }
        ],
        more: true
      },
      columns: [
        {
          name: 'buyer',
          label: 'Buyer',
          field: row => row.buyer,
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
  computed: {
    ordersFreeze () {
      return Object.freeze(this.orders.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  },
  methods: {
    onBuy (row) {
      this.selectedOrder = row
      this.acceptOrder = true
    }
  }
}
</script>

<style>

</style>
