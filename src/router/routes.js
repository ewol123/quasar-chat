
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "Video chat", meta: {icon: "fas fa-video"},  component: () => import('pages/Index.vue') },
      { path: '/messages', name: "Messages", meta: {icon: "fas fa-comments"},  component: () => import('pages/Messages.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
