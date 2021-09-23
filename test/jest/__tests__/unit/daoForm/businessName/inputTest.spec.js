import { shallowMount, createLocalVue } from '@vue/test-utils'
import businessname from 'src/pages/dao/form/components/businessName.vue'
import * as All from 'quasar'
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
localVue.use(Quasar, { components })
const wrapper = shallowMount(businessname, {
  localVue,
  propsData: {
    businessName: 'DAO LC AGC',
    additionalDesination: 'DAO'
  }
})

describe('Form Submit', () => {
  it('Send props correctly', async () => {
    expect(wrapper.vm.formData.businessName).toBe('DAO LC AGC')
    expect(wrapper.vm.formData.additionalDesination).toBe('DAO')
  })
  it('businessName Contains substring (computed)', async () => {
    // wrapper.setData({ formData: { businessName: 'DAO LC AGC' } })
    await wrapper.setData({ formData: { businessName: 'ACME DAO LCC' } })
    expect(wrapper.vm.containsDesignations).toBe(true)
    await wrapper.setData({ formData: { businessName: 'ACME DAO LIMITED LIABILITY COMPANY' } })
    expect(wrapper.vm.containsDesignations).toBe(true)
    await wrapper.setData({ formData: { businessName: 'DECENTRALIZED AUTONOMOUS ORGANIZATION L.L.C.' } })
    expect(wrapper.vm.containsDesignations).toBe(true)
  })
  it('businessName not contains substring (computed)', async () => {
    await wrapper.setData({ formData: { businessName: 'Lorem ipsum' } })
    expect(wrapper.vm.containsDesignations).toBe(false)
    await wrapper.setData({ formData: { businessName: 'DECENTRALIZED AUTONOMOUS OANIZATION L..C.' } })
    expect(wrapper.vm.containsDesignations).toBe(false)
    await wrapper.setData({ formData: { businessName: 'LO L.L.C ACME' } })
    expect(wrapper.vm.containsDesignations).toBe(false)
  })
})
