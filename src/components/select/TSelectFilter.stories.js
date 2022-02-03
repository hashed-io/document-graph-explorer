import TSelectFilter from './TSelectFilter.vue'
export default {
  title: 'Components/ Select to create ',
  component: TSelectFilter,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TSelectFilter },
  template: `
  <div>
  <TSelectFilter v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
Base.args = {
  debounce: 0,
  dense: true,
  message: 'Choose document type and press enter',
  placeholder: undefined,
  stringOptions: ['Dried', 'Transport', 'Roasted', 'Buyer', 'Farmer', 'Archive', 'Certifier', 'Fermentation', 'Cooperative', 'Lot']
}
export const Example = Template.bind({})
Example.args = {
  debounce: 0,
  dense: true,
  message: 'Choose document type and press enter',
  placeholder: undefined,
  stringOptions: ['Dried', 'Transport', 'Roasted', 'Buyer', 'Farmer', 'Archive', 'Certifier', 'Fermentation', 'Cooperative', 'Lot']
}
