import TSelectExtend from './TSelectExtend.vue'

export default {
  title: 'components/TSelect',
  component: TSelectExtend,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TSelectExtend },
  template: `
    <div>
      <TSelectExtend v-bind="$props" />
    </div>
  `
})

export const Example = Template.bind({})
Example.args = {
  value: 'op 3',
  message: 'Choose an option...',
  options: [
    {
      label: 'option 1',
      value: 'op 1'
    },
    {
      label: 'option 2',
      value: 'op 2'
    },
    {
      label: 'option 3',
      value: 'op 3'
    }
  ],
  dense: false,
  rules: []
}

export const Base = Template.bind({})
Base.args = {
  value: undefined,
  message: 'Choose an option...',
  options: [
    {
      label: 'option 1',
      value: 'op 1'
    },
    {
      label: 'option 2',
      value: 'op 2'
    },
    {
      label: 'option 3',
      value: 'op 3'
    }
  ],
  dense: false,
  rules: []
}
