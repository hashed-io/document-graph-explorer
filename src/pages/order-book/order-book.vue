<template lang="pug">
#container
  .q-gutter-xs
    .row.q-col-gutter-sm
      .col-xs-12.col-sm-6
        BuyOrdersList.q-mt-md
      .col-xs-12.col-sm-6
        OrdersList.q-mt-md
    .row.q-py-md
      q-btn(color="green" label="Create order" @click="createOrder = true")
    q-dialog(v-model="createOrder" :position='positionDialog' seamless)
      CreateOrder(@close="createOrder = false")
</template>

<script>
// Este tiene que tener la cantidad a comprar del token y el valor.
import CreateOrder from './read/create-order'
import BuyOrdersList from './list/buy-list'
import OrdersList from './list/offer-list'

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
  }
}
</script>

<style lang="sass">
.full-width
  width: 50vh

</style>
