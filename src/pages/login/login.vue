<script>
import { mapActions, mapGetters } from 'vuex'
import RequestAccount from './components/request-account'

export default {
  name: 'page-login',
  components: {
    RequestAccount
  },
  data () {
    return {
      idx: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters('accounts', ['loading'])
  },
  methods: {
    ...mapActions('accounts', ['login', 'autoLogin']),
    async onLogin (idx) {
      this.idx = idx
      await this.login({ idx: this.idx, returnUrl: '/' })
    },
    async onAccountEntered (account) {
      await this.login({ idx: this.idx, account, returnUrl: this.$route.query.returnUrl })
    },
    openUrl (url) {
      window.open(url)
    }
  },
  async mounted () {
    await this.autoLogin(this.$route.query.returnUrl)
  }
}
</script>

<template lang="pug">
div.q-mb-xl
  .flex.flex-center.q-mb-md
    img.logo(src="statics/icons/hashedLogin.png")
  q-card.cardSize
    q-card-section
      .flex.flex-center
        .subtitleLogin {{'Sign in to your account,'}}
      .flex.flex-center.subtitleLogin
        | {{'select your wallet.'}}
    q-card-section
      .row.justify-center
        q-list(style="width: 60%;")
          q-item(
            v-for="(wallet, idx) in $ual.authenticators"
            :key="wallet.getStyle().text"
            v-ripple
            class='btn-login-wallet'
            data-cy="loginButton"
            v-if="wallet.shouldRender()"
          )
            q-item-section.cursor-pointer(
              avatar
              @click="onLogin(idx)"
            )
              img(
                :src="wallet.getStyle().icon"
                width="30"
              )
            q-item-section.cursor-pointer(@click="onLogin(idx)") {{ wallet.getStyle().text }}
            q-item-section(avatar)
              .flex
                q-spinner(
                  v-if="loading === wallet.getStyle().text"
                  :color="wallet.getStyle().textColor"
                  size="2em"
                )
                q-icon(
                  justify
                  color='white'
                  size='sm'
                  @click="openUrl(wallet.getOnboardingLink())"
                )
                  svg(xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor")
                    path(fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd")
                  q-tooltip(
                    content-class='bg-black'
                    transition-show="fade"
                    transition-hide="fade"
                    anchor="center right"
                    self="center left"
                    content-style="font-size: 12px"
                  ) {{ $t('pages.login.getApp') }}
      .q-py-md
      q-separator
      .row.flex.flex-center.q-py-md
        q-btn(
          label='Create account'
          no-caps
          outline
          unelevated
          target='_blank'
          type="a"
          href='https://www.telos.net/signup'
        ).btnTailwind
      request-account(
        @accountEntered="onAccountEntered"
      )
</template>

<style lang="stylus" scoped>
.logo
  max-height: 100px
  max-width: 300px
.titleLogin
  font-size:30px !important
  font-weight: bolder
.subtitleLogin
  font-size:23px !important
  font-weight: bolder
.cardSize
  width: 35rem
.btnTailwind
  border-radius: 10px
  height: 38px
  font-size:16px
  color:black
  width: 15rem
  background: white
  color: black
</style>
