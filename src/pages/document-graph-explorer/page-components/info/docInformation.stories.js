import DocInformation from './DocInformation.vue'

export default {
  title: 'Document Explorer/Doc Information',
  component: DocInformation,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DocInformation },
  template: `
    <div>
      <docInformation v-bind="$props" />
    </div>
  `
})

export const Example = Template.bind({})

Example.args = {
  docInfo: {
    'name': 'dao.hypha',
    'docId': '130',
    'hash': 'b52cb53ef44d4280928c3a3f0461e4bb6ca0b7e4f420a20b2beaafdc87a35dc8',
    'creator': 'dao.hypha',
    'type': 'Member',
    'createdDate': '2021-02-14T17:39:44.5Z',
    'updatedDate': '2021-02-14T17:39:44.5Z'
  }
}

export const Base = Template.bind({})
Base.args = {
  docInfo: {}
}
