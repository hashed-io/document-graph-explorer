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
  q-btn.q-mr-sm(
    @click="$router.push({name: 'login'})"
    data-cy='loginButton'
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.login')"
    text-color="black"
    rounded
    style="background: white; color: #4338CA"
  )
  q-btn(
    to="/accounts/add"
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.createAccount')"
    style="background: #E0E7FF; color:#4254E0"
  ).btnTailwind
</template>

<style lang="stylus" scoped>
.btnTailwind
  border-radius: 10px
</style>
