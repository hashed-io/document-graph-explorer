import EraseBox from './eraseBox.vue'
export default {
  title: 'Document Explorer/Erase Modal',
  component: EraseBox,
  parameters: {
    backgrounds: {
      values: [
        { name: 'background', value: '#F3F4F6' },
        { name: 'white', value: '#fff' }
      ]
    }
  },
  argTypes: {
    dense: {
      options: ['true', 'false'],
      control: { type: 'radio' }
    }
  },
  decorators: [() => ({ template: '<div style="margin-left: 15rem; width: 120%;"><story/></div>' })]
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EraseBox },
  template: `
    <EraseBox v-bind="$props" />
  `
})
// export const Example = Template.bind({})
// Example.args = {
//   docTitle: 'lorem ipsum',
//   systemNodeLabel: 'asd'
// }

export const Base = Template.bind({})
Base.args = {
  docTitle: 'lorem ipsum',
  systemNodeLabel: 'asd'
}
