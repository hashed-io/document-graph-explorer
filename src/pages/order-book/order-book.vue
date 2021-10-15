<template lang="pug">
#container
  .q-gutter-xs
    .row.q-col-gutter-sm
      .col-xs-12.col-sm-6
        BuyOrdersList.q-mt-md
        .row.q-pt-md.justify-start
          q-btn(color="green" rounded label="Create buy order" @click="showModal")
      .col-xs-12.col-sm-6
        OrdersList.q-mt-md
        .row.q-pt-md.justify-end
          q-btn(color="red" rounded label="Create sell order" @click="showModal")
    .row.q-py-md
    q-dialog(v-model="createOrder" :position='positionDialog' seamless)
      CreateOrder(@close="createOrder = false")
</template>

<script>
// Este tiene que tener la cantidad a comprar del token y el valor.
import CreateOrder from './read/create-order'
import BuyOrdersList from './list/buy-list'
import OrdersList from './list/offer-list'
import { mapState } from 'vuex'

export default {
  name: 'order-book',
  components: {
    CreateOrder,
    BuyOrdersList,
    OrdersList
  },
  data () {
    return {
      createOrder: false,
      positionDialog: 'bottom'
    }
  },
  computed: {
    ...mapState('accounts', ['account'])
  },
  methods: {
    showModal () {
      if (!this.account) {
        this.$router.push('/login')
      } else {
        this.createOrder = true
      }
    }
  }
}
</script>

<style lang="sass">
.full-width
  width: 50vh

</style>
