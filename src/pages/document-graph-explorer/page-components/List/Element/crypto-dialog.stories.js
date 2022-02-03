import cryptoDialog from './crypto-dialog.vue'
export default {
  title: 'Document Explorer/ Key Dialog',
  component: cryptoDialog,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { cryptoDialog },
  template: `
  <div>
  <cryptoDialog v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
Base.args = {
  openDialog: false
}
