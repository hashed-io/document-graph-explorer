<template lang="pug">
q-form(@submit='onSubmit', ref='formAddresses' class='q-gutter-md')
  .q-pa-md.row.items-start.q-gutter-md.full-width
    q-card.full-width
      q-card-section.bg-primary.text-white
        .text-h6 Principal Address
      q-separator
      p.q-pa-md
        | Please update the Principal Office Address for this entity.
        .q-px-xl
          .row
            .col.q-px-md.col-xs-12.col-sm-6
              q-select(filled v-model='form.principalAddress.country' :options='options' emit-value @filter='filterFn' input-debounce='10' use-input :rules="[rules.required]" lazy-rules label="Choose country *")
          .row.justify-center
            .col.q-px-md.col-xs-12.col-sm-12
              q-input(v-model='form.principalAddress.address.line1', filled, label="Address Line 1 *", label-stacked :rules='[rules.required]')
          .row.justify-center
            .col.q-px-md.col-xs-12.col-sm-12
              q-input(v-model='form.principalAddress.address.line2', filled, label="Address Line 2", label-stacked)
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-12
              q-input(v-model='form.principalAddress.address.line3', filled, label="Address Line 3", label-stacked)
          .row.justify-center
            .col.q-pa-md.col-xs-12.col-sm-6
              q-input(v-model='form.principalAddress.city', @input="getPostalCode()" filled, label='City: *', label-stacked :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-2
              q-input(v-model='form.principalAddress.state', filled, label='State: *', label-stacked :rules='[rules.required]')
            .col.q-pa-md.col-xs-12.col-sm-4
              q-input(v-model='form.principalAddress.postalCode', filled, label='Postal Code: *', label-stacked :rules='[rules.required]')
          .row.justify-center
            .col.q-px-md.col-xs-12.col-sm-6
              q-input(v-model='form.principalAddress.phone', filled, label='Phone: *', label-stacked mask="phone" :rules='[rules.required]')
            .col.q-px-md.col-xs-12.col-sm-6
              q-input(v-model='form.principalAddress.fax', filled, label='Fax', label-stacked mask='phone')
          .row.justify-left
            .col.q-px-md.col-xs-12.col-sm-8
              q-input(v-model='form.principalAddress.email', filled, label='Email: *', label-stacked :rules="[rules.required, rules.isEmail]")
          .row.justify-center
          .col.q-px-md.col-xs-12.col-sm-12
            p
              | Please provide your email address in order to receive electronic notification of future annual report due dates.
            p
              | To provide more than one email address, be sure to separate the addresses with a semicolon.
              |  (example: johndoe@test.com; janedoe@test.com)
    q-card.full-width
      q-card-section.bg-primary.text-white
        .text-h6 Mailing Address
      q-separator
      p.q-pa-md
        | Please update the Mailing Address for this entity
      .q-px-xl
        .row
            .col.q-px-sm.col-xs-12.col-sm-6
              q-select(filled v-model='form.mailingAddress.country' :options='options'  @filter='filterFn' input-debounce='10' use-input :rules="[rules.required]" lazy-rules label="Choose country *")
        .row.justify-center
          .col.q-px-sm.col-xs-12.col-sm-12
            q-input(v-model='form.mailingAddress.address.line1', filled, label="Address Line 1 *", label-stacked :rules='[rules.required]')
        .row.justify-center
          .col.q-px-sm.col-xs-12.col-sm-12
            q-input(v-model='form.mailingAddress.address.line2', filled, label="Address Line 2", label-stacked)
        .row.justify-center.q-pt-md
          .col.q-px-sm.col-xs-12.col-sm-12
            q-input(v-model='form.mailingAddress.address.line3', filled, label="Address Line 3", label-stacked)
        .row.justify-center.q-pt-md
          .col.q-px-sm.col-xs-12.col-sm-6
            q-input(v-model='form.mailingAddress.city', @input="getPostalCode()" filled, label='City: *', label-stacked :rules='[rules.required]')
          .col.q-px-sm.col-xs-12.col-sm-2
            q-input(v-model='form.mailingAddress.state', filled, label='State: *', label-stacked :rules='[rules.required]')
          .col.q-px-sm.col-xs-12.col-sm-4
            q-input(v-model='form.mailingAddress.postalCode', filled, label='Postal Code: *', label-stacked :rules='[rules.required]')
</template>

<style lang="">

</style>

<script>
import { validation } from '~/mixins/validation'
import { countriesLang } from '~/mixins/countries'

export default {
  name: 'addressesComponent',
  mixins: [ validation, countriesLang ],
  data () {
    return {
      options: [],
      countries: [],
      form: {
        principalAddress: {
          country: 'United States of America',
          address: {
            line1: null,
            line2: null,
            line3: null
          },
          city: null,
          state: null,
          postalCode: null,
          phone: null,
          fax: null,
          email: null
        },
        mailingAddress: {
          country: 'United States of America',
          address: {
            line1: null,
            line2: null,
            line3: null
          },
          city: null,
          state: null,
          postalCode: null
        }
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('dataFromAddresses', this.form)
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.countries
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.countries.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getPostalCode () {

    }
  },
  beforeMount () {
    // Map
    let countries = this.countriesLang
    this.countries = Object.values(countries)
  }
}
</script>
