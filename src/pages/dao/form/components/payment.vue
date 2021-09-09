<script>
export default {
  name: 'paymentComponent',
  data () {
    return {
      businessName: 'DAO L.C tester',
      filingFee: 100.00,
      convenienceFee: 2.00,
      totalOnlinePayment: null
    }
  },
  methods: {
    calculateTotal () {
      this.totalOnlinePayment = parseInt(this.filingFee) + parseInt(this.convenienceFee)
      return this.totalOnlinePayment
    }
  },
  computed: {
  }
}
</script>
<template lang="pug">
div
  .text-h5
    | Payment
  p.q-pt-md YOU WILL BE DIRECTED TO THE BUSINESS DIVISION PAYMENT PROCESSING SITE TO COLLECT YOUR PAYMENT INFORMATION AND TO COMPLETE THE REGISTRATION FILING.
  hr
  .row
    .col
      p
        strong
          | Registration For
      p
        |  {{businessName}}
    .col
      p
        strong
          | Filing Fee
      p
        |  ${{filingFee}}
    .col
      p
        strong
          | Convenience Fee
      p
        |  ${{convenienceFee}}
    .col
      p
        strong
          | Total Online Payment
      p
        |  ${{calculateTotal()}}
  .row.justify-center
    q-btn(label='Start Payment Process' color='primary')
  p.q-pt-xl
    strong International Customers:
  p Once you have selected your Country, please:
  ul
    li Complete your address in Address Line 1;
    li Provide your telephone number in Address Line 2;
    li Enter your City, Province/Locale and Postal Code in the City field;
    li Place an "NA" in the State field;
    li Enter five (5) zeros (0) for the postal code; and
    li Use the following telephone number: 307-555-1212.
</template>

<style lang="">

</style>
