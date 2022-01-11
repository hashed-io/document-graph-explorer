import CertificateDialog from './certificateDialog.vue'
export default {
  title: 'Certificate/ Certificate Dialog',
  component: CertificateDialog,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CertificateDialog },
  template: `
  <div>
  <CertificateDialog v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
Base.args = {
}
export const Example = Template.bind({})
Example.args = {}
