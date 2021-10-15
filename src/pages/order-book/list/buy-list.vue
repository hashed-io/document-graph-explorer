<template lang="pug">
div
  div(align='center').text-h5.q-pb-md Buy orders
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
    @row-click='showModal'
  )
  q-dialog(v-model="acceptOrder" persistent :position='positionDialog' seamless)
    AcceptOrder(@close="acceptOrder = false" :order="order" typeOrder='buy')
</template>

<script>
import AcceptOrder from '../read/accept-order.vue'
import Faker from 'faker'
import { mapState } from 'vuex'

export default {
  name: 'buy-list',
  components: {
    AcceptOrder
  },
  data () {
    return {
      positionDialog: 'bottom',
      acceptOrder: false,
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
    ...mapState('accounts', ['account']),
    ordersFreeze () {
      return Object.freeze(this.orders.rows.slice(0, this.pageSize * (this.nextPage - 1)))
    }
  },
  methods: {
    showModal (evt, row) {
      if (!this.account) {
        this.$router.push('/login')
      } else {
        this.order = row
        this.acceptOrder = true
      }
    }
  }
}
</script>

<style>

</style>
