<template lang='pug'>
q-card
  q-card-section.text-subtitle1.bg-primary.text-white
    | Create DAO
  .text-subtitle2.q-pt-md.q-px-md {{ $t('pages.daoSimple.text') }}
  q-form.row.q-col-gutter-md.q-px-md(@submit="onSubmit", ref="daoForm")
    .col-4
      q-input(
        v-model="accountLogged"
        label="Signed by"
        ref='signedInput'
        data-cy='signedInput'
        disabled
      )
    .col-4
      q-input(
        v-model="daoName",
        label="DAO Name",
        ref="daoNameInput",
        :rules="[rules.required]"
      )
    .col-4
      q-input(v-model="website", label="Web site of DAO", ref="websiteInput")
  .row.q-pa-md
    .col(style="text-align: end")
      q-btn(
        type="submit",
        @click="onSubmit",
        dense,
        color="primary",
        label="Finish & upload to blockchain"
      )
</template>

<script>
import { validation } from 'src/mixins/validation.js'
import { mapActions, mapState } from 'vuex'
import { QSpinnerPuff } from 'quasar'

export default {
  name: 'daoFormSimple',
  mixins: [validation],
  data () {
    return {
      accountLogged: undefined,
      flagAbi: undefined,
      daoName: undefined,
      website: undefined
    }
  },
  mounted () {
    this.daoName = this.account
    this.accountLogged = this.account
  },
  computed: {
    ...mapState('accounts', ['account'])
  },
  methods: {
    ...mapActions('dao', [
      'createDaoSimple',
      'updateDaoSimple',
      'deployContractSimple',
      'initDaoSimple'
    ]),
    async onSubmit () {
      if (await this.$refs.daoForm.validate()) {
        await this.callCreateDAO()
        // await this.deployingContract()
        // await this.initializedDao()
      }
    },
    async verifiedAbiExists () {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      for (let i = 0; i <= 5; i++) {
        let response = await this.$store.$defaultApi.rpc.get_abi(
          this.daoName.toLowerCase()
        )
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
    async callCreateDAO () {
      try {
        // loading show [step 1]
        this.$q.loading.show({
          message: 'Creating DAO...',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await new Promise((resolve) => setTimeout(resolve, 200))
        await this.createDaoSimple({
          dao: this.daoName.toLowerCase(),
          creator: this.account,
          ipfs: this.website,
          basic: false
        })
        this.$q.loading.hide()
      } catch (e) {
        console.log(e)
        this.$q.loading.hide()
        this.showErrorMsg('An error occurred when the dao was created' + e)
      }
      this.$router.push({ name: 'daos' })
    },
    async deployingContract () {
      try {
        this.$q.loading.show({
          message: 'Setting DAO..',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await new Promise((resolve) => setTimeout(resolve, 200))
        await this.deployContractSimple({
          accountName: this.daoName.toLowerCase()
        })
        this.$q.loading.hide()
      } catch (e) {
        this.$q.loading.hide()
        this.showErrorMsg(
          'An error ocurred while the contract was deployed. ' + e
        )
      }
    },
    async initializedDao () {
      try {
        this.$q.loading.show({
          message: 'Initializing DAO...',
          customClass: 'text-weight-bold text-subtitle1',
          spinnerSize: '15em',
          spinner: QSpinnerPuff
        })
        await this.verifiedAbiExists()
        if (this.flagAbi) {
          console.log('Found ABI')
          this.hasAbi = true
          await this.initDaoSimple({
            account: this.daoName.toLowerCase()
          })
          this.$q.loading.hide()
          this.$router.push({ name: 'daos' })
        } else {
          console.log('NOT Found ABI')
          this.$q.loading.hide()
          this.showErrorMsg(
            'An error occurred when the smart contract was deployed'
          )
          this.$router.push({ name: 'daos' })
        }
        this.$q.loading.hide()
      } catch (e) {
        this.showErrorMsg('An error occur while the DAO was initialized')
        this.$q.loading.hide()
      }
    },
    async updateDAO () {
      this.updateDaoSimple({})
    }
  }
}
</script>
<style>
</style>
