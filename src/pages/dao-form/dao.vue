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
      step: 7,
      validate: {
        businessName: false,
        detail: false,
        agent: false,
        adresses: false,
        organizers: false,
        additionalArticles: false,
        confirmation: false,
        signature: false,
        payment: false

      },
      form: {
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
    messageFromAgentComponent () {
    },
    messageFromAddressesComponent () {
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
    }
  },
  computed: {
  }
}
</script>
<template lang="pug">
  div.q-pa-md
    //- div {{form}}
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
            businessName(@dataFromBusinessName="messageFrombusinessNameComponent")
          q-stepper-navigation
            q-btn(@click = "()=>{done1 = true; step = 2}" color="primary" label="continue" :disabled="validate.businessName")
        q-step( :name="2" title="2. Detail" :done="step > 2" :header-nav="step > 2" )
          div.container
            detail(@dataFromDetail="messageFromDetailComponent")
          q-stepper-navigation
            q-btn(@click = "() => {done2 = true; step = 3}" color="primary" label="continue" :disabled="validate.detail")
        q-step(:name="3" title="3. Agent" :done="step>3" :header-nav="step > 3")
          div.container
            agentComponent
          q-stepper-navigation
            q-btn(@click = "() => {done3 = true; step = 4}" color="primary" label="continue" :disabled="validate.agent")
        q-step(:name="4" title="4. Addresses" :done="step>4" :header-nav="step > 4")
          div.container
            addressesComponent
          q-stepper-navigation
            q-btn(@click = "() => {done4 = true; step = 5}" color="primary" label="continue" :disabled="validate.addresses")
        q-step(:name="5" title="5. Organizers" :done="step>5" :header-nav="step > 5")
          div.container
            organizersComponent
          q-stepper-navigation
            q-btn(@click = "() => {done5 = true; step = 6}" color="primary" label="continue" :disabled="validate.organizers")
        q-step(:name="6" title="6. Additional Articles" :done="step>6" :header-nav="step > 6")
          div.container
            additionalArticlesComponent
          q-stepper-navigation
            q-btn(@click = "() => {done6 = true; step = 7}" color="primary" label="continue" :disabled="validate.additionalArticles")
        q-step(:name="7" title="7. Confirmation" :done="step>7" :header-nav="step > 7")
          div.container
            confirmationComponent
          q-stepper-navigation
            q-btn(@click = "() => {done7 = true; step = 8}" color="primary" label="continue" :disabled="validate.confirmation")
        q-step(:name="8" title="8, Signature" :done="step>8" :header-nav="step > 8")
          div.container
            signatureComponent
          q-stepper-navigation
            q-btn(@click = "() => {done8 = true; step = 9}" color="primary" label="continue" :disabled="validate.signature")
        q-step(:name="9" title="9. Payment" :done="step>9" :header-nav="step > 9")
          div.container
            paymentComponent
          q-stepper-navigation
            q-btn(@click = "() => {done9 = true; step = 1}" color="primary" label="continue" :disabled="validate.payment")
        //-
                Footer Stepper
          //
        template(
          v-slot:navigation
        )
          //- q-stepper-navigation
          //-   q-btn(
          //-     :disabled="validateChild"
          //-     @click="$refs.stepper.next()"
          //-     color="primary"
          //-     :label="step === 9 ? 'Finish' : 'Continue'"
          //-   )
          //-   q-btn.q-ml-sm(
          //-     v-if="step > 1"
          //-     flat color="primary"
          //-     @click="$refs.stepper.previous()"
          //-     label="Back"
          //-   )

</template>
