<template lang="pug">
  div
    //- q-btn.back( icon='fas fa-arrow-left' color="primary" flat dense size="14px" @click="$router.push({name: 'daos'})")
    q-card(flat bordered)
      q-stepper(
        v-model="step"
        ref="stepper"
        color="primary"
        :contracted ="boolContracted"
        header-nav
        keep-alive
      )
        q-step( :name="1"  title="Business" :done="step > 1" :header-nav="step > 1")
          div.container
            businessName(ref="businessStepComponent" :prefix='1' :bussinessObject='form.businessName'  @dataFromBusinessName="messageFrombusinessNameComponent" )
          q-stepper-navigation
            .containerStep
              q-btn(@click="validateStep" data-cy='step1Button' color="primary" label="continue" )
        q-step(:name="2" title="Detail" :prefix='2' :done="step > 2" :header-nav="step > 2" )
          div.container
            detail(ref="detailStepComponent" :detailObject='form.detail' @dataFromDetail="messageFromDetailComponent")
          q-stepper-navigation
            .containerStep
              q-btn(data-cy='step2Button' @click="validateStep" color="primary" label="continue" )
        q-step(:name="3" title="Agent" :prefix='3' :done="step>3" :header-nav="step > 3")
          div.container
            agentComponent(ref='agentStepComponent' :agentObject='form.agent' @dataFromAgent='messageFromAgentComponent')
          q-stepper-navigation
            .containerStepAgent
              q-btn(data-cy='step3Button' @click="validateStep" color="primary" label="continue" )
        q-step(:name="4" title="Addresses" :prefix='4' :done="step>4" :header-nav="step > 4")
          div.container
            addressesComponent(ref='addressStepComponent' :addressesObject='form.addresses' @dataFromAddresses='messageFromAddressesComponent')
          q-stepper-navigation
            .containerStep
              q-btn(data-cy='step4Button' @click ="validateStep" color="primary" label="continue" )
        q-step(:name="5" title="Organizers" :prefix='5' :done="step>5" :header-nav="step > 5")
          div.container
            organizersComponent(ref='organizersStepComponent' :organizerArray='form.organizers' @dataFromOrganizers='messageFromOrganizersComponent')
          q-stepper-navigation
            .containerStepAgent
              q-btn(data-cy='step5Button' @click ="validateStep" color="primary" label="continue" )
        q-step(:name="6" title="Articles" :prefix='6' :done="step>6" :header-nav="step > 6")
          div.container
            additionalArticlesComponent(ref='articleStepComponent' :articlesArray='form.additionalArticles' @dataFromAdditionalArticles='messageFromAdditionalArticlesComponent')
          q-stepper-navigation
            .containerStepAgent
              q-btn(data-cy='step6Button' @click ="validateStep" color="primary" label="continue" )
        q-step(:name="7" title="Confirmation" :prefix='7' :done="step>7" :header-nav="step > 7")
          div.container
            confirmationComponent(ref='confirmationStepComponent' :form="form")
          q-stepper-navigation
            .containerStepAgent
              q-btn(data-cy='step7Button' @click ="validateStep" color="primary" label="continue")
        q-step(:name="8" title="Signature" :prefix='8' :done="step>8" :header-nav="step > 8")
          div.container
            signatureComponent(ref='signatureStepComponent' :signatureObject='form.fillerInformation' @dataFromSignature='messageFromSignatureComponent')
          q-stepper-navigation
            .row.q-col-gutter-md.q-px-md
              .col-6
                q-input(data-cy='daoName' v-model='daoName' label='Signed by' ref='daoNameInput' :readonly='isEdit' :rules='[rules.required]')
              .col-6
                q-input(data-cy='website' v-model='websiteDAO' label='Website of DAO' ref='websiteDAOInput' :rules='[rules.required]')
              .col-12(style='text-align:end;')
                q-btn(v-if='isEdit' @click='validateStep' dense color="primary" label="Save data" )
                q-btn(v-else data-cy='finishForm' @click='validateStep' dense color="primary" label="Finish & upload to blockchain" )
</template>
<style lang="sass" scoped>
  .containerStepAgent
    margin-left: 0%
    margin-top: -1%
  .container
    padding-top: 0%
  .containerStep
    margin-top: -1%
    margin-left: 0.5%
</style>
<script>
import businessName from '../form/components/businessName.vue'
import detail from '../form/components/detail.vue'
import agentComponent from '../form/components/agent.vue'
import addressesComponent from '../form/components/addresses.vue'
import organizersComponent from '../form/components/organizers.vue'
import additionalArticlesComponent from '../form/components/additionalArticles.vue'
import confirmationComponent from '../form/components/confirmation.vue'
import signatureComponent from '../form/components/signature.vue'
import paymentComponent from '../form/components/payment.vue'
import daoInformation from 'src/utils/daoInformation.js'
import BrowserIpfs from '~/services/BrowserIpfs'
import { validation } from '~/mixins/validation'
import { mapActions, mapMutations, mapState } from 'vuex'
import { QSpinnerPuff } from 'quasar'
import keys from 'src/utils/keys.js'

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
  watch: {
    '$q.screen.width' () {
      this.windowResized()
    }
  },
  created () {
    this.windowResized()
    if (this.isEdit) {
      this.daoName = this.selectedDAO.dao
      let attributesArray = this.selectedDAO.attributes
      if (attributesArray.length > 0) {
        this.websiteDAO = attributesArray[1].second[1]
      }
      this.form = JSON.parse(JSON.stringify(this.formStore))
    } else {
      this.daoName = this.account
      this.form = daoInformation
    }
  },
  computed: {
    ...mapState('accounts', ['account']),
    ...mapState('dao', ['isEdit', 'daoNameStore', 'formStore', 'selectedDAO'])
  },
  data () {
    return {
      step: 1,
      boolContracted: false,
      typeCid: undefined,
      daoName: 'null',
      websiteDAO: null,
      params: {
        offset: 0,
        limit: 5,
        search: undefined,
        customOffset: undefined,
        nextKey: undefined
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
    ...mapActions('dao', ['createDao', 'updateDaoData', 'deployContract', 'initDao', 'getDaos', 'upserattributes']),
    ...mapMutations('dao', ['setIsEdit', 'setDataForm', 'setDaoName']),
    windowResized () {
      if (this.$q.screen.width < 600) {
        this.boolContracted = true
      } else {
        this.boolContracted = false
      }
    },
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
    async saveData () {
      if (this.isEdit) {
        await this.updateDataContract()
        await this.updateAttributes()
        this.$router.push({ name: 'daos' })
      } else {
        this.saveDataContract()
      }
    },
    async verifiedAbiExists () {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      for (let i = 0; i <= 15; i++) {
        let response = await this.$store.$defaultApi.rpc.get_abi(this.daoName.toLowerCase())
        if (response.hasOwnProperty('abi')) {
          this.flagAbi = true
          break
        }
        console.log('Finding ABI')
        await delay(500)
      }
      if (this.flagAbi) {
        return true
      } else {
        return false
      }
    },
    async saveDataContract () {
      // Make JSON File to send IPFS
      const valid = this.$refs.daoNameInput.validate()
      if (valid) {
        try {
          if (this.form !== '') {
            await this.saveDataIPFS()
          }
          await this.callCreateDAO()
          await this.deployingContract()
          await this.initializedDAO()
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
    async saveDataIPFS () {
      try {
        let data = this.form
        this.$q.loading.show({
          message: ' Saving the dao information...',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await new Promise(resolve => setTimeout(resolve, 200))
        this.typeCid = await BrowserIpfs.addAsJson({ data })
      } catch (e) {
        this.showErrorMsg('An error has occured while saving data in IPFS ' + e)
        console.log('An error occur has ocurred while saving data in IPFS ' + e)
      }
    },
    async callCreateDAO () {
      try {
        // loading show [step 1]
        this.$q.loading.show({
          message: 'Creating DAO...',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await new Promise(resolve => setTimeout(resolve, 200))
        await this.createDao({
          dao: this.daoName.toLowerCase(),
          creator: this.account,
          ipfs: this.typeCid
        })
        await this.setAttributes()
      } catch (error) {
        this.$q.loading.hide()
        this.showErrorMsg('An error has occured while creating the DAO ' + error)
        console.log('An error occur has ocurred while creating the DAO ' + error)
      }
    },
    async setAttributes () {
      try {
        let newRows = await this.getDaos({
          ...this.params,
          search: undefined
        })
        let lastIndex = newRows.rows.length - 1
        let lastID = newRows.rows[lastIndex].dao_id
        const key1 = keys.key1
        const key2 = keys.key2

        let variantValue = [
          { first: key1, second: ['string', this.daoName.toLowerCase()] },
          { first: key2, second: ['string', this.websiteDAO] }
        ]
        await this.upserattributes({
          daoId: lastID,
          Attributes: variantValue
        })
      } catch (error) {
        this.$q.loading.hide()
        this.showErrorMsg('An error has occured while setting attributes ' + error)
        console.log('An error occur has ocurred while setting attributes ' + error)
      }
    },
    async deployingContract () {
      try {
        this.$q.loading.show({
          message: 'Setting DAO..',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await new Promise(resolve => setTimeout(resolve, 200))
        await this.deployContract({
          accountName: this.daoName.toLowerCase()
        })
      } catch (error) {
        this.$q.loading.hide()
        this.showErrorMsg('An error has occured while deploying the contract ' + error)
        console.log('An error occur has ocurred while deploying the contract ' + error)
      }
    },
    async initializedDAO () {
      try {
        this.$q.loading.show({
          message: 'Initializing DAO...',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await this.verifiedAbiExists()
        if (this.flagAbi) {
          this.hasAbi = true
          await this.initDao({
            account: this.daoName.toLowerCase()
          })
          this.$q.loading.hide()
          this.$router.push({ name: 'daos' })
        } else {
          this.$q.loading.hide()
          this.showErrorMsg('An error occurred when the smart contract was deployed')
          console.error('An error occurred when the smart contract was deployed')
          this.$router.push({ name: 'daos' })
        }
      } catch (error) {
        this.$q.loading.hide()
        this.showErrorMsg('An error has occured while initializing the contract ' + error)
        console.log('An error occur has ocurred while initializing the contract ' + error)
      }
    },
    async updateDataContract () {
      // save on IPFS before to update on BlockChain
      try {
        if (this.form !== '') {
          let data = this.form
          this.typeCid = await BrowserIpfs.addAsJson({ data })
          this.showSuccessMsg('Data saved in IPFS')
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      } catch (e) {
        this.showErrorMsg('Error while saving the data in IPFS. ' + e)
        console.log(e)
      }
      var self = this
      try {
        await this.updateDaoData({
          daoId: this.selectedDAO.dao_id,
          ipfs: this.typeCid
        })
        this.showSuccessMsg('Data updated correctly')
        self.setIsEdit = false
        self.setDataForm = null
        self.setDaoName = null
        // this.$emit('backToListDao', true)
      } catch (e) {
        this.showErrorMsg('Error occurred while data was being updated. ' + e)
        console.log(e || e.message)
      }
    },
    async updateAttributes () {
      try {
        const key1 = keys.key1
        const key2 = keys.key2
        let variantValue = [
          { first: key1, second: ['string', this.daoName.toLowerCase()] },
          { first: key2, second: ['string', this.websiteDAO] }
        ]
        await this.upserattributes({
          daoId: this.selectedDAO.dao_id,
          Attributes: variantValue
        })
      } catch (error) {
        this.$q.loading.hide()
        this.showErrorMsg('An error has occured while setting attributes ' + error)
        console.log('An error occur has ocurred while setting attributes ' + error)
      }
    }
  }
}
</script>
