import ConfirmDialog from './confirm-dialog.vue'

export default {
  title: 'components/Confirm Dialog',
  component: ConfirmDialog,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ConfirmDialog },
  template: `
    <div>
      <confirm-dialog v-bind="$props" />
    </div>
  `
})

export const Example = Template.bind({})
Example.args = {
  show: false
}

export const Base = Template.bind({})
Base.args = {
  show: true
}
