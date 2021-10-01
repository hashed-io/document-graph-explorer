<template lang="pug">
q-card(flat)
  q-card-section.bg-primary.text-white.text-subtitle1 Detail
  div.q-px-xs.q-pt-md
    p
      | Provide additional information related to the Limited Liability Company as it applies.

    q-form(@submit='onSubmit', ref='formDetail' class=q-gutter-md)
      p
      strong.
        Period of duration:
      strong.asterisk *
      .row
        .cols-8
            q-select(filled ref='selectPeriod' v-model='selectValue' :options='options' map-options @change='calculateDate()' :rules="[(v) => !!v.label || 'You must make a selection' ]" lazy-rules)
            label (select &apos;Perpetual&apos; if the entity does not expire.)
            .q-pa-xs
            div(v-if="(selectValue.value !== '0') && (selectValue.value !== 'none') ")
              p.text-weight-bolder
                strong Expiration Date (mm/dd/yyyy):
                strong.q-pr-sm.asterisk
                | {{calculateDate()}}
              p
            div(v-else-if="(selectValue.value === '0')")
              strong Expiration Date (mm/dd/yyyy)
              strong.asterisk *
              .row
                .cols-6
                  q-input(v-model='form.expirationDate', filled, mask='##/##/####' :rules='[rules.required]')
                    template(v-slot:append='')
                      q-icon.cursor-pointer(name='event' class="cursor-pointer")
                        q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
                          q-date(v-model='form.expirationDate', today-btn, mask='MM/DD/YYYY')
                            .row.items-center.justify-end
                              q-btn(v-close-popup, label='Close', color='primary', flat='flat')
            div(v-else)
              p
                strong Expiration Date (mm/dd/yyyy):
                  strong.q-pr-sm
                  | {{calculateDate()}}
            hr.styleHR
            p.q-pt-xs
              b Delayed Effective Date : (mm/dd/yyyy)
              .row
                .cols-6
                  q-input(filled, ref='delayedEffectiveDateInput' v-model='form.delayedEffectiveDate', mask='##/##/####')
                    template(v-slot:append='')
                      q-icon.cursor-pointer(name='event')
                        q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
                          q-date(v-model='date', today-btn, mask='YYYY/MM/DD' :options='optionsFn' @input='changesDate')
                            .row.items-center.justify-end
                              q-btn(v-close-popup, label='Close', color='primary', flat='flat')
                  p (If this filing is NOT to be effective immediately, enter the effective date within the next 90 calendar days.)
</template>
<style lang='sass' scoped>
.asterisk
  color: red
.styleHR
  border-top: 1px solid $primary;
</style>
<script>
import { date } from 'quasar'
import { validation } from 'src/mixins/validation.js'
export default {
  name: 'detail',
  mixins: [validation],
  props: {
    detailObject: Object
  },
  data () {
    return {
      date: null,
      datePickerStart: null,
      datePickerEnd: null,
      daysOfInterval: 89,
      form: {
        periodOfDuration: null,
        expirationDate: null,
        delayedEffectiveDate: null
      },
      selectValue: {
        label: null,
        value: null
      },
      options: [
        {
          label: 'Expires',
          value: '0'
        },
        {
          label: 'Expires - 30 years',
          value: '30'
        },
        {
          label: 'Expires - 50 years',
          value: '50'
        },
        {
          label: 'Expires - 99 years',
          value: '99'
        },
        {
          label: 'Perpetual',
          value: 'none'
        }
      ]
    }
  },
  computed: {
  },
  created () {
    let objectNonReactive = JSON.parse(JSON.stringify(this.detailObject))
    if (objectNonReactive.periodOfDuration !== '') {
      var _object = null
      switch (objectNonReactive.periodOfDuration) {
        case 'Expires':
          _object = { label: 'Expires', value: '0' }
          break
        case 'Expires - 30 years':
          _object = { label: 'Expires - 30 years', value: '30' }
          break
        case 'Expires - 50 years':
          _object = { label: 'Expires - 50 years', value: '50' }
          break
        case 'Expires - 99 years':
          _object = { label: 'Expires - 99 years', value: '99' }
          break
      }
      this.selectValue = _object
      this.form.periodOfDuration = objectNonReactive.periodOfDuration
      this.calculateDate()
      this.form.delayedEffectiveDate = objectNonReactive.delayedEffectiveDate
      this.form.expirationDate = objectNonReactive.expirationDate
    }
  },
  beforeMount () {
    const timeStamp = Date.now()
    this.datePickerStart = date.formatDate(timeStamp, 'YYYY/MM/DD')
    const newDate = new Date()
    const day = newDate.getDate() + this.daysOfInterval
    const month = newDate.getMonth()
    const years = newDate.getFullYear()
    let formattedString = new Date(years, month, day)
    this.datePickerEnd = date.formatDate(formattedString, 'YYYY/MM/DD')
  },
  methods: {
    calculateDate () {
      // Caso Perpetuo
      const value = this.selectValue.value
      this.setPeriodOfDuration()
      if (value === 'none') {
        this.setExpirationDate('none')
        return 'none'
      // Caso expires
      } else if (value === '0') {
        this.setExpirationDate(null)
        return ''
      }
      // Caso en los que se añaden años
      const newDate = new Date()
      const day = newDate.getDate()
      const month = newDate.getMonth()
      const years = newDate.getFullYear() + parseInt(this.selectValue.value)
      let formattedString = new Date(years, month, day)
      formattedString = date.formatDate(formattedString, 'MM/DD/YYYY')
      this.setExpirationDate(formattedString)
      return formattedString
    },
    setExpirationDate (value) {
      this.form.expirationDate = value
    },
    setPeriodOfDuration () {
      this.form.periodOfDuration = this.selectValue.label
    },
    onSubmit () {
      this.$refs.formDetail.validate().then(success => {
        if (success) {
          this.$emit('dataFromDetail', this.form)
        }
      })
    },
    optionsFn (date) {
      return date >= this.datePickerStart && date <= this.datePickerEnd
    },
    changesDate () {
      const arr = this.date.split('/')
      let dateFormatted = arr[1] + '/' + arr[2] + '/' + arr[0]
      this.form.delayedEffectiveDate = dateFormatted
    }
  }
}
</script>
