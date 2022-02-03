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
  certificates: [
    {
      'docId': '16',
      'docId_i': 16,
      'type': 'Certificate',
      'creator': 'tlaclocmant2',
      'createdDate': '2022-01-13T22:48:55Z',
      'updatedDate': '2022-01-13T22:48:55Z',
      'contract': 'tlaclocmant2',
      'system_nodeLabel_s': 'Certified by: tlaclocmant2',
      '__typename': 'Certificate',
      'edgeName': 'certifiedBy',
      'direction': 'next',
      'notes': '1. Type in stuff on the left.\n 2. See the live updates on the right. That\'s it.  Pretty simple.  There\'s also a drop-down option in the upper right to switch between various views\: - **Preview:**  A live display of the generated HTML as it would render in a browser.',
      'signature': 'Lorem Ipsum'
    },
    {
      'docId': '16',
      'docId_i': 16,
      'type': 'Certificate',
      'creator': 'alejandroga1',
      'createdDate': '2022-01-13T22:48:55Z',
      'updatedDate': '2022-01-13T22:48:55Z',
      'contract': 'tlaclocmant2',
      'system_nodeLabel_s': 'Certified by: tlaclocmant2',
      '__typename': 'Certificate',
      'edgeName': 'certifiedBy',
      'direction': 'next',
      'notes': 'bafkreifewrgl647unpq3z2xrtcyecwfsn7t7h5le5wdvjbbj7cndontcbm',
      'signature': '### Lorem Ipsum'
    },
    {
      'docId': '16',
      'docId_i': 16,
      'type': 'Certificate',
      'creator': 'Tempora',
      'createdDate': '2022-01-13T22:48:55Z',
      'updatedDate': '2022-01-13T22:48:55Z',
      'contract': 'tlaclocmant2',
      'system_nodeLabel_s': 'Certified by: tlaclocmant2',
      '__typename': 'Certificate',
      'edgeName': 'certifiedBy',
      'direction': 'next',
      'notes': 'bafkreifewrgl647unpq3z2xrtcyecwfsn7t7h5le5wdvjbbj7cndontcbm',
      'signature': 'U2FsdGVkX1+nax7qC+FgfrszQ+oNumn2ZRxuXB+utTUn1qtyaa6UJwfzLaqMF9sIeZWCu0aMv15X3bYmBB4t5RCpgzTi8oIGF2WedG6UEEFl8eZ7UnnCQahm0cDv0vNbEZmOLgKIrACJBGsp27ysGw=='
    }
  ]
}
export const Example = Template.bind({})
Example.args = {
  certificates: []
}
