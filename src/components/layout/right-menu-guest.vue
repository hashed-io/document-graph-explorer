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
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.login')"
    color="accent"
    text-color="black"
    rounded
  )
  q-btn(
    to="/accounts/add"
    :size="$q.platform.is.mobile ? 'sm' : 'md' "
    :label="$t('pages.index.buttons.createAccount')"
    color="secondary"
  )
</template>

<style lang="sass" scoped>

</style>
