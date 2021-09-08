<template lang="pug">
  div.q-pa-md
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
            businessName(ref="businessStepComponent" :bussinessObject='form.businessName'  @dataFromBusinessName="messageFrombusinessNameComponent" )
          q-stepper-navigation
            q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="2" title="2. Detail" :done="step > 2" :header-nav="step > 2" )
          div.container
            detail(ref="detailStepComponent" :detailObject='form.detail' @dataFromDetail="messageFromDetailComponent")
          q-stepper-navigation
            q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="3" title="3. Agent" :done="step>3" :header-nav="step > 3")
          div.container
            agentComponent(ref='agentStepComponent' :agentObject='form.agent' @dataFromAgent='messageFromAgentComponent')
          q-stepper-navigation
            q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="4" title="4. Addresses" :done="step>4" :header-nav="step > 4")
          div.container
            addressesComponent(ref='addressStepComponent' :addressesObject='form.addresses' @dataFromAddresses='messageFromAddressesComponent')
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="5" title="5. Organizers" :done="step>5" :header-nav="step > 5")
          div.container
            organizersComponent(ref='organizersStepComponent' :organizerArray='form.organizers' @dataFromOrganizers='messageFromOrganizersComponent')
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="6" title="6. Additional Articles" :done="step>6" :header-nav="step > 6")
          div.container
            additionalArticlesComponent(ref='articleStepComponent' :articlesArray='form.additionalArticles' @dataFromAdditionalArticles='messageFromAdditionalArticlesComponent')
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="7" title="7. Confirmation" :done="step>7" :header-nav="step > 7")
          div.container
            confirmationComponent(ref='confirmationStepComponent' :form="form")
          q-stepper-navigation
            q-btn(@click ="validateStep" color="primary" label="continue")
        q-step(:name="8" title="8. Signature" :done="step>8" :header-nav="step > 8")
          div.container
            signatureComponent(ref='signatureStepComponent' :signatureObject='form.fillerInformation' @dataFromSignature='messageFromSignatureComponent')
          q-stepper-navigation
            .row
              .col
                q-input(v-model='daoName' label='Dao Name *' ref='daoNameInput' :readonly='isEdit' :rules='[rules.required]')
              .col(style='text-align:end;')
                q-btn(@click='validateStep' color="primary" label="Finish" )
        //- q-step(:name="9" title="9. Payment" :done="step>9" :header-nav="step > 9")
        //-   div.container
        //-     paymentComponent
</template>

<script>
import { validation } from '~/mixins/validation'
import businessName from '../add/components/businessName.vue'
import detail from '../add/components/detail.vue'
import agentComponent from '../add/components/agent.vue'
import addressesComponent from '../add/components/addresses.vue'
import organizersComponent from '../add/components/organizers.vue'
import additionalArticlesComponent from '../add/components/additionalArticles.vue'
import confirmationComponent from '../add/components/confirmation.vue'
import signatureComponent from '../add/components/signature.vue'
import paymentComponent from '../add/components/payment.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import BrowserIpfs from '~/services/BrowserIpfs'
export default {
  name: 'registerdao',
  mixins: [validation],
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
  created () {
    this.daoName = this.account
    if (this.isEdit) {
      this.form = JSON.parse(JSON.stringify(this.formStore))
    }
  },
  computed: {
    ...mapState('accounts', ['account']),
    ...mapState('dao', ['isEdit', 'daoNameStore', 'formStore'])
    // ...mapGetters('accounts', ['account'])
  },
  data () {
    return {
      step: 8,
      typeCid: undefined,
      daoName: null,
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
          filerIs: null,
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
    ...mapActions('dao', ['saveDaoData', 'updateDaoData', 'deployContract']),
    ...mapMutations('dao', ['setIsEdit', 'setDataForm', 'setDaoName']),
    validateStep () {
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
      if (this.isEdit) {
        this.updateDataContract()
      } else {
        this.saveDataContract()
      }
    },
    async saveDataContract () {
      // Make JSON File to send IPFS
      const valid = this.$refs.daoNameInput.validate()
      if (valid) {
        console.log('Saving data...', this.form)
        try {
          if (this.form !== '') {
            let data = this.form
            this.typeCid = await BrowserIpfs.addAsJson({ data })
          }

          await this.saveDaoData({
            // dao: this.daoName.toLowerCase(),
            // creator: this.account,
            ipfs: this.typeCid
          })
          // asdsfa
          // await this.deployContract({ deployContract: this.account })
          // this.$router.push('dashboard')
        } catch (e) {
          this.showErrorMsg('Error while saving DAO data. ' + e)
          console.log(e)
        }
      } else {
        this.showErrorMsg('Fill the DAO Name')
      }
    },
    async updateDataContract () {
      console.log('Edit on blockchain')
      try {
        if (this.form !== '') {
          let data = this.form
          this.typeCid = await BrowserIpfs.addAsJson({ data })
        }
      } catch (e) {
        console.log(e)
      }
      var self = this
      try {
        await this.updateDaoData({
          dao: this.daoName.toLowerCase(),
          ipfs: this.typeCid
        })
        self.setIsEdit = false
        self.setDataForm = null
        self.setDaoName = null
        self.$router.push('dashboard')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
