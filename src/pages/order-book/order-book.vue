<template lang="pug">
#container
  .q-gutter-xs
    AccountInfo
    .row.q-col-gutter-sm
      .col-xs-12.col-sm-6
        BuyOrdersList.q-mt-md
        .row.q-pt-md.justify-start
          q-btn(color="green" rounded label="Create buy order" @click="showModal('buy')")
      .col-xs-12.col-sm-6
        OfferOrdersList.q-mt-md
        .row.q-pt-md.justify-end
          q-btn(color="red" rounded label="Create sell order" @click="showModal('sell')")
    q-dialog(v-model="createOrder" :position='positionDialog' seamless)
      CreateOrder(@close="createOrder = false" :typeOrder='typeOrder' )
</template>

<script>
// Este tiene que tener la cantidad a comprar del token y el valor.
import CreateOrder from './read/create-order.vue'
import BuyOrdersList from './list/buy-list'
import OfferOrdersList from './list/offer-list'
import AccountInfo from './info/account-info.vue'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState('accounts', ['account'])
  },
  methods: {
    showModal (_typeOrder) {
      if (!this.account) {
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
.floating
  position: fixed
  bottom: 65%
  left: 80%
  z-index: 10

</style>
