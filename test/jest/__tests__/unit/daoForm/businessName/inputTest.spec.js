import { mount, createLocalVue } from '@vue/test-utils'
import businessname from 'src/pages/dao/form/components/businessName.vue'
import * as All from 'quasar'
import rulesi18n from 'src/i18n/en-us/index.js'
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
      let labels = msg.split('.')
      var prevValue = rulesi18n
      var nextValue
      labels.forEach(element => {
        nextValue = prevValue[element]
        prevValue = nextValue
      })
      return nextValue
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
    await buttonWrapper.setValue('ACME DAO LLC jest')
    // Se espera que el DOM se actualice
    await wrapper.vm.$nextTick()
    // Se valida que data contenga el valor recibido
    expect(wrapper.vm.formData.businessName).toBe('ACME DAO LLC jest')
  })
  it('Validate [rule business contain {DAO LLC ...}] in DOM', async () => {
    // Al ser un componente de Quasar se requiere obtener el input del DOM
    const buttonWrapper = wrapper.findComponent({ ref: 'cal-modal' }).get('input')
    // Se asigna valor. Solamente aplica para <input> <select> [etiquetas]
    await buttonWrapper.setValue('unit test jest')
    // Se espera que el DOM se actualice
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$refs['cal-modal']._data.innerError).toBeTruthy()
    expect(wrapper.vm.$refs['cal-modal']._data.innerErrorMessage).toBe('Does not contain any required terms')
  })
  it('Validate from DOM confirm business [rules Match Business Name]', async () => {
    const buttonWrapper2 = wrapper.findComponent({ ref: 'confirmNameInput' }).get('input')
    await buttonWrapper2.setValue('zzz')
    expect(wrapper.vm.$refs['confirmNameInput']._data.innerError).toBeTruthy()
    expect(wrapper.vm.$refs['confirmNameInput']._data.innerErrorMessage).toBe('The Business Entity Name and Confirm Name must match exactly.')
    expect(true).toBe(true)
  })
  it('Validate required rule from DOM [rules.required]', async () => {
    const buttonWrapper2 = wrapper.findComponent({ ref: 'confirmNameInput' }).get('input')
    await buttonWrapper2.setValue('')
    expect(wrapper.vm.$refs['confirmNameInput']._data.innerError).toBeTruthy()
    let string = rulesi18n.forms.errors.required
    expect(wrapper.vm.$refs['confirmNameInput']._data.innerErrorMessage).toBe(string)
    expect(true).toBe(true)
  })
})
