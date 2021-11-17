<template lang="pug">
q-layout(view="hHh Lpr lFf")
  q-header
    q-toolbar(class='bg-brand-primary')
      q-btn(
        flat
        show-if-above
        round
        data-cy='menuButton'
        @click="menu = !menu"
        icon="fas fa-bars"
        aria-label="Menu"
      )
      q-toolbar-title.flex.items-center
        img.logo(src="statics/icons/hashed.png")
      right-menu-authenticated(v-if="isAuthenticated")
      right-menu-guest(v-if="!isAuthenticated")
  q-drawer(
    v-model="menu"
    side="left"
    :breakpoint="768"
    :width="250"
    bordered
    :mini='miniState'
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    overlay
  )
    left-menu
  q-page-container.q-mt-xl.contentContainer
    router-view
</template>

<style lang="stylus" scoped>
.logo
  padding-left: 0.1vw
  max-height: 40px
  max-width: 100px
.badge-left
  left: -5px
  right: auto
@media screen and (max-width: 319px) and (min-width: 30px)
  .contentContainer
    padding: 0rem
@media screen and (max-width: 480px) and (min-width: 320px)
  .contentContainer
    padding: 0rem
@media screen and (max-width: 768px) and (min-width: 481px)
  .contentContainer
    padding: 2rem
@media screen and (max-width: 1024px) and (min-width: 769px)
  .contentContainer
    padding: 4rem
@media screen and (max-width: 1400px) and (min-width: 1025px)
  .contentContainer
    padding: 6rem
@media screen and (min-width: 1401px)
  .contentContainer
    padding: 10rem

</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import LeftMenu from '~/components/layout/left-menu'
import RightMenuAuthenticated from '~/components/layout/right-menu-authenticated'
import RightMenuGuest from '~/components/layout/right-menu-guest'
export default {
  name: 'layout-auth',
  components: {
    LeftMenu,
    RightMenuAuthenticated,
    RightMenuGuest
  },
  data () {
    return {
      menu: false,
      right: false,
      miniState: true
    }
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('accounts', ['autoLogin'])
  }
}
</script>
