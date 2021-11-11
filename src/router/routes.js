const routes = [
  { path: '/', component: () => import('pages/index.vue'), meta: { guest: true } },
  { path: '/daoPage/:daoName', component: () => import('src/pages/dao/manage/manageContract.vue'), name: 'daoPage', meta: { guest: true } },
  { path: '/manageContract', component: () => import('src/pages/dao/manage/manageContract.vue'), name: 'manageContract' },
  { path: '/login', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/home', component: () => import('pages/dao/daos.vue'), name: 'daos' },
  { path: '/manageDHO', component: () => import('src/pages/dao/manageGeneral/manageContractGeneral.vue'), name: 'manageContractGeneral' },
  { path: '/dhoPage/:dhoName', component: () => import('src/pages/dao/manageGeneral/manageContractGeneral.vue'), name: 'dhoPage', meta: { guest: true } },
  { path: '/registerDao', component: () => import('src/pages/dao/form/daoForm.vue'), name: 'daoForm' },
  // { path: '/daos', component: () => import('~/pages/dao/listDaos/all-daos-list'), name: 'all-daos' },
  { path: '/order-book', component: () => import('~/pages/order-book/order-book'), name: 'order-book', meta: { guest: true } },
  { path: '/registerDaoSimple', component: () => import('src/pages/dao/form/daoFormSimple.vue'), name: 'daoFormSimple' },
  { path: '/daos', component: () => import('~/pages/dao/listDaos/all-daos-list'), name: 'all-daos', meta: { guest: true } },
  { path: '/timeline', component: () => import('~/pages/timeline/timeline-page'), name: 'timeline-page', meta: { guest: true } },
  { path: '/explore', component: () => import('~/pages/document-graph-explorer/explorer/documentExplorer'), name: 'DocumentExplorer', meta: { guest: true } },
  { path: '/apollo', component: () => import('~/pages/apollo/apollo'), name: 'apollo', meta: { guest: true } },
  { path: '/list-docs', component: () => import('~/pages/document-graph-explorer/ListDocs/ListDocs.vue'), name: 'listDocs', meta: { guest: true } },
  { path: '/edit', component: () => import('~/pages/document-graph-explorer/edit/documentExplorer.vue'), name: 'editDoc', meta: { guest: true } }
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
