<template lang="pug">
q-card.q-pb-md.full-width(flat, bordered, data-cy='acceptOrderModal')
  q-toolbar
    q-toolbar-title
      .text Offer Buy #1
    q-btn(flat, round, dense, icon="close", @click="$emit('close')")
  q-card-section.q-pb-lg
    .row
      .col
        .row
          .col-6
            .text-bold(v-if="typeOrder === 'buy'") DAO name:
            .text-bold(v-if="typeOrder === 'sell'") Buyer:
          .col
            .text(v-if="typeOrder === 'buy'") {{ order.dao }}
            .text(v-if="typeOrder === 'sell'") {{ order.buyer }}
      .col
        .row
          .col-4
            .text-bold Date:
          .col
            .text Octuber 08, 2021
    .row
      .col
        .row
          .col-6
            .text-bold Amount to buy:
          .col
            .text {{ order.amount }} {{ order.token }}
      .col
        .row
          .col-4
            .text-bold Price:
          .col
            .text {{ order.price }}
  q-card-actions(align="right")
    q-btn(color="primary", label="Accept Offer", @click="onAcceptOrder")
</template>

<script>
import { QSpinnerGrid } from 'quasar'
export default {
  name: 'accept-order',
  props: {
    order: {
      type: Object,
      require: true
    },
    typeOrder: {
      type: String,
      require: true
    }
  },
  methods: {
    async onAcceptOrder () {
      console.log('Accept Order')
      this.$q.loading.show({
        message: 'Processing the order ' + this.typeOrder + '...',
        spinner: QSpinnerGrid
      })
      await new Promise((resolve) => setTimeout(resolve, 1500))
      this.$q.loading.hide()
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
