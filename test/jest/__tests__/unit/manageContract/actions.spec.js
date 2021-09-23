import { shallowMount, createLocalVue } from '@vue/test-utils'
import listContract from 'src/pages/dao/manage/listContracts.vue'
import * as All from 'quasar'
import Vuex from 'vuex'

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
localVue.use(Quasar, { components }, Vuex)
const actions = {
  testActions: jest.fn()
}
const store = new Vuex.Store({ actions })

describe('Action on DAO api', () => {
  it('Send data correctly', async () => {
    const wrapper = shallowMount(listContract, {
      localVue, store
    })
    // await wrapper.find('.commit').trigger('click')
    await wrapper.vm.saveData('tester')

    expect(actions.testActions).toHaveBeenCalledWith(
      {},
      { msg: 'Test Commit' }
    )
  })
})
