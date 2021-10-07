const routes = [
  { path: '/', component: () => import('pages/index.vue'), meta: { layout: 'empty', guest: true } },
  { path: '/daoPage/:daoName', component: () => import('src/pages/dao/manage/manageContract.vue'), name: 'manageContract', meta: { guest: true } },
  { path: '/login', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/home', component: () => import('pages/dao/daos.vue'), name: 'daos' },
  { path: '/manageContract', component: () => import('src/pages/dao/manage/manageContract.vue'), name: 'manageContract' },
  { path: '/registerDao', component: () => import('src/pages/dao/form/daoForm.vue'), name: 'daoForm' }
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
