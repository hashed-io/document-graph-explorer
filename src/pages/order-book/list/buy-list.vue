<template lang="pug">
div
  div(align='center').text-h5.q-pb-md Sell orders
  q-table(
    flat
    dense
    bordered
    :columns="columns",
    :data="ordersFreeze"
    virtual-scroll
    no-data-label="There aren't any Orders"
    ref="table"
    class="sticky-virtscroll-table"
    table-header-class="hdTable"
    :loading='loading'
    :pagination.sync="initialPagination"
    :hide-pagination="true"
    separator='none'
    @row-click='acceptOrder'
  )
    template(v-slot:body-cell-actions="props")
      q-td(:props="props")
        q-icon(name='price_check' label="Buy token" size="sm" color="green" @click="acceptOrder(props.row)")
          q-tooltip Buy Token
  q-dialog(v-model="createOrder" persistent :position='positionDialog' seamless)
    CreateOrder(@close="createOrder = false" :order="order")
</template>

<script>
import CreateOrder from '../read/create-order'
import Faker from 'faker'

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
      pageSize: 12,
      nextPage: 2,
      selectedOrder: undefined,
      initialPagination: {
        rowsPerPage: 0
      },
      orders: {
        rows: [],
        more: true
      },
      columns: [
        // {
        //   name: 'actions',
        //   label: 'actions',
        //   align: 'center',
        //   sortable: true
        // },
        {
          name: 'token',
          label: 'Token',
          field: row => row.token,
          // field: row => ''row.information.dao_name,
          classes: 'text-green text-bold column-order-book',
          align: 'left',
          sortable: true
        },
        {
          name: 'amount',
          label: 'Amount',
          field: row => row.amount,
          // field: row => ''row.information.dao_name,
          classes: 'text-bold',
          align: 'left',
          sortable: true
        },
        {
          name: 'dao',
          label: this.$t('pages.daos.daoName'),
          field: row => row.dao,
          // field: row => ''row.information.dao_name,
          classes: 'column-order-book',
          align: 'left',
          sortable: true
        },
        {
          name: 'price',
          label: 'Price',
          field: row => '$' + row.price,
          classes: 'text-green text-bold',
          // field: row => ''row.information.dao_name,
          align: 'right',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    for (let i = 0; i < 20; i++) {
      this.orders.rows.push({
        dao: Faker.company.companyName(),
        token: Faker.finance.currencyName(),
        amount: Faker.datatype.float(),
        price: Faker.finance.amount()
      })
    }
  },
  computed: {
    ordersFreeze () {
      return Object.freeze(this.orders.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  },
  methods: {
    acceptOrder (evt, row) {
      this.order = row
      this.createOrder = true
    }
  }
}
</script>

<style>

</style>
