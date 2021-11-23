<template lang='pug'>
.bg-white(:style="$q.platform.is.mobile ? 'width:80vw' : 'width:30vw'")
  .row
    .col-2
      q-icon.floatingArrow.animated-icon(
      data-cy='accountInfo'
      ref='accountInfo'
      style="font-size: 3em;"
      :name="showAccountInfo ? 'keyboard_arrow_right' : 'keyboard_arrow_left'",
      @click="toggleMenu()"
      )
        q-tooltip {{$t('pages.orderBook.accountInfoTip')}}
    .col-11.q-pr-sm
      div(v-if='showAccountInfo')
        q-list(v-show='showAccountInfo' bordered data-cy='accountInfoCard')
          q-expansion-item(
            data-cy='selectorAccount'
            group="accountGroup",
            icon="perm_identity",
            label="Account",
            header-class="text-primary"
          )
            q-card
              q-card-section
                .row
                  .col-6.center.text-subtitle1
                    | {{ account }}
                  .col-6.center.text-subtitle1(data-cy='balanceText')
                    | {{ balance + ' '+currentCurrency}}
            q-separator
          q-expansion-item(
            data-cy='selectorTransfer'
            group="accountGroup",
            icon="attach_money",
            label="Transfer",
            header-class="text-primary"
          )
            q-card
              q-card-section
                .row
                  .col-sm-8.col-xs-12
                    q-input.no-right-borders(
                      data-cy="assetInput"
                      type="number",
                      v-model="asset",
                      label="Asset",
                      :rules="[rules.required, rules.positiveInteger]",
                      no-error-icon,
                      filled,
                      square
                    )
                  .col-sm-4.col-xs-12
                    q-select.no-left-borders(
                      data-cy="tokenInput"
                      :options="tokenOptions",
                      v-model="selectedToken",
                      :rules="[rules.required]",
                      filled,
                      square
                    )
                .row.q-pt-xl.q-col-gutter-md
                  .col-sm-6.col-xs-12.center
                    q-btn(data-cy='depositButton' label="Deposit", color="primary", @click="deposit")
                  .col-sm-6.col-xs-12.center
                    q-btn(data-cy='withdrawalButton' label="Withdrawals", color="primary", @click="withdrawal")
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
      showAccountInfo: false,
      balance: 127,
      currentCurrency: 'TLOS',
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
    toggleMenu () {
      this.showAccountInfo = !this.showAccountInfo
      if (!this.showAccountInfo) {
        this.asset = undefined
        this.selectedToken = undefined
      }
    },
    async deposit () {
      try {
        this.$q.loading.show({
          message:
            'Depositing to your account ' +
            this.asset +
            ' ' +
            this.selectedToken.value,
          spinner: QSpinnerGrid,
          color: 'primary'
        })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.$q.loading.hide()
        this.balance = parseInt(this.balance) + parseInt(this.asset)
      } catch (e) {
        this.showErrorMsg('Error in deposit')
      }
      this.toggleMenu()
    },
    async withdrawal () {
      try {
        this.$q.loading.show({
          message:
            'Making the withdrawal. ' +
            this.asset +
            ' ' +
            this.selectedToken.value,
          spinner: QSpinnerGrid
        })
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.$q.loading.hide()
      } catch (e) {
        this.showErrorMsg('Error in withdrawal')
      }
      this.toggleMenu()
    }
  }
}
</script>

<style lang='sass'>
.center
  display: flex
  align-items: center
  justify-content: center
.floatingArrow
  position: absolute
  top: 0vh
  right: 0vw
  z-index: 1
.floating
  position: absolute
  top: 0vh
  right: 0vw
  z-index: 1
@media screen and (max-width: 319px) and (min-width: 30px)
  .floating
    position: absolute
    top: 0vh
    right: 12vw
    z-index: 1
@media screen and (max-width: 480px) and (min-width: 320px)
  .floating
    position: absolute
    top: 0vh
    right: 10vw
    z-index: 1
@media screen and (max-width: 768px) and (min-width: 481px)
  .floating
    position: absolute
    top: 0vh
    right: 8vw
    z-index: 1
</style>
