<template lang="pug">
q-layout(view="hHh Lpr lFf").bg-layout
  q-header
    q-toolbar(class='bg-brand-primary')
      q-icon(
        data-cy='menuButton'
        @click="menu = !menu"
        class="sizeIcon animated-icon"
      )
        svg.h-5.w-5(xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor")
          path(fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd")
      q-toolbar-title.flex.items-center
        img.logo(
          data-cy='menu'
          src="statics/icons/hashed.png"
          @click="menu = !menu"
        )
      right-menu-authenticated(v-if="isAuthenticated")
      right-menu-guest(v-if="!isAuthenticated")
  q-drawer(
    v-model="menu"
    side="left"
    :breakpoint="768"
    :width="300"
    overlay
    bordered
    :content-style="{ backgroundColor: '#FFFFFF' }"
  )
    left-menu(@close="menu = false" @switch="saveEndpoint")
  q-page-container.q-mt-xl.contentContainer
    router-view
</template>

<style lang="stylus" scoped>
.sizeIcon
  width: 20px
  height: 20px
.contentDrawer
  background-color: red
.logo
  margin-left: 0.5vw
  max-height: 40px
  max-width: 100px
  cursor:pointer
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
    ...mapActions('accounts', ['autoLogin']),
    ...mapMutations('documentGraph', ['setEndpoint']),
    ...mapMutations('documentGraph', ['clearStack']),
    async saveEndpoint (endpoint) {
      this.menu = false
      this.clearStack()
      this.setEndpoint(endpoint)
    }
  }
}
</script>
