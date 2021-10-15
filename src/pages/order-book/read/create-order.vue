<template lang="pug">
q-card(flat bordered).q-pb-md.full-width
  q-form(@submit="onSubmit" ref="orderForm")
    q-toolbar
      q-toolbar-title
        .text {{ typeOrder === 'buy' ? 'Create Buy Order' : 'Create Sell Order' }}
      q-btn(flat round dense icon="close" @click="$emit('close')")
    q-card-section
      div(class='row no-wrap items-center')
        .col-6.q-pr-md
          q-input(
            mask='#.##'
            reverse-fill-mask
            input-class="text-right"
            v-model="quantity"
            :label="typeOrder === 'buy' ? 'Quantity to Buy' : 'Quantity to Sell'"
            :rules="[rules.required, rules.positiveInteger]"
            no-error-icon
            filled
            square
          )
            template(v-slot:append)
              //- /* Todos los tokens disponibles  */
              .text-subtitle1(v-if="typeOrder === 'buy' ") AllToken
              //- /* Obtener tokens del usuario */
              .text-subtitle1(v-else) User'sToken
            template
        .col-4
          q-input.no-right-borders(
            type="number"
            v-model="price"
            label="Price"
            :rules="[rules.required, rules.positiveInteger]"
            no-error-icon
            filled
            square
          )
        .col-2
          q-select.no-left-borders(
            :options="tokeOptions"
            v-model="selectedToken"
            :rules="[rules.required]"
            filled
            square
          )
    q-card-actions.q-mr-sm(align="right")
      q-btn(color="primary" type="submit" label="Create")
</template>

<script>
import { validation } from '~/mixins/validation'

export default {
  name: 'create-order',
  mixins: [validation],
  props: {
    typeOrder: {
      type: String,
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
  mounted () {
  },
  methods: {
    async onSubmit () {
      if (await this.$refs.orderForm.validate()) {
        console.log('On Submit')
        this.typeOrder === 'buy' ? this.createBuyOrder() : this.createSellOrder()
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
.q-field--outlined .q-field__control:before
  border: 5px solid
</style>
