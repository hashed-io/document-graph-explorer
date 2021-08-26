<template lang="pug">
  div.q-pa-md
    div
      p {{form.businessName}}
      hr
      p {{form.detail}}
      hr
      p {{form.agent}}
      hr
      p {{form.addresses}}
      hr
      p {{form.organizers}}
      hr
      p {{form.additionalArticles}}
      hr
      p {{form.fillerInformation}}
      hr
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
            businessName(ref="businessStepComponent" @dataFromBusinessName="messageFrombusinessNameComponent" )
          q-stepper-navigation
            q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="2" title="2. Detail" :done="step > 2" :header-nav="step > 2" )
          div.container
            detail(ref="detailStepComponent" @click="validateStep" @dataFromDetail="messageFromDetailComponent")
          q-stepper-navigation
            q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="3" title="3. Agent" :done="step>3" :header-nav="step > 3")
          div.container
            agentComponent(ref='agentStepComponent' @dataFromAgent='messageFromAgentComponent')
          q-stepper-navigation
            q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="4" title="4. Addresses" :done="step>4" :header-nav="step > 4")
          div.container
            addressesComponent(ref='addressStepComponent' @dataFromAddresses='messageFromAddressesComponent')
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="5" title="5. Organizers" :done="step>5" :header-nav="step > 5")
          div.container
            organizersComponent(ref='organizersStepComponent' @dataFromOrganizers='messageFromOrganizersComponent')
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="6" title="6. Additional Articles" :done="step>6" :header-nav="step > 6")
          div.container
            additionalArticlesComponent(ref='articleStepComponent' @dataFromAdditionalArticles='messageFromAdditionalArticlesComponent')
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="7" title="7. Confirmation" :done="step>7" :header-nav="step > 7")
          div.container
            confirmationComponent(ref='confirmationStepComponent' :form="form")
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue")
        q-step(:name="8" title="8. Signature" :done="step>8" :header-nav="step > 8")
          div.container
            signatureComponent(ref='signatureStepComponent' @dataFromSignature='messageFromSignatureComponent')
          q-stepper-navigation
            q-btn(@click='validateStep' color="primary" label="Finish" )
        //- q-step(:name="9" title="9. Payment" :done="step>9" :header-nav="step > 9")
        //-   div.container
        //-     paymentComponent

</template>

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
      step: 8,
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
        additionalArticles: [],
        fillerInformation: {
          firstName: null,
          middleName: null,
          lastName: null,
          title: null,
          phone: null,
          email: null
        }
      }
    }
  },
  methods: {
    validateStep () {
      console.log('validateStep', this.step)
      switch (this.step) {
        case 1:
          this.$refs.businessStepComponent.onSubmit()
          break
        case 2:
          this.$refs.detailStepComponent.onSubmit()
          break
        case 3:
          this.$refs.agentStepComponent.onSubmit()
          break
        case 4:
          this.$refs.addressStepComponent.onSubmit()
          break
        case 5:
          this.$refs.organizersStepComponent.onSubmitOrganizer()
          break
        case 6:
          this.$refs.articleStepComponent.onSubmitArticles()
          break
        case 7:
          this.step = 8
          // this.$refs.addressStepComponent.onSubmit()
          break
        case 8:
          this.$refs.signatureStepComponent.onSubmit()
          break
        // Guardar archivo JSON FILE
        case 9:
          break
      }
    },
    messageFrombusinessNameComponent (businessName) {
      this.form.businessName.businessName = businessName
      this.step = 2
    },
    messageFromDetailComponent (_form) {
      this.form.detail.periodOfDuration = _form.periodOfDuration
      this.form.detail.expirationDate = _form.expirationDate
      this.form.detail.delayedEffectiveDate = _form.delayedEffectiveDate
      this.step = 3
    },
    messageFromAgentComponent (_form) {
      for (var key in this.form.agent) {
        this.form.agent[key] = _form[key]
      }
      this.step = 4
    },
    messageFromAddressesComponent (_form) {
      for (var key in this.form.addresses) {
        this.form.addresses[key] = _form[key]
      }
      this.step = 5
    },
    messageFromOrganizersComponent (_form) {
      this.form.organizers = _form
      this.step = 6
    },
    messageFromAdditionalArticlesComponent (_form) {
      this.form.additionalArticles = _form
      this.step = 7
    },
    messageFromSignatureComponent (_form) {
      for (var key in this.form.fillerInformation) {
        this.form.fillerInformation[key] = _form[key]
      }
      this.saveData()
    },
    saveData () {
      //
      // Make JSON File to send IPFS
      console.log('Saving data...')
      const data = JSON.stringify(this.form)
      const blob = new Blob([data], { type: 'text/json' })
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
      a.download = 'formData.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  },
  computed: {
  }
}
</script>
