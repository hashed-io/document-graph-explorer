import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
// import QBUTTON from './demo/QBtn-demo.vue'
import pageIndex from 'src/pages/index.vue'
import * as All from 'quasar'
import VueRouter from 'vue-router'
import routes from 'src/router/routes.js'
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
localVue.use(Quasar, { components }, VueRouter)
// Importar router
const router = new VueRouter({ routes })
// Crear un Mock con la ruta a redirigir
const $route = {
  path: '/login'
}
// Se crea un mock para la función push [this,$router.push('/login')]
const mockRouter = {
  push: jest.fn()
}

const wrapper = mount(pageIndex, {
  localVue,

  mocks: {
    // Se crea un mock para las rutas
    $route,
    $router: mockRouter,
    // Mock para el $t('pages.general.example')
    $t: (msg) => msg
  },
  // Se coloca el router
  router,
  // Se crea un stub
  stubs: {
    RouterLink: RouterLinkStub
  }
})
describe('index testing', () => {
  it('contains the exactly words', () => {
    expect(wrapper.text()).toContain('We’ve created this tool is to allow you to upload a copy of the official DAO LLC form to a public smart contract and help you comply with the DAO LLC requirement of generating a smart contract identifier required in Step 6 -') // easier
  })
  it('redirect in press Login to Telos', async () => {
    // se busca el componente con referencia, se obtiene el elemento button, se ejecuta el evento @trigger
    await wrapper.findComponent({ ref: 'redirectButtonRef' }).get('button').trigger('click')
    // Se espera que se DOM refleje el cambio
    await wrapper.vm.$nextTick()
    const $route = {
      name: '/login'
    }
    expect(wrapper.vm.$route.path).toBe($route.name)
    // se confirma que en la función redirectTo de index.vue se invoca al router con '/login'
    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  })
})
