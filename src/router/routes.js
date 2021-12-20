const routes = [
  // Root page [Table of docs]
  { path: '/', component: () => import('~/pages/document-graph-explorer/ListDocs/ListDocs.vue'), name: 'listDocs', meta: { guest: true } },
  // Login page [Anchor button & create account]
  { path: '/login', component: () => import('pages/login/login.vue'), name: 'login', meta: { layout: 'guest', title: 'pages.login.title', guest: true } },
  // Timeline example
  { path: '/timeline', component: () => import('~/pages/timeline/timeline-page'), name: 'timeline-page', meta: { guest: true } },
  // Page to render all the data of the document [contains the edit button, erase and extend]
  { path: '/explore', component: () => import('~/pages/document-graph-explorer/explorer/explorerView'), name: 'DocumentExplorer', meta: { guest: true } },
  // Page to edit document [contains the buttons to edit]
  { path: '/edit', component: () => import('~/pages/document-graph-explorer/edit/editView.vue'), name: 'editDoc', meta: { guest: true } },
  // Page to extend, blank page to fill the document data
  { path: '/extend', component: () => import('~/pages/document-graph-explorer/extend/extendView.vue'), name: 'extendDoc', meta: { guest: true } }
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
