<script>
import { mapMutations } from 'vuex'
export default {
  name: 'businessname',
  data () {
    return {
      localName: null
    }
  },
  methods: {
    ...mapMutations('DAO', ['setBusinessName']),
    changeBusinessName () {
      console.log(this.localName)
      this.setBusinessName(this.localName)
      // this.$store.commit('DAO/setBusinessName', this.localName)
    }
  },
  computed: {
    // ...mapState('DAO', ['businessEntityName'])
  }
}
</script>
<template lang="pug">
div.container
  p.
    Hello From Business
  q-input(
      v-model="localName"
      label="Business Name"
      @input="changeBusinessName"
    )
</template>
