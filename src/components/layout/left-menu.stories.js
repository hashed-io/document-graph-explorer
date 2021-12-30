import leftMenuAuthenticated from './left-menu.vue'
export default {
  title: 'Components/Lateral Menu',
  component: leftMenuAuthenticated,
  parameters: {
    backgrounds: {
      values: [
        { name: 'background', value: '#F3F4F6' },
        { name: 'white', value: '#fff' }
      ]
    }
  },
  argTypes: {
    dense: {
      options: ['true', 'false'],
      control: { type: 'radio' }
    }
  },
  decorators: [() => ({ template: '<div style="margin: 3em; background: #F3F4F6;"><story /></div>' })]
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { leftMenuAuthenticated },
  template: `
    <leftMenuAuthenticated v-bind="$props" />
  `
})
export const Example = Template.bind({})
Example.args = {
  blockchains: {
    tlos: {
      selected: undefined,
      logo: 'telos.png',
      name: 'Telos',
      color: '#571BFE',
      endpoint: undefined,
      options: [
        {
          label: 'Hypha',
          value: 'https://alpha-st.tekit.io/graphql',
          color: 'black'
        },
        {
          label: 'Social',
          value: 'https://hashed.systems/alpha-dge-test/graphql',
          color: 'black'
        },
        {
          label: 'Cannabis',
          value: 'https://hashed.systems/alpha-trace-test/graphql',
          color: 'black'
        }
      ]
    },
    // ksm: {
    //   selected: undefined,
    //   logo: 'kusama.png',
    //   name: 'Kusama',
    //   color: '#101921',
    //   endpoint: undefined,
    //   options: [
    //     {
    //       label: 'ksm 1',
    //       value: 'https://alpha-st.tekit.io/graphql',
    //       color: 'black'
    //     },
    //     {
    //       label: 'ksm 2',
    //       value: 'https://hashed.systems/alpha-dge-test/graphql',
    //       color: 'black'
    //     },
    //     {
    //       label: 'ksm 3',
    //       value: 'https://hashed.systems/alpha-trace-test/graphql',
    //       color: 'black'
    //     }
    //   ]
    // },
    atom: {
      selected: undefined,
      logo: 'cosmo.png',
      name: 'Cosmos',
      color: '#101921',
      endpoint: undefined,
      options: [
        {
          label: 'Cosmos 1',
          value: 'https://alpha-st.tekit.io/graphql',
          color: 'black'
        },
        {
          label: 'Cosmos 2',
          value: 'https://hashed.systems/alpha-dge-test/graphql',
          color: 'black'
        },
        {
          label: 'Cosmos 3',
          value: 'https://hashed.systems/alpha-trace-test/graphql',
          color: 'black'
        }
      ]
    },
    dot: {
      selected: undefined,
      logo: 'polkadot.png',
      name: 'Polkadot',
      color: '#E6007A',
      endpoint: undefined,
      options: [
        {
          label: 'dot 1',
          value: 'https://alpha-st.tekit.io/graphql',
          color: 'black'
        },
        {
          label: 'dot 2',
          value: 'https://hashed.systems/alpha-dge-test/graphql',
          color: 'black'
        },
        {
          label: 'dot 3',
          value: 'https://hashed.systems/alpha-trace-test/graphql',
          color: 'black'
        }
      ]
    },
    sol: {
      selected: undefined,
      logo: 'solana.png',
      name: 'Solana',
      color: '#DC1FFF',
      endpoint: undefined,
      options: [
        {
          label: 'sol 1',
          value: 'https://alpha-st.tekit.io/graphql',
          color: 'black'
        },
        {
          label: 'sol 2',
          value: 'https://hashed.systems/alpha-dge-test/graphql',
          color: 'black'
        },
        {
          label: 'sol 3',
          value: 'https://hashed.systems/alpha-trace-test/graphql',
          color: 'black'
        }
      ]
    }
  },
  custom: {
    selected: undefined,
    logo: undefined,
    name: 'custom',
    endpoint: undefined,
    options: undefined
  }
}

export const Base = Template.bind({})
Base.args = {
  blockchains: {
    tlos: {
      selected: undefined,
      logo: 'telos.png',
      name: 'Telos',
      color: '#571BFE',
      endpoint: undefined,
      options: [
        {
          label: 'Hypha',
          value: 'https://alpha-st.tekit.io/graphql',
          color: 'black'
        },
        {
          label: 'Social',
          value: 'https://hashed.systems/alpha-dge-test/graphql',
          color: 'black'
        },
        {
          label: 'Cannabis',
          value: 'https://hashed.systems/alpha-trace-test/graphql',
          color: 'black'
        }
      ]
    }
  },
  custom: {
    selected: undefined,
    logo: undefined,
    name: 'custom',
    endpoint: undefined,
    options: undefined
  }
}
