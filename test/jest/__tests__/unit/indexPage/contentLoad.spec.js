import { shallowMount, createLocalVue } from '@vue/test-utils'
// import QBUTTON from './demo/QBtn-demo.vue'
import pageIndex from 'src/pages/index.vue'
import * as All from 'quasar'
import VueRouter from 'vue-router'
import routes from 'src/router/routes.js'

// import i18n from 'src/i18n/en-us'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
// eslint-disable-next-line import/namespace
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  // eslint-disable-next-line import/namespace
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})
const localVue = createLocalVue()
localVue.use(Quasar, { components }, VueRouter)
const router = new VueRouter({ routes })
const wrapper = shallowMount(pageIndex, {
  localVue,
  mocks: {
    $t: (msg) => msg
  },
  router
})
describe('index testing', () => {
  it('contains the exactly words', () => {
    // router.push('/')
    expect(wrapper.text()).toContain('We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -') // easier
  })
  it('redirect in press Login to Telos', async () => {
    const redirectButton = wrapper.find('#redirectButton')
    window.location.assign = jest.fn() // Create a spy
    redirectButton.trigger('click')
    // await wrapper.vm.$nextTick()
    expect(window.location.assign).toHaveBeenCalledWith('/login')
  })
})
