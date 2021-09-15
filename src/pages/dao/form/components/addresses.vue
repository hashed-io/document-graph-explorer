<template lang="pug">
q-form(@submit='onSubmit', ref='formAddresses' class='q-gutter-sm')
  .row.full-width
    q-card.full-width(flat)
      q-card-section.bg-primary.text-white
        .text-subtitle1 Principal Address
      q-separator
      p.paddingInput.q-pl-md
        | Please update the Principal Office Address for this entity.
        .q-px-xs
          .row
            .col.q-px-xs.col-xs-12.col-sm-6
              q-select(filled v-model='form.principalAddress.country' :options='options' emit-value @filter='filterFn' input-debounce='10' use-input :rules="[rules.required]" lazy-rules label="Choose country *")
                template(v-slot:prepend)
                  q-icon(name='public')
          .row.justify-center
            .col.q-px-xs.col-xs-12.col-sm-12
              q-input(v-model='form.principalAddress.address.line1', filled, label="Address Line 1 *", label-stacked :rules='[rules.required]')
                template(v-slot:prepend)
                  q-icon(name='location_on')
          .row.justify-center
            .col.q-px-xs.col-xs-12.col-sm-12
              q-input.rulesPadding(v-model='form.principalAddress.address.line2', filled, label="Address Line 2", label-stacked)
          .row.justify-center
            .col.q-pa-sm.col-xs-12.col-sm-6
              q-input(v-model='form.principalAddress.city', @input="getPostalCode()" filled, label='City: *', label-stacked :rules='[rules.required]')
                template(v-slot:prepend)
                  q-icon(name='location_city')
            .col.q-pa-sm.col-xs-12.col-sm-2
              q-input(v-model='form.principalAddress.state', filled, label='State: *', label-stacked :rules='[rules.required]')
            .col.q-pa-sm.col-xs-12.col-sm-4
              q-input(v-model='form.principalAddress.postalCode', filled, label='Postal Code: *', label-stacked :rules='[rules.required]')
          .row.justify-center
            .col.q-px-xs.col-xs-12.col-sm-6
              q-input(v-model='form.principalAddress.phone', filled, label='Phone: *', label-stacked mask="phone" :rules='[rules.required]')
                template(v-slot:prepend)
                  q-icon(name='phone')
            .col.q-px-xs.col-xs-12.col-sm-6
              q-input(v-model='form.principalAddress.fax', filled, label='Fax', label-stacked mask='phone')
                template(v-slot:prepend)
                  q-icon(name='fax')
          .row.justify-left
            .col.q-px-xs.col-xs-12.col-sm-8
              q-input(v-model='form.principalAddress.email', filled, label='Email: *', label-stacked :rules="[rules.required, rules.isEmail]")
                template(v-slot:prepend)
                  q-icon(name='email')
          .row.justify-center
          .col.q-px-xs.col-xs-12.col-sm-12
            p
              | Please provide your email address in order to receive electronic notification of future annual report due dates.
            p
              | To provide more than one email address, be sure to separate the addresses with a semicolon.
              |  (example: johndoe@test.com; janedoe@test.com)
    q-card.full-width(flat)
      q-card-section.bg-primary.text-white
        .text-subtitle1 Mailing Address
      q-separator
      div.paddingInput.q-pl-md
        | Please update the Mailing Address for this entity
      .q-px-xs
        .q-pb-md
          q-checkbox(v-model='checkboxCopy' label='Same as Principal Address' @input='changeStateCheckbox')
        .row
            .col.q-px-xs.col-xs-12.col-sm-6
              q-select(filled v-model='form.mailingAddress.country' :options='options'  @filter='filterFn' input-debounce='10' use-input :rules="[rules.required]" lazy-rules label="Choose country *")
                template(v-slot:prepend)
                  q-icon(name='public')
        .row.justify-center
          .col.q-px-xs.col-xs-12.col-sm-12
            q-input(v-model='form.mailingAddress.address.line1', filled, label="Address Line 1 *", label-stacked :rules='[rules.required]')
              template(v-slot:prepend)
                q-icon(name='location_on')
        .row.justify-center
          .col.q-px-xs.col-xs-12.col-sm-12
            q-input.rulesPadding(v-model='form.mailingAddress.address.line2', filled, label="Address Line 2", label-stacked)
        .row.justify-center.q-pt-sm
          .col.q-px-xs.col-xs-12.col-sm-6
            q-input(v-model='form.mailingAddress.city', @input="getPostalCode()" filled, label='City: *', label-stacked :rules='[rules.required]')
              template(v-slot:prepend)
                q-icon(name='location_city')
          .col.q-px-xs.col-xs-12.col-sm-2
            q-input(v-model='form.mailingAddress.state', filled, label='State: *', label-stacked :rules='[rules.required]')
          .col.q-px-xs.col-xs-12.col-sm-4
            q-input(v-model='form.mailingAddress.postalCode', filled, label='Postal Code: *', label-stacked :rules='[rules.required]')
</template>

<style lang="sass" scoped>
.rulesPadding
  padding-bottom : 1.4%
.paddingInput
  padding-bottom: 1%
  padding-top: 1%
</style>

<script>
import { validation } from '~/mixins/validation'
import { countriesLang } from '~/mixins/countries'

export default {
  name: 'addressesComponent',
  mixins: [ validation, countriesLang ],
  props: {
    addressesObject: Object
  },
  created () {
    this.form = JSON.parse(JSON.stringify(this.addressesObject))
  },
  data () {
    return {
      checkboxCopy: false,
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
      this.$refs.formAddresses.validate().then(success => {
        if (success) {
          this.$emit('dataFromAddresses', this.form)
        }
      })
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

    },
    changeStateCheckbox () {
      if (this.checkboxCopy) {
        const object = this.form.mailingAddress
        for (var key in object) {
          this.form.mailingAddress[key] = this.form.principalAddress[key]
        }
      }
    }
  },
  beforeMount () {
    // Map
    let countries = this.countriesLang
    this.countries = Object.values(countries)
  }
}
</script>
