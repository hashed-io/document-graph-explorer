const routes = [
  { path: '/', component: () => import('~/pages/document-graph-explorer/ListDocs/ListDocs.vue'), name: 'listDocs', meta: { guest: true } },
  { path: '/login', component: () => import('pages/login/login.vue'), name: 'login', meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  { path: '/timeline', component: () => import('~/pages/timeline/timeline-page'), name: 'timeline-page', meta: { guest: true } },
  { path: '/explore', component: () => import('~/pages/document-graph-explorer/explorer/explorerView'), name: 'DocumentExplorer', meta: { guest: true } },
  { path: '/edit', component: () => import('~/pages/document-graph-explorer/edit/editView.vue'), name: 'editDoc', meta: { guest: true } },
  { path: '/extend', component: () => import('~/pages/document-graph-explorer/extend/extendView.vue'), name: 'extendDoc', meta: { guest: true } },
  { path: '/erase', component: () => import('~/pages/document-graph-explorer/erase/eraseView.vue'), name: 'eraseDoc', meta: { guest: true } }
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
