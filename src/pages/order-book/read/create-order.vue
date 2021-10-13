<template lang="pug">
q-card(flat).q-pb-md.full-width
  q-form(@submit="onSubmit" ref="orderForm")
    q-toolbar
      q-toolbar-title
        .text {{ order ? 'Create Buy Order' : 'Create Sell Order' }}
      q-btn(flat round dense icon="close" @click="$emit('close')")
    q-card-section
      .row.justify-between
        .col
          q-input(
            type="number"
            outlined
            v-model="quantity"
            :label="order ? 'Quantity to Buy' : 'Quantity to Sell'"
            :rules="[rules.required, rules.positiveInteger]"
            no-error-icon
          )
            template(v-slot:append)
              .text Token
            template
      .row.justify-between
        .col-10
          q-input.no-right-borders(
            type="number"
            v-model="price"
            label="Price"
            :rules="[rules.required, rules.positiveInteger]"
            no-error-icon
            outlined
          )
        .col-2
          q-select.no-left-borders(
            :options="tokeOptions"
            v-model="selectedToken"
            :rules="[rules.required]"
            outlined
          )
    q-card-actions.q-mr-sm(align="right")
      q-btn(color="primary" type="submit" label="Create")
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'create-buy-order',
  mixins: [validation],
  props: {
    order: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      quantity: undefined,
      price: undefined,
      selectedToken: undefined,
      tokeOptions: [
        {
          label: 'USD',
          value: 'usd'
        },
        {
          label: 'TLOS',
          value: 'tlos'
        }
      ]
    }
  },
  methods: {
    async onSubmit () {
      if (await this.$refs.orderForm.validate()) {
        console.log('On Submit')
      }
    },
    createSellOrder () {
      console.log('Sell order')
    },
    createBuyOrder () {
      console.log('Buy order')
    },
    parseUsdToTlos () {},
    parseTlosToUsd () {}
  }
}
</script>

<style lang="sass" scoped>

.q-field__control
  color: $positive
</style>
