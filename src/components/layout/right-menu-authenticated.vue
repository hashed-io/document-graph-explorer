<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'right-menu-authenticated',
  computed: {
    ...mapGetters('accounts', ['account'])
  },
  methods: {
    ...mapActions('accounts', ['logout'])
  }
}
</script>

<template lang="pug">
.row.q-gutter-md
  span.q-pt-sm.text-white {{account}}
  q-btn(
    :label="$t('common.buttons.logout')"
    @click="logout"
    unelevated
    flat
    class="btnTailWindLogout"
    no-caps
  )
</template>
