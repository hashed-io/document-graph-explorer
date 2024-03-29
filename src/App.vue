<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import appIcons from '~/utils/app-icons'

export default {
  name: 'App',
  computed: {
    ...mapGetters('accounts', ['isAutoLoading']),
    ...mapGetters('general', ['isLoading', 'errorMsg', 'successMsg']),
    layout () {
      return `layout-${this.$route.meta.layout || 'main'}`
    }
  },
  watch: {
    errorMsg (msg) {
      console.log('error', msg)
      if (msg) {
        this.showNotification(msg, 'error')
        this.showErrorMsg(null)
      }
    },
    successMsg (msg) {
      if (msg) {
        this.showNotification(msg, 'success')
        this.showSuccessMsg(null)
      }
    },
    isLoading (value) {
      if (value) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  },
  async mounted () {
    await this.loadCatalog()
  },
  created () {
    this.$q.iconMapFn = (iconName) => {
      const icon = appIcons[iconName]
      if (icon !== void 0) {
        return { icon }
      }
    }
  },
  methods: {
    ...mapActions('documentGraph', ['getSchema', 'changeEndpoint', 'setLocalStorage']),
    ...mapMutations('documentGraph', ['setCatalog', 'setTypesWithSystemNode']),
    async loadCatalog () {
      this.setLocalStorage({
        key: 'apollo-endpoint',
        value: process.env.APOLLO_URL
      })
    }
  }
}
</script>

<template lang="pug">
.q-app
  component(:is="layout")
    router-view
  q-inner-loading(:showing="isAutoLoading")
    q-spinner(size="3em")
</template>
