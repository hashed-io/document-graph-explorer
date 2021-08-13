<script>
import businessName from './components/businessName.vue'
import detail from './components/detail.vue'
export default {
  name: 'home',
  components: {
    businessName,
    detail
  },
  data () {
    return {
      step: 1,
      validateChild: false,
      form: {
        step1: {
          businessName: '',
          additionalDesignation: 'DAO'
        }
      }
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>
<template lang="pug">
  div.q-pa-md
    div {{form}}
    br
    div {{validateChild}}
    q-stepper.full-width(
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    )
      q-step(
        :name="1"
        title="1. Business Name"
        :done="step > 1"
      )
        div
          businessName(@formData="form.step1.businessName = $event")

      q-step(
        :name="2"
        title="expiration Date"
        :done="step > 2"
      )
        div
          detail
      template(
        v-slot:navigation
      )
        q-stepper-navigation
          q-btn(
            :disabled="validateChild"
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 9 ? 'Finish' : 'Continue'"
          )
          q-btn.q-ml-sm(
            v-if="step > 1"
            flat color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
          )

</template>
