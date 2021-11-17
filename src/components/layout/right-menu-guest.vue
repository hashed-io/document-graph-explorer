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
    to="/login"
    data-cy='loginButton'
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.login')"
    text-color="black"
    rounded
    style="background: #32E4B6"
  )
  q-btn(
    to="/accounts/add"
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.createAccount')"
    style="background: #B1B1B1; color:black"
  )
</template>

<style lang="stylus" scoped>

</style>
