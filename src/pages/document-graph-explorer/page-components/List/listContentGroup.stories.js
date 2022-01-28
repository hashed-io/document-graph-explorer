import Vuex from 'vuex'
import ListContentGroup from './list-content-group.vue'
export default {
  title: 'Document Explorer/ Content groups [List]',
  component: ListContentGroup,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ListContentGroup },
  template: `
  <div>
  <ListContentGroup v-bind="$props" />
  </div>
  `,
  store: new Vuex.Store({
    modules: {
      documentGraph: {
        namespaced: true,
        state: {
          isHashed: false,
          isEdit: true
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

export const Base = Template.bind({})
Base.args = {
  contents_groups: { 'system': [{ 'key': 'nodeLabel', 'value': 'Lot ID: 243', 'dataType': 's', 'title': 'system' }], 'details': [{ 'key': 'varaties', 'value': 'Trinitario', 'dataType': 's', 'title': 'details' }, { 'key': 'sortPriority', 'value': '5', 'dataType': 's', 'title': 'details' }, { 'key': 'organic', 'value': 'Yes', 'dataType': 's', 'title': 'details' }, { 'key': 'harvestDate', 'value': '2-11-2021', 'dataType': 's', 'title': 'details' }, { 'key': 'lotId', 'value': 243, 'dataType': 'i', 'title': 'details' }], 'fixedDetails': [{ 'key': 'owner', 'value': 'tlaclocmant2', 'dataType': 'n', 'title': 'fixedDetails' }, { 'key': 'type', 'value': 'document', 'dataType': 'n', 'title': 'fixedDetails' }] }
}
export const Example = Template.bind({})
Example.args = {
  contents_groups: { 'system': [{ 'key': 'nodeLabel', 'value': 'Lot ID: 243', 'dataType': 's', 'title': 'system' }] }
}
