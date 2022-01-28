import { mapActions } from 'vuex'

export const validation = {
  data () {
    return {
      rules: {
        accountExists: async account => !(await this.isAccountFree(account.toLowerCase())) || this.$t('forms.errors.accountNotExists', { account }),
        accountFormat: val => /^([a-z]|[1-5]|.){1,12}$/.test(val.toLowerCase()) || this.$t('forms.errors.accountFormat'),
        accountFormatBasic: val => /^([a-z]|[1-5]){12}$/.test(val.toLowerCase()) || this.$t('forms.errors.accountFormatBasic'),
        accountLength: val => val.length <= 12 || this.$t('forms.errors.accountLength'),
        dateFuture: date => val => new Date(val).getTime() >= new Date(date).getTime() || this.$t('forms.errors.dateFuture'),
        greaterOrEqualThan: value => val => val >= value || this.$t('forms.errors.greaterOrEqualThan', { value }),
        isAccountAvailable: async account => (await this.isAccountFree(account.toLowerCase())) || this.$t('forms.errors.accountNotAvailable', { account }),
        isInteger: val => Number.isInteger(parseInt(val)) || this.$t('forms.errors.integer'),
        isToken: val => (val.length >= 2 && val.length <= 6) || this.$t('forms.errors.token'),
        isTokenDecimals: val => (parseInt(val) >= 0 && parseInt(val) <= 9) || this.$t('forms.errors.tokenDecimals'),
        positiveInteger: val => parseInt(val) > 0 || this.$t('forms.errors.positiveInteger'),
        required: val => !!val || this.$t('forms.errors.required'),
        isEqual: value => val => val === value || this.$t('forms.errors.positiveInteger', { value }),
        isEmail: val => /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val.toLowerCase()) || this.$t('forms.errors.email'),
        isChecksum: val => /(^[a-f0-9A-F]{64}$)/.test(val.toLowerCase()) || this.$t('forms.errors.checksum'),
        isEosAccount: val => /(^[a-z1-5]{0,12}$)/.test(val) || this.$t('forms.errors.eosaccount'),
        isTimePoint: val => {
          let flagDate, flagTime
          let arr = val.split(' ')
          let timeArr = arr[1].split(':')
          let timestamp = Date.parse(arr[0])
          timestamp = timestamp > 0 ? timestamp : NaN
          flagDate = !isNaN(timestamp)
          flagTime = timeArr[0] < 24 && timeArr[1] < 60
          return flagTime && flagDate ? true : this.$t('forms.errors.invalidTimePoint')
        },
        isURL: val => /^https?:\/\/[a-z]*.*\/(graphql){1}$/.test(val) || this.$t('forms.errors.isURL')
      }
    }
  },
  methods: {
    ...mapActions('accounts', ['isAccountFree']),
    async validate (form) {
      if (!form) return true
      for await (const key of Object.keys(form)) {
        if (this.$refs[key]) {
          await this.$refs[key].validate()
        }
      }
      return Object.keys(form).reduce((valid, key) => valid && (!this.$refs[key] || !this.$refs[key].hasError), true)
    },
    resetValidation (form) {
      if (!form) return
      Object.keys(form).forEach((key) => this.$refs[key] && this.$refs[key].resetValidation())
    }
  }
}
