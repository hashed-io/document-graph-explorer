<script>
import { mapActions } from 'vuex'

export default {
  name: 'right-menu-guest',
  data () {
    return {
      sizeResponsive: true,
      idx: undefined
    }
  },
  methods: {
    ...mapActions('accounts', ['login']),
    async onLogin (idx) {
      this.idx = 0
      await this.login({ idx: this.idx, returnUrl: this.$router.currentRoute.fullPath })
    }
  }
}
</script>

<template lang="pug">
div
  q-btn(
    @click="onLogin(idx)"
    class="q-mr-sm btnTailWindLogin"
    data-cy='loginButton'
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.login')"
    text-color="black"
    rounded
    no-caps
  )
  //- q-btn(
  //-   to="/accounts/add"
  //-   :size="$q.platform.is.mobile ? 'sm' : 'md' "
  //-   :label="$t('pages.index.buttons.createAccount')"
  //-   style="background: #E0E7FF; color:#4254E0"
  //- ).btnTailwind
</template>

<style lang="stylus" scoped>

</style>
