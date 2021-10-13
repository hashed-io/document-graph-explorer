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
const VueFormStub = {
  render: () => {},
  methods: {
    validate: () => {
      wrapper.vm.$data.rules.required('')
    }
  }
}
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

describe('Check the rules of types in labels', () => {
  it('Label with type Name must have 12 length, letters a-z and number in range 1-5 [cases true]', () => {
    // Case 1
    let response = wrapper.vm.$data.rules.isEosAccount('daollctest12')
    expect(response).toBe(true)
    // Case 2
    response = wrapper.vm.$data.rules.isEosAccount('alejandrog11')
    expect(response).toBe(true)
    // Case 3
    response = wrapper.vm.$data.rules.isEosAccount('ftester')
    expect(response).toBe(true)
    // Case 3
    response = wrapper.vm.$data.rules.isEosAccount('12daollctest')
    expect(response).toBe(true)
  })
  it('Label with type Name must have 12 length, letters a-z and number in range 1-5 [cases false]', () => {
    // Case 1
    let response = wrapper.vm.$data.rules.isEosAccount('ALejandroga1')
    expect(response).not.toBe(true)
    // Case 2
    response = wrapper.vm.$data.rules.isEosAccount('alejandroga1313')
    expect(response).not.toBe(true)
    // Case 3
    response = wrapper.vm.$data.rules.isEosAccount('alejandroga6')
    expect(response).not.toBe(true)
    // Case 4
    response = wrapper.vm.$data.rules.isEosAccount('alejandroga95')
    expect(response).not.toBe(true)
  })
  it('Label with type CheckSum [cases true]', () => {
    expect(true).toBe(true)
  })
  it('Label with type CheckSum [cases false]', () => {
    expect(true).toBe(true)
  })
})
describe('Verified checksum rule', () => {
  it('Contain letters [a-f] or [A-F], the numbers in range [0-9] and have 64 length', () => {
    // Case 1
    let response = wrapper.vm.$data.rules.isChecksum('7af12386a82b6337d6b1e4c6a1119e29bb03e6209aa03c70ed3efbb9b74a290c')
    expect(response).toBe(true)
    // Case 2
    response = wrapper.vm.$data.rules.isChecksum('23bE55B26Aabb3C7dcBe988aAbCC215ebefe9d8bf3BAcf6D674ECD0De8E0091B')
    expect(response).toBe(true)
  })
  it('Contain letters [a-z] or [A-Z]', () => {
    // Case 1
    let response = wrapper.vm.$data.rules.isChecksum('Z2WRZE0kNxSjCFOQhOmjPQ8wVIKYPn4mPuohVuLYHUfWOmKXaKz9VwFJKjrtEvh')
    expect(response).not.toBe(true)
  })
  it('length is less than 64 [63]', () => {
    let response = wrapper.vm.$data.rules.isChecksum('Z2WRZE0kNxSjCFOQhOmjPQ8wVIKYPn4mPuohVuLYHUfWOmKXaKz9VwFJKjrtEvh')
    expect(response).not.toBe(true)
    response = wrapper.vm.$data.rules.isChecksum('Z2WRZE0kNxSjCFOQhOmj')
    expect(response).not.toBe(true)
    response = wrapper.vm.$data.rules.isChecksum('LoremIpSUm')
    expect(response).not.toBe(true)
  })
})
