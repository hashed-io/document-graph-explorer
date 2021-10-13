<template lang="pug">
#container
  .q-gutter-xs
    q-btn(color="brown" label="Create order" @click="createOrder = true")
  q-dialog(v-model="createOrder" persistent)
    CreateOrder(@close="createOrder = false")
  BuyOrdersList.q-mt-md
  OrdersList.q-mt-md
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
      createOrder: false
    }
  }
}
</script>

<style lang="sass">
.full-width
  width: 50vh

</style>
