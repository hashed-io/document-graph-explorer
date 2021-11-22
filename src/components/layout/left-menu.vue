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
      @click="$router.push({name: 'daos'})"
      clickable
      v-ripple
    )
      q-item-section(avatar)
        q-icon(name="business")
      q-item-section {{ $t('menu.daos') }}
    q-item(
      @click="$router.push({name: 'all-daos'})"
      clickable
      v-ripple
    )
      q-item-section(avatar)
        q-icon(name="list")
      q-item-section {{ $t('menu.all_daos') }}
    q-item(
      @click="$router.push({name:'order-book'})"
      data-cy='menuOrderBook'
      clickable
      v-ripple
    )
      q-item-section(avatar)
        q-icon(name="info")
      q-item-section
        div Order Book
    q-item(
      @click="$router.push({name:'listDocs'})"
      data-cy='DGE'
      clickable
      v-ripple
    )
      q-item-section(avatar)
        q-icon(name="assignment")
      q-item-section
        div Document Graph Explorer
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
