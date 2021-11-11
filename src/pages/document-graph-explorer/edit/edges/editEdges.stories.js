import Edges from './edges.vue'

export default {
  title: 'Document Explorer/Edges',
  component: Edges,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Edges },
  template: `
    <div>
      <edges v-bind="$props" />
    </div>
  `
})

export const Example = Template.bind({})
Example.args = {
  edges: [
    {
      direction: 'prev',
      name: 'Hashed Partner Forms',
      label: 'Facility',
      edge: 'produced'
    },
    {
      direction: 'next',
      name: 'Item created on 12 sep 2021',
      label: 'Checkpoint',
      edge: 'scanned'
    },
    {
      direction: 'next',
      name: 'Harvested in Upstate NY on 12 sep 2021',
      label: 'Checkpoint',
      edge: 'scanned'
    },
    {
      direction: 'next',
      name: 'Packed and shipped on 14 sep 2021',
      label: 'Checkpoint',
      edge: 'scanned'
    },
    {
      direction: 'next',
      name: 'Arrived at Dispensary on 18 sep 2021',
      label: 'Checkpoint',
      edge: 'scanned'
    }
  ]
}

export const Base = Template.bind({})
Base.args = {
  edges: []
}
