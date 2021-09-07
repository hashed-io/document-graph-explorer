const routes = [
  { path: '/', component: () => import('pages/index.vue'), meta: { layout: 'empty', guest: true } },
  { path: '/login', component: () => import('pages/login/login.vue'), meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/home', component: () => import('pages/home/home.vue'), name: 'home' },
  { path: '/registerDao', component: () => import('pages/dao/add/daoForm.vue'), name: 'registerdao' },
  { path: '/dashboard', component: () => import('pages/dao/daos.vue'), name: 'daos' },
  { path: '/manageContract', component: () => import('pages/dao/manage/manageContract.vue'), name: 'manageContracts' },
  { path: '/ipfs', component: () => import('pages/ipfs/ipfs.vue'), name: 'ipfs' }
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
