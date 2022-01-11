import CertificateSection from './certificateSection.vue'
export default {
  title: 'Certificate/ Certificate Section',
  component: CertificateSection,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CertificateSection },
  template: `
  <div>
  <CertificateSection v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
Base.args = {
  certificates: [{ 'account': 'Savion', 'date': '2001-01-30', 'notes': ['### note 1\n * __lorem__', '* lorem **ipsum**'] }, { 'account': 'Maximus', 'date': '2001-01-30', 'notes': ['### note 1\n * __lorem__', '* lorem **ipsum**'] }, { 'account': 'Roman', 'date': '2001-01-30', 'notes': ['### note 1\n * __lorem__', '* lorem **ipsum**'] }, { 'account': 'Audrey', 'date': '2001-01-30', 'notes': ['### note 1\n * __lorem__', '* lorem **ipsum**'] }],
  show: true
}
export const Example = Template.bind({})
Example.args = {
  certificates: [],
  show: false
}
