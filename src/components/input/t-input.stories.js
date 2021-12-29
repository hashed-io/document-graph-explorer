import TInput from './t-input.vue'

export default {
  title: 'Document Explorer/TInput',
  component: TInput,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' }
      ]
    }
  },
  argTypes: {
    dense: {
      options: ['true', 'false'],
      control: { type: 'radio' }
    }
  },
  decorators: [() => ({ template: '<div style="margin: 3em;"><story /></div>' })]
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TInput },
  template: `
    <TInput v-bind="$props" />
  `
})
export const Example = Template.bind({})
Example.args = {
  value: 'Lorem ipsum',
  debounce: 100,
  dense: false,
  type: 'text',
  autogrow: false,
  placeholder: '',
  rules: ["val => !!val || this.$t('forms.errors.required')"],
  label: 'Lorem ipsum'
}

export const Base = Template.bind({})
Base.args = {
  placeholder: 'Enter the value'
}