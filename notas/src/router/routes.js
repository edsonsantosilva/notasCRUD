const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/novanota', name: 'NewNote', component: () => import('pages/NovaNota.vue')},
      { path: '/validadedate', name: 'ValidateDate', component: () => import('pages/ValidateDate')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
