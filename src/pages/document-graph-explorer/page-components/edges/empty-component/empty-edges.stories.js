import emptyEdges from './empty-edges.vue'
export default {
  title: 'Edges/ Empty component',
  component: emptyEdges,
  argTypes: {
    label: {
      name: 'label',
      type: { name: 'string', required: false },
      defaultValue: 'Edges',
      description: 'The title of the component',
      table: {
        type: {
          summary: 'String'
        },
        defaultValue: { summary: 'Edges' }
      },
      control: {
        type: 'text'
      }
    },
    msg: {
      name: 'label',
      type: { name: 'string', required: false },
      defaultValue: '',
      description: 'Message to show. It helps when the search return empty or the doc do not contain edges',
      table: {
        type: {
          summary: 'String'
        },
        defaultValue: { summary: 'String' }
      },
      options: ['No edge found', 'Add edges using the button below', 'This document does not contain edges'],
      control: {
        type: 'radio'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { emptyEdges },
  template: `
  <div>
  <emptyEdges v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
