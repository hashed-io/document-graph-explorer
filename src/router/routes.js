const routes = [
  { path: '/', component: () => import('pages/index.vue'), meta: { layout: 'empty', guest: true } },
  { path: '/login', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/registerDao', component: () => import('pages/dao/form/daoForm.vue'), name: 'daoForm' },
  { path: '/home', component: () => import('pages/dao/daos.vue'), name: 'daos' },
  { path: '/manageContract', component: () => import('pages/dao/manage/manageContract.vue'), name: 'manageContract' }
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
