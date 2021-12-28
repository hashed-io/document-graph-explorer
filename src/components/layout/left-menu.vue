<script>
import { mapGetters, mapMutations } from 'vuex'
import Tinput from '../input/t-input.vue'

export default {
  name: 'left-menu-authenticated',
  data () {
    return {
      telosEndpoint: undefined,
      kusamaEndpoint: undefined,
      developmentEndpoint: undefined,
      telosOptions: [
        {
          label: 'Hypha',
          value: 'https://alpha-st.tekit.io/graphql'
        },
        {
          label: 'Social',
          value: 'https://hashed.systems/alpha-dge-test/graphql'
        },
        {
          label: 'Cannabis',
          value: 'https://hashed.systems/alpha-trace-test/graphql'
        }
      ]
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
    }
  },
  components: { Tinput }
}
</script>

<template lang="pug">
div(class="q-pa-md" style="max-width: 350px")
  q-list(class="rounded-borders")
    .row.justify-end.q-gutter-md
      q-icon(
        @click="$emit('switch')"
        color="white",
        style="width:16px; height:24px;"
      )
        svg(width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" fill="black")
      div switch
      q-btn(
        icon='close'
        round
        color="red"
        outline
        size='xs'
        @click="$emit('close')"
      )
    q-expansion-item(
      class="q-pt-sm"
      dense-toggle
      switch-toggle-side
    )
      template(v-slot:header)
        div.header Telos
      q-card
        q-card-section(class="boxTelos")
          .row.justify-start
            q-option-group(
              :options="telosOptions"
              type='radio'
              v-model='telosEndpoint'
            )
    q-expansion-item(
      dense-toggle
      switch-toggle-side
      expand-separator
    )
      template(v-slot:header)
        div.header Kusama
      q-card
        q-card-section(class="boxKusama")
          .row.justify-start
            q-option-group(
              :options="telosOptions"
              type='radio'
              v-model='telosEndpoint'
            )
    q-expansion-item(
      dense-toggle
      switch-toggle-side
      expand-separator
    )
      template(v-slot:header)
        div.header Development
      q-card
        q-card-section
          Tinput(
            v-model='developmentEndpoint'
            label='Custom Endpoint'
            dense
          )
</template>

<style lang="stylus" scoped>
.boxTelos
  border-left: 0.25rem solid transparent
  border-radius: 0.25rem
  border-color:#571BFE !important
.boxKusama
  border-left: 0.25rem solid transparent
  border-radius: 0.25rem
  border-color: black !important
.header
  font-size: 16px !important
  font-weight: 600
  padding-top: 5px
</style>
