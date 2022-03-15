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
        q-img(
          data-cy='menu'
          :src="getSource()"
          :width="getSize()"
          @click="menu = !menu"
        )
          template(v-slot:loading)
            q-spinner-tail(
              class="text-white center"
              size="2.5rem"
            )
        .flex(v-if="!$q.screen.xs")
          .q-px-md.title Document Graph Explorer
          .q-pl-md.text-caption Current Graph: {{endpoint || 'Public'}}
      right-menu-authenticated(v-if="isAuthenticated")
      right-menu-guest(v-if="!isAuthenticated")
      q-btn(
        v-if="!$q.screen.xs"
        label="Documentation"
        class='docButton btnTailWindLogin'
        rounded
        @click="toDocumentation"
        no-caps
        v-bind:class="{'q-ml-sm': isAuthenticated}"
      )
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
.docButton
  font-color: black
  font-size: 14px !important
  width: 135px !important
.title
  font-size: 14px !important
  color: white
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
.btnTailwind
  width: 180px
  font-size: 14px !important
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import LeftMenu from '~/components/layout/left-menu'
import RightMenuAuthenticated from '~/components/layout/right-menu-authenticated'
import RightMenuGuest from '~/components/layout/right-menu-guest'
import { leftMenuTelosKitchen, leftMenuHashed } from '~/utils/leftMenu'
export default {
  name: 'layout-auth',
  components: {
    LeftMenu,
    RightMenuAuthenticated,
    RightMenuGuest
  },
  // watcher endpointApollo
  watch: {
    endpointApollo: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getCurrentEndpoint()
      }
    }
  },
  updated: function () {
    this.getCurrentEndpoint()
  },
  data () {
    return {
      menu: false,
      right: false,
      miniState: true,
      endpoint: undefined
    }
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated']),
    ...mapState('documentGraph', ['endpointApollo'])
  },
  methods: {
    ...mapActions('accounts', ['autoLogin']),
    ...mapMutations('documentGraph', ['setEndpoint']),
    ...mapMutations('documentGraph', ['clearStack']),
    ...mapActions('documentGraph', ['getLocalStorage']),
    async saveEndpoint (endpoint) {
      this.menu = false
      this.clearStack()
      this.setEndpoint(endpoint)
    },
    async getCurrentEndpoint () {
      let blockchains = await this.isHashedSystems(leftMenuHashed, leftMenuTelosKitchen)
      let endpoint = this.endpointApollo
      if (!endpoint) {
        endpoint = await this.getLocalStorage({ key: 'apollo-endpoint' })
      }
      let currentEndpoint = await blockchains.tlos.options.find(blockchain => blockchain.value === endpoint)
      this.endpoint = currentEndpoint.label
    },
    getSource () {
      return this.isHashedSystems('statics/icons/hashed.png', 'statics/icons/TelosKitchen.png')
    },
    getSize () {
      return this.isHashedSystems('80px', '60px')
    },
    toDocumentation () {
      window.open('https://hashed-io.github.io/document-graph-book/background/introduction.html', '_blank')
    }
  }
}
</script>
