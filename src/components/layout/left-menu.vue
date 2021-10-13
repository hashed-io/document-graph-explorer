<script>
import { mapGetters } from 'vuex'

export default {
  name: 'left-menu-authenticated',
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  }
}
</script>

<template lang="pug">
  q-scroll-area.fit
    q-list
      q-item(
        v-if="isAuthenticated"
        to="/home"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="business")
        q-item-section {{ $t('menu.daos') }}
      q-item(
        v-if="isAuthenticated"
        to="/daos"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="list")
        q-item-section {{ $t('menu.all_daos') }}
      q-item(
        to="/order-book"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="info")
        q-item-section
          div Order Book
</template>

<style lang="stylus">

</style>
