import { shallowMount, createLocalVue } from '@vue/test-utils'
import listContract from 'src/pages/dao/manage/listContracts.vue'
import * as All from 'quasar'
import Vuex from 'vuex'
import {
  ClosePopup
} from 'quasar'
import { validation } from 'src/mixins/validation'
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
// localVue.mixin(validation)
// const actions = {
//   testActions: jest.fn()
// }
// const store = new Vuex.Store({ actions })
const VueFormStub = {
  render: () => {},
  methods: {
    validate: () => { return true }
  }
}
// const mockFunction = {
//   render: () => {},
//   methods: {
//     showErrorMsg: () => { return true }
//   }
// }
describe('create new labels on new labels array', () => {
  it('save data in correct array', async () => {
    const wrapper = shallowMount(listContract, {
      localVue,
      propsData: {
        dao: {
          dao: 'alejandroga2'
        }
      },
      mixins: [validation],
      mocks: {
        $t: (msg) => msg
      },
      stubs: {
        'q-form': VueFormStub
      },
      directives: {
        ClosePopup
      }
    })
    // Press add field button in table
    // await wrapper.find('#addFieldButton').trigger('click')
    // await wrapper.vm.$nextTick()
    // Set contract data
    await wrapper.setData({
      contract:
      { label: 'l1',
        loadingState: false,
        ipfs: undefined,
        value: [
          'name',
          'alejandroga1'
        ] }
    })
    // press add field button in modal
    // await wrapper.find('#addFieldButton').trigger('click')
    // await wrapper.vm.$nextTick()
    // console.log(wrapper.vm.$refs)
    await wrapper.vm.addRow()
    expect(wrapper.vm.newLabels[0].value[1]).toBe('alejandroga1')
    console.log(wrapper.vm.newLabels[0].value[1])
    // await wrapper.vm.saveData('tester')
    expect(true).toBe(true)
  })
})
