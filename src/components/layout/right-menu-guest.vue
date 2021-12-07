<script>
export default {
  name: 'right-menu-guest',
  data () {
    return {
      sizeResponsive: true
    }
  }
}
</script>

<template lang="pug">
div
  q-btn(
    @click="$router.push({name: 'login'})"
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
