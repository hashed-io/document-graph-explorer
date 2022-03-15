<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Tinput from '../input/t-input.vue'
import { leftMenuTelosKitchen, leftMenuHashed } from '~/utils/leftMenu'
import { validation } from '~/mixins/validation'
export default {
  name: 'left-menu-authenticated',
  mixins: [validation],
  data () {
    return {
      validCustom: undefined,
      blockchains: undefined,
      custom: {
        selected: undefined,
        logo: undefined,
        name: 'custom',
        endpoint: undefined,
        options: undefined
      }
    }
  },
  mounted () {
    this.blockchains = this.isHashedSystems(leftMenuHashed, leftMenuTelosKitchen)
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated']),
    ...mapState('documentGraph', ['loadingFromEndpoint'])
  },
  methods: {
    ...mapMutations('documentGraph', ['clearStack', 'setLoadingFromEndpoint']),
    async catchEndpoint () {
      await this.showMenu(undefined)
      this.validCustom = await this.$refs.customEndpointForm.validate()
    },
    clearStoreAndGo () {
      this.clearStack()
      this.$router.push({ name: 'listDocs' })
    },
    async isSelected () {
      for (const blockchain in this.blockchains) {
        if (this.blockchains[blockchain].endpoint !== undefined) {
          return true
        }
      }
      if (this.custom.endpoint) {
        return true
      } else {
        return false
      }
    },
    toDocumentation () {
      window.open('https://hashed-io.github.io/document-graph-book/background/introduction.html', '_blank')
    },
    showMenu (name) {
      if (name !== undefined && this.custom.endpoint) {
        this.custom.selected = false
        this.custom.endpoint = undefined
      }
      for (const blockchain in this.blockchains) {
        this.blockchains[blockchain].selected = (name === this.blockchains[blockchain].name)
        if (name !== this.blockchains[blockchain].name) {
          this.blockchains[blockchain].endpoint = undefined
        }
      }
    },
    async sendSelected () {
      var selected
      for (const key in this.blockchains) {
        if (this.blockchains[key].endpoint !== undefined) {
          selected = this.blockchains[key].endpoint
        }
      }
      if (!selected && this.custom.endpoint) {
        selected = this.custom.endpoint
      }
      /**
       * This send the endpoint selected to parent component [main.vue]
       */
      if (!this.loadingFromEndpoint) {
        this.setLoadingFromEndpoint(true)
        this.$emit('switch', selected)
      } else {
        this.showErrorMsg('Please wait until the current process is finished')
      }
    }
  },
  components: { Tinput }
}
</script><template lang="pug">
div(class="q-pa-md" style="max-width: 350px")
  q-list()
    .row.justify-end.q-gutter-md.q-pt-xs
      q-btn(
        data-cy='closeButton'
        icon='close'
        round
        color="red"
        outline
        size='xs'
        @click="$emit('close')"
      )
    q-expansion-item(
      v-if="$q.screen.xs"
      v-mode=""
      class='q-pt-md'
      @click="toDocumentation"
      dense-toggle
    )
      template(v-slot:header)
        q-item-section(avatar)
          q-icon(
            class="q-ml-xs"
            style='width: 24px; height: 24px;'
          )
            svg(xmlns='http://www.w3.org/2000/svg' fill='none' viewbox='0 0 24 24' stroke='currentColor' stroke-width='2')
              path(stroke-linecap='round' stroke-linejoin='round' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253')
        q-item-section
          div.header Documentation
    template(v-for="(blockchain) in blockchains")
      q-expansion-item(
        data-cy='listBlockchains'
        v-model='blockchain.selected'
        class="q-pt-sm"
        expand-icon-toggle
        dense-toggle
        @show="showMenu(blockchain.name)"
      )
        template(v-slot:header)
            q-item-section(avatar)
              q-avatar(size='md')
                q-img(:src="'statics/blockchains/'+blockchain.logo")
            q-item-section
              div.header {{blockchain.name}}
        div.alignPadding
          q-card(flat class="box" :style="{ borderColor: blockchain.color +'!important'}")
            q-card-section
              .row.justify-start
                q-option-group(
                  keep-color
                  class="radioButton"
                  data-cy='endpointOptions'
                  :options="blockchain.options"
                  type='radio'
                  v-model='blockchain.endpoint'
                  @input="sendSelected()"
                )
    q-expansion-item(
      data-cy='customEndpoint'
      class="q-pt-sm"
      v-model="custom.selected"
      dense-toggle
      @show="showMenu('custom')"
    )
      template(v-slot:header)
        q-item-section(avatar)
          q-avatar(size='md')
            q-img(:src="'statics/blockchains/gear.png'")
        q-item-section
          div.header Development
      q-card
        q-card-section
          q-form(ref="customEndpointForm")
            Tinput(
              data-cy='customEndpointField'
              v-model='custom.endpoint'
              :rules="[rules.isURL]"
              label='Custom Endpoint'
              @update="catchEndpoint"
              dense
            )
            template(v-if="isSelected() && validCustom ")
              div(@click="sendSelected()" data-cy="switchButton" class="flex flex-center")
                q-icon(
                  style="width:12px; height:24px;"
                  class="cursor-pointer q-px-sm"
                )
                  svg(width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg")
                    path(d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" fill="black")
                div(class="cursor-pointer q-pr-sm") switch
</template>

<style lang="stylus" scoped>
.docButton
  font-color: black
  font-size: 14px !important
  width: 135px !important
.radioButton
  color: $table-content-font-odd
  font-size: 16px !important
.alignPadding
  padding-left: 30px
.q-radio__innner
  color: rgba(0,0,0,0) !important
.cardTailwind
  border-radius: 10px !important
.box
  border-left: 0.25rem solid transparent
  border-radius: 0
  border-color:#571BFE !important
.header
  font-size: 16px !important
  font-weight: 600
  padding-top: 5px

</style>
