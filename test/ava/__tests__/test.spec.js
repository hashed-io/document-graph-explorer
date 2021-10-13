import { shallowMount, createLocalVue } from '@vue/test-utils'
import daoForm from 'src/pages/dao/form/daoForm.vue'
import Quasar, { QBtn } from 'quasar'
import test from 'ava'

const localVue = createLocalVue()
localVue.use(Quasar, { components: { QBtn } })
const wrapper = shallowMount(daoForm, {
  localVue
})
const vm = wrapper.vm

test('accesses the shallowMount', t => {
  t.regex(vm.$el.textContent, /rocket muffin/)
  t.regex(wrapper.text(), /rocket muffin/) // easier
  t.regex(wrapper.find('p').text(), /rocket muffin/)
})
