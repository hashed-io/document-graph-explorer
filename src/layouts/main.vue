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

<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header
      q-toolbar
        //- q-btn(
        //-   flat
        //-   show-if-above
        //-   dense
        //-   round
        //-   @click="menu = !menu"
        //-   icon="fas fa-bars"
        //-   aria-label="Menu"
        //- )
        q-toolbar-title.flex.items-center
          img.logo(src="statics/icons/TK_256.png")
        right-menu-authenticated(v-if="isAuthenticated")
        right-menu-guest(v-if="!isAuthenticated")
    //- q-drawer(
    //-   v-model="menu"
    //-   side="left"
    //-   :mini='false'
    //- )
    //-   left-menu
    template(v-if="!$router.history.current.path.includes('/home')")
      q-btn.back( icon='fas fa-arrow-left' color="primary" flat dense size="14px" @click="$router.push({name: 'daos'})")
        q-tooltip {{$t('pages.general.back')}}
    q-page-container.q-mt-xl.contentContainer
      router-view
</template>

<style lang="sass" scoped>
.back
  position: absolute
  top: 15px
  left: 10px
.logo
  padding-left: 0.1vw
  max-height: 40px
  max-width: 100px
.badge-left
  left: -5px
  right: auto
.contentContainer
  padding: 6rem;
</style>
