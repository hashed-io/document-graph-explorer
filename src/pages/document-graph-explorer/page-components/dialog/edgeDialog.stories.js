import EdgeDialog from './edgeDialog.vue'
export default {
  title: 'Edges/ Edge Form',
  component: EdgeDialog,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EdgeDialog },
  template: `
  <div style='padding-left: 30%;'>
  <EdgeDialog v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
Base.args = {
}
