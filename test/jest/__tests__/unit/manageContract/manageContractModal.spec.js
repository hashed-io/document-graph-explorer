import { mount, createLocalVue } from '@vue/test-utils'
import listContract from 'src/pages/dao/manage/listContracts.vue'
import * as All from 'quasar'
import Vuex from 'vuex'
import {
  ClosePopup,
  Ripple
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
const VueFormStub = {
  render: () => {},
  methods: {
    validate: () => { return true }
  }
}
var wrapper

beforeEach(() => {
  wrapper = mount(listContract, {
    localVue,
    propsData: {
      dao: {
        dao: 'alejandroga2'
      }
    },
    mixins: [validation],
    mocks: {
      $t: (msg) => msg,
      showErrorMsg: (val) => { return true },
      showSuccessMsg: (val) => { return true }
    },
    stubs: {
      'q-form': VueFormStub
    },
    directives: {
      ClosePopup,
      Ripple
    }
  })
})
describe('Changes type on create', () => {
  it('The change in Q-select erase the value in managecontract and newLabels array', async () => {
    await wrapper.setData({ newLabels: [], updateLabels: [], deleteLabels: [], manageContract: [], hasAbi: true, initializedDAO: true })
    // add new row in frontend
    await wrapper.vm.openAddField()
    let newLabelString = 'addedNewLabel'
    await wrapper.setData({
      contract:
        { label: newLabelString,
          loadingState: false,
          ipfs: undefined,
          value: [
            'name',
            'alejandrog11'
          ] }
    })
    await wrapper.vm.addRow()
    // edit the row
    await wrapper.vm.editRow(0)
    await wrapper.setData({
      contract: {
        value: [
          'asset'
        ]
      }
    })
    await wrapper.vm.changeType()
    expect(wrapper.vm.contract.value[1]).toBeUndefined()
  })
  it('The change in Q-select erase the value in managecontract and newLabels array [DOM]', async () => {
    await wrapper.setData({ newLabels: [], updateLabels: [], deleteLabels: [], manageContract: [], hasAbi: true, initializedDAO: true })
    // add new row in frontend
    // Open the modal
    await wrapper.findComponent({ ref: 'addFieldButton' }).get('button').trigger('click')
    // await wrapper.vm.$nextTick()
    // await wrapper.vm.openAddField()
    const selectType = await wrapper.findAllComponents({ ref: 'qDialog' })
    // const selectType = wrapper.find('select')
    // wrapper.vm.$refs.provider.errors[0];
    expect(selectType.exists()).toBe(true)
  })
})
