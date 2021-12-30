<script>
import { mapGetters, mapMutations } from 'vuex'
import Tinput from '../input/t-input.vue'

export default {
  name: 'left-menu-authenticated',
  data () {
    return {
      blockchains: {
        tlos: {
          selected: undefined,
          logo: 'telos.png',
          name: 'Telos',
          color: '#571BFE',
          endpoint: undefined,
          options: [
            {
              label: 'Hypha',
              value: 'https://alpha-st.tekit.io/graphql',
              color: 'black'
            },
            {
              label: 'Social',
              value: 'https://hashed.systems/alpha-dge-test/graphql',
              color: 'black'
            },
            {
              label: 'Cannabis',
              value: 'https://hashed.systems/alpha-trace-test/graphql',
              color: 'black'
            }
          ]
        },
        // ksm: {
        //   selected: undefined,
        //   logo: 'kusama.png',
        //   name: 'Kusama',
        //   color: '#101921',
        //   endpoint: undefined,
        //   options: [
        //     {
        //       label: 'ksm 1',
        //       value: 'https://alpha-st.tekit.io/graphql',
        //       color: 'black'
        //     },
        //     {
        //       label: 'ksm 2',
        //       value: 'https://hashed.systems/alpha-dge-test/graphql',
        //       color: 'black'
        //     },
        //     {
        //       label: 'ksm 3',
        //       value: 'https://hashed.systems/alpha-trace-test/graphql',
        //       color: 'black'
        //     }
        //   ]
        // },
        atom: {
          selected: undefined,
          logo: 'cosmo.png',
          name: 'Cosmos',
          color: '#101921',
          endpoint: undefined,
          options: [
            {
              label: 'Cosmos 1',
              value: 'https://alpha-st.tekit.io/graphql',
              color: 'black'
            },
            {
              label: 'Cosmos 2',
              value: 'https://hashed.systems/alpha-dge-test/graphql',
              color: 'black'
            },
            {
              label: 'Cosmos 3',
              value: 'https://hashed.systems/alpha-trace-test/graphql',
              color: 'black'
            }
          ]
        },
        dot: {
          selected: undefined,
          logo: 'polkadot.png',
          name: 'Polkadot',
          color: '#E6007A',
          endpoint: undefined,
          options: [
            {
              label: 'dot 1',
              value: 'https://alpha-st.tekit.io/graphql',
              color: 'black'
            },
            {
              label: 'dot 2',
              value: 'https://hashed.systems/alpha-dge-test/graphql',
              color: 'black'
            },
            {
              label: 'dot 3',
              value: 'https://hashed.systems/alpha-trace-test/graphql',
              color: 'black'
            }
          ]
        },
        sol: {
          selected: undefined,
          logo: 'solana.png',
          name: 'Solana',
          color: '#DC1FFF',
          endpoint: undefined,
          options: [
            {
              label: 'sol 1',
              value: 'https://alpha-st.tekit.io/graphql',
              color: 'black'
            },
            {
              label: 'sol 2',
              value: 'https://hashed.systems/alpha-dge-test/graphql',
              color: 'black'
            },
            {
              label: 'sol 3',
              value: 'https://hashed.systems/alpha-trace-test/graphql',
              color: 'black'
            }
          ]
        }
      },
      custom: {
        selected: undefined,
        logo: undefined,
        name: 'custom',
        endpoint: undefined,
        options: undefined
      }
    }
  },
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  },
  methods: {
    ...mapMutations('documentGraph', ['clearStack']),
    clearStoreAndGo () {
      this.clearStack()
      this.$router.push({ name: 'listDocs' })
    },
    showMenu (name) {
      for (const blockchain in this.blockchains) {
        this.blockchains[blockchain].selected = (name === this.blockchains[blockchain].name)
        if (name !== this.blockchains[blockchain].name) {
          this.blockchains[blockchain].endpoint = undefined
        }
      }
    },
    isSelected () {
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
    sendSelected () {
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
      this.$emit('switch', selected)
    }
  },
  components: { Tinput }
}
</script>

<template lang="pug">
div(class="q-pa-md" style="max-width: 350px")
  q-list(class="rounded-borders")
    .row.justify-end.q-gutter-md
      template(v-if="isSelected()")
        .row(@click="sendSelected()")
          q-icon(
            color="white",
            style="width:16px; height:24px;"
            class="cursor-pointer q-mr-sm"
          )
            svg(width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg")
              path(d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" fill="black")
          div(class="cursor-pointer") switch
      q-btn(
        icon='close'
        round
        color="red"
        outline
        size='xs'
        @click="$emit('close')"
      )
    template(v-for="(blockchain) in blockchains")
      q-expansion-item(
        v-model='blockchain.selected'
        class="q-pt-sm"
        dense-toggle
        switch-toggle-side
        @show="showMenu(blockchain.name)"
      )
        template(v-slot:header)
          div.header {{blockchain.name}}
        q-card(class="cardTailwind box" :style="{ borderColor: blockchain.color +'!important'}")
          q-item-section
            q-item-label(class="q-px-lg q-pt-md")
              .row.q-gutter-md
                q-avatar
                  img(:src="'statics/blockchains/'+blockchain.logo")
                .text-h6 {{blockchain.name}}
          q-card-section
            .row.justify-start
              q-option-group(
                keep-color
                :options="blockchain.options"
                type='radio'
                :style="{ color: blockchain.color +'!important'}"
                v-model='blockchain.endpoint'
              )
    q-expansion-item(
      class="q-pt-sm"
      v-model="custom.selected"
      dense-toggle
      switch-toggle-side
      expand-separator
      @show="showMenu('custom')"
    )
      template(v-slot:header)
        div.header Development
      q-card
        q-card-section
          Tinput(
            v-model='custom.endpoint'
            label='Custom Endpoint'
            dense
          )
</template>

<style lang="stylus" scoped>
.q-radio__innner
  color: rgba(0,0,0,0) !important
.cardTailwind
  border-radius: 10px !important
.box
  border-left: 0.25rem solid transparent
  border-radius: 0.25rem
  border-color:#571BFE !important
.header
  font-size: 16px !important
  font-weight: 600
  padding-top: 5px
</style>
