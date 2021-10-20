<template lang="pug">
#container
  div(v-show="account")
    .row
      AccountInfo.floating
  .q-gutter-xs
    .row.q-col-gutter-sm
      .col-xs-12.col-sm-6
        BuyOrdersList.q-mt-md
        .row.q-pt-md.justify-start
          q-btn(
            data-cy='createOrderBuy'
            ref='createOrderBuy'
            color="green",
            rounded,
            label="Create buy order",
            @click="showModal('buy')"
          )
      .col-xs-12.col-sm-6
        OfferOrdersList.q-mt-md
        .row.q-pt-md.justify-end
          q-btn(
            data-cy='createOrderSell'
            ref='createOrderSell'
            color="red",
            rounded,
            label="Create sell order",
            @click="showModal('sell')"
          )
    q-dialog(v-model="createOrder", :position="positionDialog", seamless)
      CreateOrder(@close="createOrder = false", :typeOrder="typeOrder")
</template>

<script>
// Este tiene que tener la cantidad a comprar del token y el valor.
import CreateOrder from './read/create-order.vue'
import BuyOrdersList from './list/buy-list'
import OfferOrdersList from './list/offer-list'
import AccountInfo from './info/account-info.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'order-book',
  components: {
    CreateOrder,
    BuyOrdersList,
    OfferOrdersList,
    AccountInfo
  },
  data () {
    return {
      createOrder: false,
      typeOrder: undefined,
      positionDialog: 'bottom'
    }
  },
  async mounted () {
    if (!this.isAuthenticated && localStorage.getItem('account')) {
      await this.autoLogin('/home')
    }
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated']),
    ...mapState('accounts', ['account'])
  },
  methods: {
    ...mapActions('accounts', ['autoLogin']),
    showModal (_typeOrder) {
      let _account = localStorage.getItem('account')
      if (!_account) {
        this.$router.push('/login')
      } else {
        this.createOrder = true
        this.typeOrder = _typeOrder
      }
    }
  }
}
</script>

<style lang="sass">
.full-width
  width: 50vh
</style>
