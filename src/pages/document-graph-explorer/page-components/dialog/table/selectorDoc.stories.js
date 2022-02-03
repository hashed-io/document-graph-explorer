import SelectorDoc from './selectorDoc.vue'
import Vuex from 'vuex'
export default {
  title: 'Edges/ New Edge ',
  component: SelectorDoc,
  argTypes: {
  }
}
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SelectorDoc },
  template: `
  <div>
  <SelectorDoc v-bind="$props" />
  </div>
  `,
  store: new Vuex.Store({
    modules: {
      accounts: {
        namespaced: true,
        state: {
          account: 'tlaclocmant2'
        },
        getters: {
          account: state => {
            return state.account
          }
        }
      }
    }
  })
})

export const Base = Template.bind({})
Base.args = {
  docInfo: { 'name': 'tlaclocmant2', 'docId': '0', 'hash': '__vue_devtool_undefined__', 'creator': 'tlaclocmant2', 'type': 'Farmer', 'createdDate': '2022-01-21T20:12:20Z', 'updatedDate': '2022-01-21T20:12:20Z', 'edgeName': '__vue_devtool_undefined__', 'systemNodeLabel': 'Familia Rodriguez Perez' }
}
export const Example = Template.bind({})
Example.args = {
  docInfo: { 'name': 'tlaclocmant2', 'docId': '0', 'hash': '__vue_devtool_undefined__', 'creator': 'tlaclocmant2', 'type': 'Farmer', 'createdDate': '2022-01-21T20:12:20Z', 'updatedDate': '2022-01-21T20:12:20Z', 'edgeName': '__vue_devtool_undefined__', 'systemNodeLabel': 'Familia Rodriguez Perez' }
}
