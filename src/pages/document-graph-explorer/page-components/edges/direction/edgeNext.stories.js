import Vuex from 'vuex'
import EdgeNext from './edgeNext.vue'
export default {
  title: 'Edges/ Edge Next',
  component: EdgeNext,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EdgeNext },
  template: `
  <div>
  <EdgeNext v-bind="$props" />
  </div>
  `,
  store: new Vuex.Store({
    modules: {
      documentGraph: {
        namespaced: true,
        state: {
          isHashed: false,
          isEdit: false
        },
        getters: {
          isHashed: state => {
            return state.isHashed
          }
        }
      }
    }
  })
})

export const Base = Template.bind({})
Base.args = {
  /**
   Checks if the button should be disabled
  */
  item: { 'docId': '15', 'docId_i': 15, 'hash': '8c2f0b31151997d2d03a5aa01b9affeac3eb6ce6a7c7af58a44b7cc66438e3d4', 'type': 'Post', 'creator': 'hasheduser11', 'createdDate': '2021-11-22T19:06:02Z', 'system_nodeLabel_s': 'Post: Labore est neque sit amet adipisci non labore est neque sit amet adipisci non.', '__typename': 'Post', 'edgeName': 'liked', 'direction': 'next' },
  isEdit: false,
  index: 0
}
