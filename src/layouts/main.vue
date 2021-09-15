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
    .row
      .col-1
      .col-10
        q-page-container.q-mt-xl
          router-view
      .col-1
</template>

<style lang="sass" scoped>
.logo
  max-height: 42px
  max-width: 100px
.badge-left
  left: -5px
  right: auto
.contentContainer
  padding: 6rem;
</style>
