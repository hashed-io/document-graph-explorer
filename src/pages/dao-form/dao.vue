<script>
import businessName from './components/businessName.vue'
import detail from './components/detail.vue'
import agentComponent from './components/agent.vue'
import addressesComponent from './components/addresses.vue'
import organizersComponent from './components/organizers.vue'
import additionalArticlesComponent from './components/additionalArticles.vue'
import confirmationComponent from './components/confirmation.vue'
import signatureComponent from './components/signature.vue'
import paymentComponent from './components/payment.vue'

export default {
  name: 'home',
  components: {
    businessName,
    detail,
    agentComponent,
    addressesComponent,
    organizersComponent,
    additionalArticlesComponent,
    confirmationComponent,
    signatureComponent,
    paymentComponent
  },
  data () {
    return {
      step: 5,
      triggerValidation: false,
      validate: {
        businessName: false,
        detail: false,
        agent: false,
        addresses: false,
        organizers: false,
        additionalArticles: false,
        confirmation: false,
        signature: false,
        payment: false

      },
      form: {
        price: 100,
        businessName: {
          businessName: '',
          additionalDesignation: 'Decentralized Autonomous Organization'
        },
        detail: {
          periodOfDuration: '',
          expirationDate: '',
          delayedEffectiveDate: ''
        },
        agent: {
          firstName: null,
          middleName: null,
          lastName: null,
          organization: null,
          country: 'USA',
          address: {
            line1: null,
            line2: null,
            line3: null
          },
          city: null,
          state: 'WY',
          postalCode: null,
          phone: null,
          email: null
        },
        addresses: {
          principalAddress: {
            country: null,
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
            country: null,
            address: {
              line1: null,
              line2: null,
              line3: null
            },
            city: null,
            state: null,
            postalCode: null
          }
        },
        organizers: [],
        additionalArticles: []
      }
    }
  },
  methods: {
    messageFrombusinessNameComponent (businessName, validate) {
      this.form.businessName.businessName = businessName
      this.validate.businessName = validate
    },
    messageFromDetailComponent (_form, validate) {
      // console.log(form)
      this.form.detail.periodOfDuration = _form.periodOfDuration
      this.form.detail.expirationDate = _form.expirationDate
      this.form.detail.delayedEffectiveDate = _form.delayedEffectiveDate
      this.validate.detail = validate
      // console.log(this.form.detail)
    },
    messageFromAgentComponent (_form, validate) {
      for (var key in this.form.agent) {
        this.form.agent[key] = _form[key]
      }
      this.validate.agent = validate
    },
    messageFromAddressesComponent (_form, validate) {
      for (var key in this.form.addresses) {
        this.form.addresses[key] = _form[key]
      }
      this.validate.addresses = validate
    },
    messageFromOrganizersComponent () {
    },
    messageFromAdditionalArticlesComponent () {
    },
    messageFromConfirmationComponent () {
    },
    messageFromSignatureComponent () {
    },
    messageFromPaymentComponent () {
    },
    nextForm (currentStepName, currentStep) {
      if (!this.validate[currentStepName]) {
        this.step = currentStep
      } else {
        this.step = this.step + 1
      }
      this.triggerValidation = !this.triggerValidation
    }
  },
  computed: {
  }
}
</script>
<template lang="pug">
  div.q-pa-md
    //- | {{form}}
    br
    div
      q-stepper.full-width(
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        header-nav
        keep-alive
      )
        q-step( :name="1" title="1. Business Name" :done="step > 1" :header-nav="step > 1")
          div.container
            businessName(@dataFromBusinessName="messageFrombusinessNameComponent" :validateprop="triggerValidation")
          q-stepper-navigation
            q-btn(@click ="() => {triggerValidation=!triggerValidation;(validate.businessName)? step=2:step=1;}" color="primary" label="continue" )
        q-step( :name="2" title="2. Detail" :done="step > 2" :header-nav="step > 2" )
          div.container
            detail(@dataFromDetail="messageFromDetailComponent")
          q-stepper-navigation
            q-btn(@click = "() => {done = true; step++;}" color="primary" label="continue" :disabled="validate.detail")
        q-step(:name="3" title="3. Agent" :done="step>3" :header-nav="step > 3")
          div.container
            agentComponent(@dataFromAgent='messageFromAgentComponent')
          q-stepper-navigation
            q-btn(@click = "() => {done = true; step++}" color="primary" label="continue" :disabled="validate.agent")
        q-step(:name="4" title="4. Addresses" :done="step>4" :header-nav="step > 4")
          div.container
            addressesComponent(@dataFromAddresses='messageFromAddressesComponent')
          q-stepper-navigation
            q-btn(@click = "() => {done = true; step++}" color="primary" label="continue" :disabled="validate.addresses")
        q-step(:name="5" title="5. Organizers" :done="step>5" :header-nav="step > 5")
          div.container
            organizersComponent(@dataFromOrganizers='messageFromOrganizersComponent')
          q-stepper-navigation
            q-btn(@click = "() => {done = true; step++}" color="primary" label="continue" :disabled="validate.organizers")
        q-step(:name="6" title="6. Additional Articles" :done="step>6" :header-nav="step > 6")
          div.container
            additionalArticlesComponent
          q-stepper-navigation
            q-btn(@click = "() => {done = true; step++}" color="primary" label="continue" :disabled="validate.additionalArticles")
        q-step(:name="7" title="7. Confirmation" :done="step>7" :header-nav="step > 7")
          div.container
            confirmationComponent(:form="form")
          q-stepper-navigation
            q-btn(@click = "() => {done = true; step++}" color="primary" label="continue" :disabled="validate.confirmation")
        q-step(:name="8" title="8. Signature" :done="step>8" :header-nav="step > 8")
          div.container
            signatureComponent
        //-   q-stepper-navigation
        //-     q-btn(@click = "() => {done = true; step++}" color="primary" label="continue" :disabled="validate.signature")
        //- q-step(:name="9" title="9. Payment" :done="step>9" :header-nav="step > 9")
        //-   div.container
        //-     paymentComponent

</template>
