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
describe('Mount Quasar', () => {
  // console.log(components)
  // const localVue = createLocalVue()
  // localVue.use(Quasar, { components }, VueRouter) // , lang: langEn

  // console.log(vm)
  // it('has a created hook', () => {
  //   expect(typeof vm.increment).toBe('function')
  // })
  it('accesses the shallowMount', () => {
    // await wrapper.vm.$nextTick()
    router.push('/')
    // expect(vm.$el.test).toContain('We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -')
    expect(wrapper.text()).toContain('We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -') // easier
    expect(wrapper.find('span').text()).toContain('We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -')
  })

  // it('sets the correct default data', () => {
  //   expect(typeof vm.counter).toBe('number')
  //   const defaultData2 = QBUTTON.data()
  //   expect(defaultData2.counter).toBe(0)
  // })

  // it('correctly updates data when button is pressed', async () => {
  //   const button = wrapper.find('button')
  //   await button.trigger('click')
  //   expect(vm.counter).toBe(1)
  // })
})
