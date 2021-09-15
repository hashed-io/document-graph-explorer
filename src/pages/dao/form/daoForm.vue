<template lang="pug">
  .PageMargin
    q-card(flat bordered)
      q-stepper(
        v-model="step"
        ref="stepper"
        color="primary"
        header-class='testClass'
        header-nav
        keep-alive
      )
        q-step( :name="1"  title="Business" :done="step > 1" :header-nav="step > 1")
          div.container
            businessName(ref="businessStepComponent" :prefix='1' :bussinessObject='form.businessName'  @dataFromBusinessName="messageFrombusinessNameComponent" )
          q-stepper-navigation
            .containerStep
              q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="2" title="Detail" :prefix='2' :done="step > 2" :header-nav="step > 2" )
          div.container
            detail(ref="detailStepComponent" :detailObject='form.detail' @dataFromDetail="messageFromDetailComponent")
          q-stepper-navigation
            .containerStep
              q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="3" title="Agent" :prefix='3' :done="step>3" :header-nav="step > 3")
          div.container
            agentComponent(ref='agentStepComponent' :agentObject='form.agent' @dataFromAgent='messageFromAgentComponent')
          q-stepper-navigation
            .pageMargin
              q-btn(@click="validateStep" color="primary" label="continue" )
        q-step(:name="4" title="Addresses" :prefix='4' :done="step>4" :header-nav="step > 4")
          div.container
            addressesComponent(ref='addressStepComponent' :addressesObject='form.addresses' @dataFromAddresses='messageFromAddressesComponent')
          q-stepper-navigation
            .containerStep
              q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="5" title="Organizers" :prefix='5' :done="step>5" :header-nav="step > 5")
          div.container
            organizersComponent(ref='organizersStepComponent' :organizerArray='form.organizers' @dataFromOrganizers='messageFromOrganizersComponent')
          q-stepper-navigation
            .pageMargin
              q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="6" title="Articles" :prefix='6' :done="step>6" :header-nav="step > 6")
          div.container
            additionalArticlesComponent(ref='articleStepComponent' :articlesArray='form.additionalArticles' @dataFromAdditionalArticles='messageFromAdditionalArticlesComponent')
          q-stepper-navigation
            .pageMargin
              q-btn(@click ="validateStep" color="primary" label="continue" )
        q-step(:name="7" title="Confirmation" :prefix='7' :done="step>7" :header-nav="step > 7")
          div.container
            confirmationComponent(ref='confirmationStepComponent' :form="form")
          q-stepper-navigation
            .containerStep
              q-btn(@click ="validateStep" color="primary" label="continue")
        q-step(:name="8" title="Signature" :prefix='8' :done="step>8" :header-nav="step > 8")
          div.container
            signatureComponent(ref='signatureStepComponent' :signatureObject='form.fillerInformation' @dataFromSignature='messageFromSignatureComponent')
          q-stepper-navigation
            .row
              .col(style='margin-top:-2%; margin-left: 1.5%;')
                q-input(v-model='daoName' label='Dao Name *' ref='daoNameInput' readonly :rules='[rules.required]')
              .col(style='text-align:end;')
                q-btn(@click='validateStep' dense color="primary" label="Finish & upload to blockchain" )
        //- q-step(:name="9" title="Step 9" caption="Payment" :done="step>9" :header-nav="step > 9")
        //-   div.container
        //-     paymentComponent
</template>
<style lang="sass" scoped>
  .pageMargin
    margin-top: -1%
    margin-left: 1.3%
  .container
    padding-top: 0%
  .containerStep
    margin-top: -1%
    margin-left: 0.5%
</style>
<script>
import { validation } from '~/mixins/validation'
import businessName from '../form/components/businessName.vue'
import detail from '../form/components/detail.vue'
import agentComponent from '../form/components/agent.vue'
import addressesComponent from '../form/components/addresses.vue'
import organizersComponent from '../form/components/organizers.vue'
import additionalArticlesComponent from '../form/components/additionalArticles.vue'
import confirmationComponent from '../form/components/confirmation.vue'
import signatureComponent from '../form/components/signature.vue'
import paymentComponent from '../form/components/payment.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import BrowserIpfs from '~/services/BrowserIpfs'
import { QSpinnerPuff } from 'quasar'
export default {
  name: 'daoForm',
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
    } else {
      this.form = { price: 100,
        businessName: {
          businessName: 'ACME DAO LLC',
          additionalDesignation: 'Decentralized Autonomous Organization'
        },
        detail: {
          periodOfDuration: 'Expires - 50 years',
          expirationDate: '',
          delayedEffectiveDate: '09/14/2021'
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
            country: 'United States of America',
            address: {
              line1: '48764 Howard Forge Apt. 421 Vanessaside, PA 19763',
              line2: null,
              line3: null
            },
            city: 'Changchester',
            state: 'WY',
            postalCode: '9000',
            phone: '(194) 892 - 4115',
            fax: '(194) 892 - 4115',
            email: 'achang@green.info'
          },
          mailingAddress: {
            country: '',
            address: {
              line1: '',
              line2: null,
              line3: null
            },
            city: '',
            state: '',
            postalCode: ''
          }
        },
        organizers: [
          {
            name: 'Wagner LLC',
            officerType: 'Organizer',
            typeName: 'Legal person',
            addressInfo: '848 Melissa Springs Suite 947 Kellerstad, MD 80819'
          },
          {
            name: 'Richard Dixon',
            officerType: 'Organizer',
            typeName: 'Physical person',
            addressInfo: '578 Michael Island New Thomas, NC 34644'
          }
        ],
        additionalArticles: [
          {
            number: '10',
            detail: 'Dolorem quisquam etincidunt magnam magnam tempora dolore. Adipisci eius ut non. Adipisci labore eius porro. Dolorem dolorem quiquia tempora. Amet velit quaerat ut labore non. Est amet amet sed ut sit etincidunt velit.'
          }
        ],
        fillerInformation: {
          filerIs: 'organization',
          firstName: 'Jonathan',
          middleName: null,
          lastName: 'Woods',
          title: 'Dolorem dolore dolorem quisquam est dolore consectetur.',
          phone: '(194)892-4115',
          email: 'juancampos@lloyd.org'
        } }
    }
  },
  computed: {
    ...mapState('accounts', ['account']),
    ...mapState('dao', ['isEdit', 'daoNameStore', 'formStore'])
    // ...mapGetters('accounts', ['account'])
  },
  data () {
    return {
      step: 1,
      typeCid: undefined,
      daoName: 'null',
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
    ...mapActions('dao', ['saveAndDeployDao', 'updateDaoData', 'deployContract', 'initDao']),
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
          window.scrollTo(0, 0)
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
      window.scrollTo(0, 0)
      this.step = 4
    },
    messageFromAddressesComponent (_form) {
      for (var key in this.form.addresses) {
        this.form.addresses[key] = _form[key]
      }
      window.scrollTo(0, 0)
      this.step = 5
    },
    messageFromOrganizersComponent (_form) {
      this.form.organizers = _form
      window.scrollTo(0, 0)
      this.step = 6
    },
    messageFromAdditionalArticlesComponent (_form) {
      this.form.additionalArticles = _form
      window.scrollTo(0, 0)
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
          // loading show [step 1]
          this.$q.loading.show({
            message: ' Saving data and deploy contract...',
            customClass: 'text-weight-bold text-subtitle1',
            spinnerSize: '15em',
            spinner: QSpinnerPuff
          })
          await new Promise(resolve => setTimeout(resolve, 2000))
          // await this.saveAndDeployDao({
          //   dao: this.daoName.toLowerCase(),
          //   creator: this.account,
          //   ipfs: this.typeCid
          // })
          // loading show [step 2]

          this.$q.loading.show({
            message: 'Initializing DAO...',
            customClass: 'text-weight-bold text-subtitle1',
            spinnerSize: '15em',
            spinner: QSpinnerPuff
          })
          await new Promise(resolve => setTimeout(resolve, 2500))
          this.$q.loading.hide()
          // await this.initDao()
          this.showSuccessMsg('Deploy contract success')
          this.$router.push({ name: 'daos' })
        } catch (e) {
          console.log(e)
          this.$q.loading.hide()
          this.showErrorMsg('Error while saving DAO data. ' + e)
          this.$router.push({ name: 'daos' })
        }
      } else {
        this.$q.loading.hide()
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
        this.showSuccessMsg('Data saved in IPFS')
      } catch (e) {
        this.showErrorMsg('Error while saving the data in IPFS. ' + e)
        console.log(e)
      }
      var self = this
      try {
        await this.updateDaoData({
          dao: this.daoName.toLowerCase(),
          ipfs: this.typeCid
        })
        this.showSuccessMsg('Data updated correctly')
        self.setIsEdit = false
        self.setDataForm = null
        self.setDaoName = null
        this.$router.push({ name: 'daos' })
      } catch (e) {
        this.showErrorMsg('Error occurred while data was being updated. ' + e)
        console.log(e)
      }
    }
  }
}
</script>
