<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'left-menu-authenticated',
  computed: {
    ...mapGetters('accounts', ['isAuthenticated'])
  },
  methods: {
    ...mapMutations('documentGraph', ['clearStack']),
    clearStoreAndGo () {
      this.clearStack()
      this.$router.push({ name: 'listDocs' })
    }
  }
}
</script>

<template lang="pug">
q-scroll-area.fit
  q-list
    q-item(
      @click="clearStoreAndGo()"
      data-cy='DGE'
      clickable
      v-ripple
    )
      q-item-section(avatar)
        q-icon(name="book")
      q-item-section
        div DGE

    q-item(
      @click="$router.push({name:'timeline-page'})"
      data-cy='timeLine'
      clickable
      v-ripple
    )
      q-item-section(avatar)
        q-icon(name="timeline")
      q-item-section
        div Time Line
</template>

<style lang="stylus">

</style>
