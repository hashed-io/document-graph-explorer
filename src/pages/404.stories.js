import NotFound from './404.vue'
export default {
  title: '404/ Not found',
  component: NotFound,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NotFound },
  template: `
  <div>
  <NotFound v-bind="$props" />
  </div>
  `
})

export const Base = Template.bind({})
Base.args = {
}
