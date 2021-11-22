import Edges from './edges.vue'

export default {
  title: 'Document Explorer/Edges',
  component: Edges,
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Edges },
  template: `
    <div>
      <edges v-bind="$props" />
    </div>
  `
})

export const Example = Template.bind({})
Example.args = {
  edges: [
    {
      'docId': '1595',
      'docId_i': 1595,
      'hash': '679172dae90f1e51efcf2e958ac8c5228ff00cc4d290e3e388b4785f92975d42',
      'type': 'Payout',
      'creator': 'dao.hypha',
      'createdDate': '2021-02-14T21:53:02Z',
      '__typename': 'Payout'
    },
    {
      'docId': '1699',
      'docId_i': 1699,
      'hash': '86de0adf6234fe34bb842b0acb6cac17d396566452f425b7c61f29671a13ae1a',
      'type': 'Payout',
      'creator': 'dao.hypha',
      'createdDate': '2021-02-14T21:55:38.5Z',
      '__typename': 'Payout'
    },
    {
      'docId': '1596',
      'docId_i': 1596,
      'hash': '2702e20cb761d22b0fa2a40837b06e9935dd6b9089c10d370c8e18126ed0dfcb',
      'type': 'Payment',
      'creator': 'dao.hypha',
      'createdDate': '2021-02-14T21:53:02Z',
      '__typename': 'Payment'
    },
    {
      'docId': '1597',
      'docId_i': 1597,
      'hash': '337b17ee6422cad4ee74281f2421e6ed93822c96d2761348f9c4cc48848c5629',
      'type': 'Payment',
      'creator': 'dao.hypha',
      'createdDate': '2021-02-14T21:53:02Z',
      '__typename': 'Payment'
    },
    {
      'docId': '1598',
      'docId_i': 1598,
      'hash': '21ea2b313247c7217bcd5ece5c9a704c47a7c28b3e1a3f035c5419a083309509',
      'type': 'Payment',
      'creator': 'dao.hypha',
      'createdDate': '2021-02-14T21:53:02Z',
      '__typename': 'Payment'
    }
  ],
  relations: {
    'Payout': 'payout',
    'Payment': 'paid'
  }
}

export const Base = Template.bind({})
Base.args = {
  edges: []
}
