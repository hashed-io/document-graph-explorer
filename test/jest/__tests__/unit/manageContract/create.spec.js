import { shallowMount, createLocalVue } from '@vue/test-utils'
import listContract from 'src/pages/dao/manage/listContracts.vue'
import * as All from 'quasar'
import Vuex from 'vuex'
import {
  ClosePopup
} from 'quasar'
import { validation } from 'src/mixins/validation'
// import documents from 'src/store/documents'
// import { utils } from 'src/mixins/utils'
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
const wrapper = shallowMount(listContract, {
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
    ClosePopup
  }
})

describe('Create labels and verify the edit action', () => {
  var numberOfLabels = 4
  var indexToFind = 2
  it('Push new label on newLabels array [Frontend]', async () => {
    for (let index = 0; index < numberOfLabels; index++) {
      await wrapper.setData({
        contract:
      { label: 'label' + index,
        loadingState: false,
        ipfs: undefined,
        value: [
          'name',
          'alejandroga' + index
        ] }
      })
      await wrapper.vm.addRow()
    }

    expect(wrapper.vm.newLabels[indexToFind].value[1]).toBe('alejandroga' + indexToFind)
    expect(wrapper.vm.newLabels).toHaveLength(numberOfLabels)
    expect(wrapper.vm.manageContract).toHaveLength(numberOfLabels)
    expect(wrapper.vm.updateLabels).toHaveLength(0)
    expect(wrapper.vm.deleteLabels).toHaveLength(0)
  })
  it('Value to edit is', () => {
    expect(wrapper.vm.manageContract[indexToFind].label).toBe('label' + indexToFind)
  })
  it('Push update label on newLabels array [frontend]', async () => {
    // Add new label
    // Se modifica la información

    await wrapper.vm.editRow(indexToFind)
    await wrapper.setData({
      contract:
      { label: 'l1 edited',
        loadingState: false,
        ipfs: undefined,
        value: [
          'name',
          'alejandroga1'
        ] }
    })
    await wrapper.vm.updateRow()
    expect(wrapper.vm.newLabels[indexToFind].label).toBe('l1 edited')
    expect(wrapper.vm.updateLabels).toHaveLength(0)
  })
})
describe('Verified the changes on labels', () => {
  it('simulate load data from blockchain and edit label [edit label] [backend]', async () => {
    // simulating load data from BlockChain
    await wrapper.setData({
      manageContract: [{ 'label': 'create_label', 'value': ['asset', '1000 TLOS'] }, { 'label': 'label2', 'value': ['name', 'alejandroga2'] }]
    })
    expect(wrapper.vm.manageContract).toHaveLength(2)
  })
  it('edit row', async () => {
    // edit label
    var indexToFind = 1
    await wrapper.vm.editRow(indexToFind)
    await wrapper.setData({
      contract: {
        label: 'l3 edited'
      }
    })
    await wrapper.vm.updateRow()
    expect(wrapper.vm.updateLabels).toHaveLength(0)
  })
  it('Edit label changes the type [and/or] value', async () => {
    // edit label
    await wrapper.vm.editRow(0)
    await wrapper.setData({
      contract: {
        value: ['string', 'lorem ipsum']
      }
    })
    await wrapper.vm.updateRow()
    expect(wrapper.vm.updateLabels).toHaveLength(1)
    expect(true).toBe(true)
  })
})
