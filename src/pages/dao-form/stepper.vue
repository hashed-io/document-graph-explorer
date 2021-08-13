<script>
import { mapGetters } from 'vuex'
import businessName from './components/businessName.vue'
export default {
  name: 'home',
  components: { businessName },
  data () {
    return {
      step: 1
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters('DAO', ['businessEntityName', 'expirationDate'])
  }
}
</script>
<template lang="pug">
  div.q-pa-md
    div.
      Datos almacenados|
      {{businessEntityName}} -- {{expirationDate}}
    q-stepper.full-width(
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    )
      q-step(
        :name="1"
        title="Business Name"
        :done="step > 1"
      )
        div
          businessName

      q-step(
        :name="2"
        title="expiration Date"
        :done="step > 2"
      ).
        FORM2-Quisquam sed quisquam consectetur sed magnam ut.2
      template(
        v-slot:navigation
      )
        q-stepper-navigation
          q-btn(
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 4 ? 'Finish' : 'Continue'"
          )
          q-btn.q-ml-sm(
            v-if="step > 1"
            flat color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
          )

</template>
