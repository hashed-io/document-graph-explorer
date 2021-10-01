import { mount, createLocalVue } from '@vue/test-utils'
import businessname from 'src/pages/dao/form/components/businessName.vue'
import * as All from 'quasar'
// import rulesString from 'src/i18n/en-us/index.js'
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
const wrapper = mount(businessname, {
  localVue,
  // props que se pasa al componente
  propsData: {
    bussinessObject: {
      businessName: 'ACME2 DAO LLC',
      additionalDesination: 'DAO'
    }
  },
  mocks: {
    $t: (msg) => {
      // let labels = msg.split('.')
      // var prevValue = rulesString
      // var nextValue
      // labels.forEach(element => {
      //   nextValue = prevValue[element]
      //   prevValue = nextValue
      // })
      // return nextValue
      return msg
    }
  }
})

describe('Form Submit', () => {
  it('Send props correctly', async () => {
    expect(wrapper.vm.formData.businessName).toBe('ACME2 DAO LLC')
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
  it('Trigger input and validate the DOM [businessName]', async () => {
    // Al ser un componente de Quasar se requiere obtener el input del DOM
    const buttonWrapper = wrapper.findComponent({ ref: 'cal-modal' }).get('input')
    // Se asigna valor. Solamente aplica para <input> <select> [etiquetas]
    await buttonWrapper.setValue('AGC')
    // Se espera que el DOM se actualice
    await wrapper.vm.$nextTick()
    // Se valida que data contenga el valor recibido
    expect(wrapper.vm.formData.businessName).toBe('AGC')
    expect(wrapper.vm.$refs['cal-modal']._data.innerError).toBeFalsy()
    expect(wrapper.vm.$refs['cal-modal']._data.innerErrorMessage).toBe('Does not contain any required terms')
  })
  it('Validate from DOM confirm business', async () => {
    const buttonWrapper2 = wrapper.findComponent({ ref: 'confirmNameInput' }).get('input')
    await buttonWrapper2.setValue('zzz')
    expect(wrapper.vm.$refs['confirmNameInput']._data.innerError).toBeFalsy()
    expect(wrapper.vm.$refs['confirmNameInput']._data.innerErrorMessage).toBe('The Business Entity Name and Confirm Name must match exactly.')
    expect(true).toBe(true)
  })
})
