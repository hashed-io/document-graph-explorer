<script>
import { date } from 'quasar'
export default {
  name: 'detail',
  data () {
    return {
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
      const timeStamp = Date.now()
      const formattedString = date.formatDate(timeStamp, 'MM-DD-YYYY')
      if (this.selectValue.value === 'none' || this.selectValue.value === null) {
        return formattedString
      }
      // let modifiedDate = TimeUtil.addDays(formattedString, 10)
      return formattedString
    }
  },
  beforeMount () {
  }
}
</script>
<template lang="pug">
div
  p.
    Provide additional information related to the Limited Liability Company as it applies.
  p {{selectValue}}
  q-select(
    filled
    v-model="selectValue"
    :options="options"
    map-options
    stack-label
    label="Period of Duration"
    @change="calculateDate"
  )
  label.q-px-sm.
    (select 'Perpetual' if the entity does not expire.)
  div(
    v-if="(selectValue.value !== '0') && (selectValue.value !== 'none') "
  )
    p
      strong.
        Expiration Date (mm/dd/yyyy)
      p  {{calculateDate}}
  div(
    v-else
  )
    p
      strong.
        Expiration Date (mm/dd/yyyy)
      p  {{calculateDate}}
  //- div.container
  //-   q-input(
  //-     filled
  //-     v-model="form.delayedEffectiveDate"
  //-     mask="date"
  //-     :rules="['date']"
  //-   )
  //-     template(v-slot:apped)
  //-       q-icon(name="event" class="cursor-pointer")
  //-         q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
  //-           q-date(v-model='2019/02/01')
  //-             div(class="row items-center justify-end")
  //-               q-btn(v-close-popup label="Close" color="primary" flat)
</template>
