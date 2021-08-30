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
          q-icon(name="app:my-profile")
        q-item-section {{ $t('menu.transfer') }}
      q-item(
        v-if="isAuthenticated"
        to="/dashboard"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="app:chats")
        q-item-section {{ $t('menu.example') }}
      q-item(
        v-if="isAuthenticated"
        to="/registerDao"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="app:chats")
        q-item-section {{ $t('menu.registerDao') }}
      q-item(
        v-if="isAuthenticated"
        to="/ipfs"
        clickable
        v-ripple
      )
        q-item-section(avatar)
          q-icon(name="app:chats")
        q-item-section IPFS
</template>

<style lang="stylus">

</style>
