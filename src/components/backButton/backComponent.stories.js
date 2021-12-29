import BackComponent from './backComponent.vue'
import Vuex from 'vuex'
export default {
  title: 'Document Explorer/BackComponent',
  component: BackComponent,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BackComponent },
  onClick: { action: 'clicked' },
  template: `
    <BackComponent v-bind="$props" />
  `,
  store: new Vuex.Store({
    state: {
      stackNavigation: []
    },
    mutations: {
      clearStack (state) {
        state.stackNavigation = []
      }
    }
  })
})

export const Base = Template.bind({})
