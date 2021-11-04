import Edges from './edges.vue'

export default {
  title: 'Document Graph/Edges',
  component: Edges,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Edges },
  template: `
    <edges v-bind="$props" />
  `
})

export const Example = Template.bind({})
Example.args = {
}

export const Base = Template.bind({})
