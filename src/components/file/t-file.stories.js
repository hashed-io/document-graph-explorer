import TFile from './t-file.vue'

export default {
  title: 'Components/TFile',
  component: TFile,
  parameters: {
    backgrounds: {
      values: [
        { name: 'background', value: '#F3F4F6' },
        { name: 'white', value: '#fff' }
      ]
    }
  },
  argTypes: {
  },
  decorators: [() => ({ template: '<div style="margin: 3em;"><story /></div>' })]
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TFile },
  template: `
    <TFile v-bind="$props" />
  `
})
export const Example = Template.bind({})
Example.args = {
  label: 'Pick a file',
  outlined: true,
  dense: false
}

export const Base = Template.bind({})
Base.args = {
  label: 'Pick a file',
  outlined: true,
  dense: false,
  'bottom-slots': false
}
