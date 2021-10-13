import { mount, createLocalVue } from '@vue/test-utils'
import detailComponent from 'src/pages/dao/form/components/detail.vue'
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
var wrapper
var periodOfDuration = 'Expires - 50 years'
var valueSelect = '50'
var delayedEffectiveDate = '09/14/2021'
beforeEach(() => {
  wrapper = mount(detailComponent, {
    localVue,
    // props que se pasa al componente
    propsData: {
      detailObject: {
        periodOfDuration: periodOfDuration,
        expirationDate: '',
        delayedEffectiveDate: delayedEffectiveDate
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
})

describe('Passing props', () => {
  it('validate the input of SELECT fill with the prop', () => {
    let options = wrapper.findComponent({ ref: 'selectPeriod' }).props('value')
    expect(options.label).toBe(periodOfDuration)
    expect(options.value).toBe(valueSelect)
  })
  it('validate the input of DelayedEffectiveDate fill with the prop', () => {
    let options = wrapper.findComponent({ ref: 'delayedEffectiveDateInput' }).props('value')
    expect(options).toBe(delayedEffectiveDate)
  })
})
describe('validate options of select period of duration', () => {
  it('get options and validate the 5 options', () => {
    let options = [
      {
        label: 'Expires',
        value: '0'
      },
      {
        label: 'Expires - 30 years',
        value: '30'
      },
      {
        label: 'Expires - 50 years',
        value: '50'
      },
      {
        label: 'Expires - 99 years',
        value: '99'
      },
      {
        label: 'Perpetual',
        value: 'none'
      }
    ]
    const items = JSON.parse(JSON.stringify(wrapper.findComponent({ ref: 'selectPeriod' }).props('options')))
    expect(items).toEqual(options)
  })
  it('Change the select value modify the expiration date [only 30, 50, 99]', async () => {
    // let selectComponent = await wrapper.findComponent(wrapper.findComponent({ ref: 'selectPeriod' })).trigger('change')
    // Modify the value of select
    let options = wrapper.findComponent({ ref: 'selectPeriod' }).props('value')
    let selectObject = {
      label: 'Expires - 99 years',
      value: '99'
    }
    await wrapper.setData({
      selectValue: selectObject
    })
    // Calculate the correct value [current year + value selected]
    let responseCalculateDate = wrapper.vm.calculateDate()
    responseCalculateDate = responseCalculateDate.split('/')
    const newDate = new Date()
    const years = newDate.getFullYear() + parseInt(options.value)
    // Check modification of Expiration Date
    expect(responseCalculateDate[2]).toBe(years.toString())
  })
  it('Change the select value modify the expiration date [only 0]', async () => {
    expect(true).toBeTruthy()
  })
  it('Change the select value modify the expiration date [only none]', async () => {
    expect(true).toBeTruthy()
  })
})
describe('Expiration date contain the years of the selection', () => {

})
describe('Delayed Effective date contain format [mm/dd/yyyy]', () => {

})
describe('validate required inputs [periodOfDuration, ExpirationDate if none selected]', () => {

})

describe('Delayed Effective date has 90 days length', () => {

})
