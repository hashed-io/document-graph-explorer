<template lang="pug">
div
  div(align='center').text-h5.q-pb-md Sell orders
  q-table(
    flat
    bordered
    card-class="text-black"
    table-class="text-black no-wrap"
    table-header-class="hdTable"
    dense
    :columns="columns",
    :data="ordersFreeze"
    virtual-scroll
    :rows-per-page-options="[0]"
    no-data-label="There aren't any Orders"
    ref="table"
    class="sticky-virtscroll-table"
    :pagination.sync="initialPagination"
    :loading='loading'
    :hide-pagination="true"
    @virtual-scroll="onScroll"
    separator='none'
    @row-click='onBuy'
  )
    template(v-slot:body-cell-actions="props")
      q-td(:props="props")
        q-icon(name='fact_check' label="Accept order" size="sm" color="red" @click="onBuy(props.row)")
          q-tooltip Accept order
  q-dialog(v-model="acceptOrder" seamless position="bottom")
        AcceptOrder(@close="acceptOrder = false" :order="selectedOrder")
</template>

<script>
import AcceptOrder from '../read/accept-order'
import Faker from 'faker'
import { mapState } from 'vuex'

export default {
  name: 'offer-list',
  components: {
    AcceptOrder
  },
  data () {
    return {
      acceptOrder: false,
      selectedOrder: undefined,
      loading: false,
      pageSize: 12,
      nextPage: 2,
      initialPagination: {
        rowsPerPage: 500
      },
      orders: {
        rows: [],
        more: true
      },
      columns: [
        {
          name: 'price',
          label: 'Price',
          field: row => '$' + row.price,
          // field: row => ''row.information.dao_name,
          classes: 'text-red text-bold',
          align: 'left',
          sortable: true
        },
        {
          name: 'buyer',
          label: 'Buyer',
          field: row => row.buyer,
          // field: row => ''row.information.dao_name,
          classes: 'column-order-book',
          align: 'left',
          sortable: true
        },
        {
          name: 'amount',
          label: 'Amount',
          field: row => row.amount,
          // field: row => ''row.information.dao_name,
          classes: 'text-bold',
          align: 'center',
          sortable: true
        },
        {
          name: 'token',
          label: 'Token',
          field: row => row.token,
          // field: row => ''row.information.dao_name,
          classes: 'text-red text-bold column-order-book',
          align: 'left',
          sortable: true
        }
        // {
        //   name: 'actions',
        //   label: 'actions',
        //   align: 'center',
        //   sortable: true
        // }
      ]
    }
  },
  mounted () {
    for (let i = 0; i < 15; i++) {
      this.orders.rows.push({
        buyer: Faker.name.findName(),
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
    async onScroll ({ to, ref, index, direction }) {
      console.log({ to, ref, index, direction })
      console.log('scroll start')
    },
    onBuy (evt, row) {
      if (!this.account) {
        this.$router.push('/login')
      } else {
        this.selectedOrder = row
        this.acceptOrder = true
      }
    }
  }
}
</script>

<style>

</style>
