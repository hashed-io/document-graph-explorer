<template lang="pug">
#container
  div(v-show='account')
    .row
      q-btn(
        flat
        round
        color="primary"
        :icon=" showAccountInfo ? 'keyboard_arrow_right' : 'keyboard_arrow_left'"
        @click="showAccountInfo = !showAccountInfo"
        ).floatingArrow
      AccountInfo.floating(v-show='showAccountInfo')
  .q-gutter-xs
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
      showAccountInfo: false,
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
.floatingArrow
  position: absolute
  top: 0vh
  right: 0vw
  z-index: 1
.floating
  position: absolute
  top: 0vh
  right: 3vw
  z-index: 1
@media screen and (max-width: 319px) and (min-width: 30px)
  .floating
    position: absolute
    top: 0vh
    right: 12vw
    z-index: 1

@media screen and (max-width: 480px) and (min-width: 320px)
  .floating
    position: absolute
    top: 0vh
    right: 10vw
    z-index: 1
@media screen and (max-width: 768px) and (min-width: 481px)
  .floating
    position: absolute
    top: 0vh
    right: 8vw
    z-index: 1
</style>
