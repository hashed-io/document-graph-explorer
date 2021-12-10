<template lang="pug">
#NewEdgeDialog
  q-card.cardTailWind
    q-toolbar
      q-toolbar-title New Edge Form
      q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
    q-card-section
      .q-px-md
        Tinput(
          class="q-pt-md"
          v-model="form.direction"
          label='Edge direction'
          dense
        )
        Tinput(
          class="q-pt-md"
          v-model="form.edgeName"
          label='Edge Name'
          dense
        )
        Tinput(
          class="q-pt-md"
          v-model="form.system_nodeLabel_s"
          label='System Node Label'
          dense
        )
        Tinput(
          class="q-pt-md"
          v-model="form.type"
          label='Document Type'
          dense
        )
        q-btn(
          unelevated
          class="btnTailwind q-mt-md"
          label='Add edge'
          @click ="addEdge"
        )
</template>

<script>
import Tinput from '~/components/input/t-input'
export default {
  name: 'EdgeDialog',
  components: {
    Tinput
  },
  data () {
    return {
      form: {
        createdDate: '2021-12-10T19:06:11.5Z',
        creator: undefined,
        direction: undefined,
        docId: undefined,
        docId_i: undefined,
        edgeName: undefined,
        hash: undefined,
        system_nodeLabel_s: undefined,
        type: undefined,
        edge: undefined
      }
    }
  },
  methods: {
    addEdge () {
      this.$emit('EdgeData', this.form)
    }
  }
}
</script>

<style lang="stylus" scoped>
.cardTailWind
  border-radius: 10px !important
  width: 500px !important
</style>
