import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import store from './../store';
import 'nprogress/nprogress.css';
// import { get } from '../../node_modules/vuex-pathify';


Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});


// router gards
router.beforeEach((to, from, next) => {

  let requireAuthen = to.matched.some(record => record.meta.requiresAuth);
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  // console.log(requireAuthen, token, to.path);
  if (requireAuthen && token === null) {
  //  console.log('go login');
    next('Login');
  } else if (!requireAuthen && token !== null) { 
    next();
  }
  else { 
    next();
  }
  store.dispatch('setComponent', to.meta.navigation);
  // .getItem('token'));
  // console.log(localStorage.getItem('token'));
  // console.log(to.meta.navigation);
  // this.$store.dispatch('selectComponent', this.users);
  // console.log(localStorage.getItem('token'), to.path); 
  // if (localStorage.getItem('token') === null && to.path !== '/login') { // .getItem('token')) {
    
  //   next({
  //     path: '/login',
  //     query: {
  //       redirect: '/login',
  //     },
  //   });
    
  // } else {
  //   store.dispatch('setComponent', to.meta.navigation);
  //   console.log(to);
  //   // console.log(store.getters['selectedComponent']);
  //   next(to.fullPath);
  // }
  
  //   else {
  //   store.dispatch('setComponent', to.meta.navigation);
  //   // console.log(store.getters['selectedComponent']);
  //   console.log(to.fullPath);
  //   next(to.fullPath);
  // }
});
//   // NProgress.start();
//   // next();
//   const publicPages = ['/login', '/register', '/dashboard'];
//   const authRequired = !publicPages.includes(to.path);
   
//   const loggedIn = store.get('isLoggedIn');
//   console.log(loggedIn);
//   if (!loggedIn) {
   
//     return next('/login');
//   }

//   next();
// });

router.afterEach((to, from) => {
  // ...
  // NProgress.done();
});

export default router;
