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
        v-show='!isEdit'
        type="submit",
        @click="onSubmit",
        dense,
        color="primary",
        label="Finish & upload to blockchain"
      )
      q-btn(
        v-show='isEdit'
        type="submit",
        @click="updateDAO",
        dense,
        color="primary",
        label="Update the DAO"
      )
</template>

<script>
import { validation } from 'src/mixins/validation.js'
import { mapActions, mapState } from 'vuex'
import { QSpinnerPuff } from 'quasar'
import keys from 'src/utils/keys.js'

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
    let params = this.selectedDAO
    if (this.isEdit) {
      this.daoName = params.dao
      this.accountLogged = params.creator
      if (params.attributes.length > 0) { this.website = params.attributes[1].second[1] }
    } else {
      this.daoName = this.account
      this.accountLogged = this.account
    }
  },
  computed: {
    ...mapState('accounts', ['account']),
    ...mapState('dao', ['isEdit', 'daoNameStore', 'formStore', 'selectedDAO'])
  },
  methods: {
    ...mapActions('dao', [
      'createDaoSimple',
      'updateDaoSimple',
      'deployContractSimple',
      'initDaoSimple',
      'getDaos',
      'upserattributes'
    ]),
    async onSubmit () {
      if (await this.$refs.daoForm.validate()) {
        await this.callCreateDAO()
        this.$router.push({ name: 'daos' })
        // await this.deployingContract()
        // await this.initializedDao()
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
          ipfs: '',
          basic: false
        })
        await this.setAttributes()
        this.$q.loading.hide()
      } catch (e) {
        console.log(e)
        this.$q.loading.hide()
        this.showErrorMsg('An error occurred when the dao was created' + e)
      }
      this.$router.push({ name: 'daos' })
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
          { first: key2, second: ['string', this.website] }
        ]
        console.log(variantValue)
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
    async updateDAO () {
      try {
        await this.modifyAttributes()
        this.$router.push({ name: 'daos' })
      } catch (e) {
        this.showErrorMsg('An error ocurred while call update action ', e)
        console.error('An error ocurred while call update action ', e)
      }
    },
    async onEdit () {
      try {
        await this.callUpdateAction()
        await this.modifyAttributes()
      } catch (e) {
        this.showErrorMsg('An error ocurred while on Edit the DAO ', e)
        console.error('An error ocurred while on Edit the DAO ', e)
      }
    },
    async modifyAttributes () {
      try {
        const key1 = keys.key1
        const key2 = keys.key2
        let variantValue = [
          { first: key1, second: ['string', this.daoName.toLowerCase()] },
          { first: key2, second: ['string', this.website] }
        ]
        await this.upserattributes({
          daoId: this.selectedDAO.dao_id,
          Attributes: variantValue
        })
      } catch (e) {
        this.showErrorMsg('An error ocurred while modifying the attributes ', e)
        console.error('An error ocurred while modifying the attributes ', e)
      }
    }
  }
}
</script>
<style>
</style>
