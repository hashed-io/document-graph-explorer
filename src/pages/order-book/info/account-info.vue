<template lang='pug'>

div( :style="$q.platform.is.mobile ? 'width:80vw' : 'width:30vw' " class='bg-white')
  q-list(bordered)
    q-expansion-item( group='somegroup' icon='perm_identity' label='Account' default-opened header-class='text-primary')
      q-card
        q-card-section
          .row
            .col-6.center.text-subtitle1
              | {{account}}
            .col-6.center.text-subtitle1
              | {{balance}}
      q-separator
    q-expansion-item(group='somegroup' icon='attach_money' label='Transfer' header-class='text-primary')
      q-card
        q-card-section
          .row.center
            .col-sm-4.col-xs-12
              q-input.no-right-borders(
                type="number"
                v-model="asset"
                label="Asset"
                :rules="[rules.required, rules.positiveInteger]"
                no-error-icon
                filled
                square
              )
            .col-sm-2.col-xs-12
              q-select.no-left-borders(
                :options="tokenOptions"
                v-model="selectedToken"
                :rules="[rules.required]"
                filled
                square
              )
          .row.q-pt-md.q-col-gutter-md
            .col-sm-6.col-xs-12.center
              q-btn(label='Deposit' color='primary' @click='deposit')
            .col-sm-6.col-xs-12.center
              q-btn(label='Withdrawals' color='primary' @click='withdrawal')
</template>

<script>
import { QSpinnerGrid } from 'quasar'
import { mapState } from 'vuex'
import { validation } from '~/mixins/validation'

export default {
  name: 'accountInfo',
  mixins: [validation],
  computed: {
    ...mapState('accounts', ['account'])
  },
  data () {
    return {
      balance: '127 TLOS',
      tokenOptions: [
        {
          label: 'USD',
          value: 'usd'
        },
        {
          label: 'TLOS',
          value: 'tlos'
        }
      ],
      selectedToken: undefined,
      asset: undefined
    }
  },
  methods: {
    async deposit () {
      try {
        this.$q.loading.show({
          message: 'Depositing to your account ' + this.asset + ' ' + this.selectedToken.value,
          spinner: QSpinnerGrid,
          color: 'primary'
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.$q.loading.hide()
      } catch (e) {
        this.showErrorMsg('Error in deposit')
      }
    },
    async withdrawal () {
      try {
        this.$q.loading.show({
          message: 'Making the withdrawal. ' + this.asset + ' ' + this.selectedToken.value,
          spinner: QSpinnerGrid
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.$q.loading.hide()
      } catch (e) {
        this.showErrorMsg('Error in deposit')
      }
    }
  }
}
</script>

<style lang='sass'>
.center
  display: flex;
  align-items: center;
  justify-content: center;
</style>
