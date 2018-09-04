export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/login'
    }
  },  
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Error.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/components/auth/AuthLayout.vue`
    )
  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true, requiresAuth: true },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Dashboard.vue`
    )
  },
  {
    path: '/openregis',
    meta: { breadcrumb: true, requiresAuth: true },
    name: 'Openregister',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/components/sale/openregis.vue`
    )
  },
  {
    path: '/products',
    meta: { breadcrumb: true, requiresAuth: true },
    name: 'productcontrol',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/components/products/ProductLayout.vue`
    ),
    children: [
      {
        path: '/products/product',
        meta: { breadcrumb: true, requiresAuth: false, root: 'productcontrol', navigation: 'AppLocalToolbar' },
        name: 'product',
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/components/products/product.vue`,
        ),
        
      },
      {
        path: '/products/orderproduct',
        meta: { breadcrumb: true, requiresAuth: false, root: 'productcontrol', navigation: 'AppToolbar' },
        name: 'orderproduct',
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/components/products/orderproduct.vue`
        )
      }, 

      {
        path: '/products/orderproductsub',
        meta: { breadcrumb: true, root: 'productcontrol', requiresAuth: false, transitionName: 'slide', navigation: 'AppToolbar' },
        name: 'orderproductsub',
        component: () => import(
          /* webpackChunkName: "routes" */
          /* webpackMode: "lazy-once" */
          `@/components/products/orderproductsub.vue`
        )
      },
        
      
    ]
  },
  // { transitionName: 'slide'
  //   path: '/calendar',
  //   meta: { breadcrumb: true },
  //   name: 'Calendar',
  //   component: (a) => import(
  //     /* webpackChunkName: "routes" */
  //     /* webpackMode: "lazy-once" */
  //     `@/pages/Calendar.vue`
  //   )
  // },
  
];
