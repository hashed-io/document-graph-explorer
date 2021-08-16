<script>
import { date } from 'quasar'
import { validation } from '~/mixins/validation'
export default {
  name: 'detail',
  mixins: [validation],
  data () {
    return {
      date: null,
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
    }
  },
  methods: {
    getCurrentDate () {
      const timeStamp = Date.now()
      this.date = date.formatDate(timeStamp, 'MM/DD/YYYY')
      return date.formatDate(timeStamp, 'MM/DD/YYYY')
    },
    setExpirationDate (value) {
      this.form.expirationDate = value
    },
    setPeriodOfDuration () {
      this.form.periodOfDuration = this.selectValue.label
    },
    send () {
      this.$refs.formDetailPeriodOfDuration.validate().then(success => {
        if (success) {
          // this.$emit('formData', this.confirmName)
          // this.$emit('validateChild', true)
          alert('Send')
        } else {
          console.log('FAIL')
        }
      })
    }
  }
}
</script>
// TODO# Validate data in form. Send to component DAO
<template lang="pug">
div
  p.
    Provide additional information related to the Limited Liability Company as it applies.
  p {{selectValue}}
  br
  p Form to send :.{{form}}
  p
    strong.
      Period of duration:
    strong(style="color:red") *
    div.row
      div.cols-8
        q-form(
            @submit="send"
            class=q-gutter-md
            ref="formDetailPeriodOfDuration"
        )
          q-select(
            filled
            v-model="selectValue"
            :options="options"
            map-options
            @change="calculateDate"
            :rules="[rules.required]"
          )
    label.
      (select 'Perpetual' if the entity does not expire.)
    div.q-pa-md
    //- `Casos 30, 50, 99
    div(
      v-if="(selectValue.value !== '0') && (selectValue.value !== 'none') "
    )
      p
        strong.
          Expiration Date (mm/dd/yyyy)
        strong(style="color:red") *
        p  {{calculateDate}}
    //- Caso Expires
    div(
      v-else-if="(selectValue.value === '0')"
    )
      strong.
        Expiration Date (mm/dd/yyyy)
      strong(style="color:red") *
      div.row
        div.cols-6
          q-input(
            v-model="form.expirationDate"
            filled
            mask="##/##/####"
          )
            template(v-slot:append='')
              q-icon(name="event" class="cursor-pointer" )
                q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale" )
                  q-date(v-model="form.expirationDate" today-btn mask="MM/DD/YYYY")
                    div(class="row items-center justify-end")
                      q-btn(v-close-popup label="Close" color="primary" flat)
    //- Perpetuo
    div(
      v-else
    )
      p
        strong.
          Expiration Date (mm/dd/yyyy)
        strong(style="color:red") *
        p  {{calculateDate}}
  //- TODO Delayed debe ser posterior
  p
    b Delayed Effective Date : (mm/dd/yyyy)

    div.row
      div.cols-6
        q-form(
            @submit="send"
            class=q-gutter-md
            ref="formDetailDelayed"
        )
          q-input(
            filled
            v-model ="form.delayedEffectiveDate"
            :rules="[rules.required]"
            mask="##/##/####"
          )
            template(v-slot:append='')
              q-icon(name="event" class="cursor-pointer" )
                q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale" )
                  q-date(v-model="form.delayedEffectiveDate" today-btn mask="MM/DD/YYYY")
                    div(class="row items-center justify-end")
                      q-btn(v-close-popup label="Close" color="primary" flat)
        div.q-pa-sm
          q-btn(
            label="Validate"
            type="submit"
            color="primary"
          )
    p (If this filing is NOT to be effective immediately, enter the effective date within the next 90 calendar days.)
  div.q-pa-md

</template>
