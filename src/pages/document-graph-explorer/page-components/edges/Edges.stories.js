import Vuex from 'vuex'
import Edge from './edges.vue'
export default {
  title: 'Edges/ Edge component',
  component: Edge,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Edge },
  template: `
  <div>
  <Edge v-bind="$props" />
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
          getIsEdit: state => {
            return state.isEdit
          }
        }
      }
    }
  })
})

export const Example = Template.bind({})
Example.args = {
  edges: [{ 'name': 'tlaclocmant2', 'docId': '0', 'hash': '48700bbce4a2b850c542637f5b914e943d7be73374045b27116c9af5d150aff1', 'type': 'Farmer', 'createdDate': '2021-12-21T00:00:05.5Z', 'systemNodeLabel': 'Familia Rodriguez Perez', 'edgeName': 'produced', 'system_nodeLabel_s': 'Lot ID: 243', 'direction': 'prev' }, { 'docId': '6', 'docId_i': 6, 'hash': '5e7d01f175bc6c8e09290c043917c2b84c33c4f07aa1fbfe12583fff2e0df58c', 'type': 'Fermentation', 'creator': 'tlaclocmant2', 'createdDate': '2021-12-21T00:00:58.5Z', 'system_nodeLabel_s': 'Fermentation started on 2-26-2021', '__typename': 'Fermentation', 'edgeName': 'scanFrmSrt', 'direction': 'next' }, { 'docId': '7', 'docId_i': 7, 'hash': '88d636d98b542e0515ffa70f75a166465beb5ae9c635c5560dde38762d6db90c', 'type': 'Fermentation', 'creator': 'tlaclocmant2', 'createdDate': '2021-12-21T00:01:05.5Z', 'system_nodeLabel_s': 'Fermentation ended on 2-26-2021', '__typename': 'Fermentation', 'edgeName': 'scanFrmEnd', 'direction': 'next' }, { 'docId': '8', 'docId_i': 8, 'hash': '9fbd673652e4aea5d3a4ad8a5a3658a2088f8d20b1b283b2a01f925e47b39601', 'type': 'Dried', 'creator': 'tlaclocmant2', 'createdDate': '2021-12-21T00:01:14Z', 'system_nodeLabel_s': 'Dried for 10 days in closed space', '__typename': 'Dried', 'edgeName': 'scanDried', 'direction': 'next' }, { 'docId': '9', 'docId_i': 9, 'hash': '55c57cf629fd492f9a08ef55cb39072fba9f9c93beb6a2e52f9f65e2a86bc0eb', 'type': 'Roasted', 'creator': 'tlaclocmant2', 'createdDate': '2021-12-21T00:01:29Z', 'system_nodeLabel_s': 'Roasted for 20 minutes at 144 C temperature', '__typename': 'Roasted', 'edgeName': 'scanRoasted', 'direction': 'next' }, { 'docId': '10', 'docId_i': 10, 'hash': '36922155a88e4a7d493f1d959ea69e0fb939eef5263b4da595ea1f3dd5e16e61', 'type': 'Transport', 'creator': 'tlaclocmant2', 'createdDate': '2021-12-21T00:01:37Z', 'system_nodeLabel_s': 'Lot transported to Cusco', '__typename': 'Transport', 'edgeName': 'scanTranspt', 'direction': 'next' }, { 'docId': '10', 'docId_i': 10, 'hash': '36922155a88e4a7d493f1d959ea69e0fb939eef5263b4da595ea1f3dd5e16e61', 'type': 'Transport', 'creator': 'tlaclocmant2', 'createdDate': '2021-12-21T00:01:37Z', 'system_nodeLabel_s': 'Lot transported to Cusco', '__typename': 'Transport', 'edgeName': 'tested', 'direction': 'next' }]
}

export const Base = Template.bind({})
Base.args = {
  edges: []
}
