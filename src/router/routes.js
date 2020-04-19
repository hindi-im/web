
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/auth/Register')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/auth/Login')
      },
      {
        path: '/account',
        meta: { auth: true },
        name: 'account',
        component: () => import('pages/auth/account/Home')
      },
      {
        path: '/create',
        meta: { auth: false },
        name: 'create',
        component: () => import('pages/room/create')
      },
      {
        path: '/join',
        meta: { auth: true },
        name: 'join',
        component: () => import('pages/auth/account/Home')
      },
      {
        path: '/admin',
        meta: { auth: ['administrator'] },
        name: 'admin',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'home',
            name: 'adminHome',
            component: () => import('pages/auth/admin/Home')
          }
        ]
      },
      {
        path: '/superuser',
        meta: { auth: ['superuser'] },
        name: 'superuser',
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'users',
            name: 'superuserUsers',
            component: () => import('pages/auth/superuser/Users')
          }
        ]
      }
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
