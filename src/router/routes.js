const routes = [
  { path: '/', component: () => import('pages/index.vue'), meta: { layout: 'empty', guest: true } },
  { path: '/daoPage/:daoName', component: () => import('src/pages/dao/manage/manageContract.vue'), name: 'daoPage', meta: { guest: true } },
  { path: '/login', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/home', component: () => import('pages/dao/daos.vue'), name: 'daos' },
  { path: '/manageContract', component: () => import('src/pages/dao/manage/manageContract.vue'), name: 'manageContract' },
  { path: '/registerDao', component: () => import('src/pages/dao/form/daoForm.vue'), name: 'daoForm' },
  // { path: '/daos', component: () => import('~/pages/dao/listDaos/all-daos-list'), name: 'all-daos' },
  { path: '/order-book', component: () => import('~/pages/order-book/order-book'), name: 'order-book' },
  { path: '/registerDaoSimple', component: () => import('src/pages/dao/form/daoFormSimple.vue'), name: 'daoFormSimple' },
  { path: '/daos', component: () => import('~/pages/dao/listDaos/all-daos-list'), name: 'all-daos', meta: { guest: true } }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue'),
    meta: { layout: 'empty' }
  })
}

export default routes
