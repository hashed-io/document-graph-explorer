<template lang="pug">
#NewEdgeDialog
  q-card.cardTailWind
    q-toolbar
      q-toolbar-title New Edge Form
      q-btn(flat, round, dense, icon="close", unelevated v-close-popup)
    q-card-section
      q-form(ref='edgeForm' @submit="addEdge").q-px-md
        TSelectEdge(
          class="q-pt-md"
          v-model="form.direction"
          :options="options"
          dense
          message='Choose direction'
        )
        Tinput(
          class="q-pt-md"
          v-model="form.edgeName"
          placeholder='Edge Name'
          dense
          :rules="[rules.required]"
        )
        //- Tinput(
        //-   class="q-pt-md"
        //-   v-model="form.system_nodeLabel_s"
        //-   placeholder='System Node Label'
        //-   dense
        //-   :rules="[rules.required]"
        //- )
        //- Tinput(
        //-   class="q-pt-md"
        //-   v-model="form.type"
        //-   placeholder='Document Type'
        //-   dense
        //-   :rules="[rules.required]"
        //- )
        q-btn(
          unelevated
          no-caps
          class="btnTailwind q-mt-md"
          label='Add edge'
          type='submit'
        )
</template>

<script>
import Tinput from '~/components/input/t-input'
import TSelectEdge from '~/components/select/TSelectEdge.vue'
import { validation } from '~/mixins/validation'
export default {
  name: 'EdgeDialog',
  mixins: [validation],
  components: {
    Tinput,
    TSelectEdge
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
      },
      options: [
        {
          label: '10',
          value: '10'
        },
        {
          label: '9',
          value: '9'
        },
        {
          label: '8',
          value: '8'
        },
        {
          label: '7',
          value: '7'
        }
      ]
    }
  },
  methods: {
    addEdge () {
      this.$refs.edgeForm.validate().then(success => {
        if (success) {
          this.$emit('EdgeData', this.form)
        } else {
          this.showErrorMsg('Form')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cardTailWind
  border-radius: 10px !important
  width: 500px !important
</style>
