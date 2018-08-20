
import * as types from '../mutation-types';
import auth from '../../api/login';
import { make } from 'vuex-pathify';
import Route from '../../router';
import swal from 'sweetalert2';
// import VueSweetalert2 from '../../../node_modules/vue-sweetalert2';

const state = {
  keypress: '',
  token: !!localStorage.getItem('token'),
  authstatus: '',
  userslogin: '',
  orderproduct: {
    docdate: sessionStorage.getItem('docdate'),
    duedate: sessionStorage.getItem('duedate'),
    docno: sessionStorage.getItem('docno'),
    apcode: sessionStorage.getItem('apcode'),
    apname: sessionStorage.getItem('apname'),
  },
  globalsearch: ''
  
 
  
};
const mutations = make.mutations(state);
const actions = { 
  ...make.actions(state),
  logIN ({ commit, dispatch }, creds) {
    return new Promise((resolve, reject) => {
      auth.login(creds).then(
        res => {
         
          this.set('authstatus', true)
            .then(this.set('userslogin', creds.username))
            .then(this.set('token', localStorage.getItem('token')))
            .then(
              // console.log('token', localStorage.getItem('token')),
              Route.push('Dashboard')
            );
          resolve(res);
        }).catch(err => {
        let timerInterval;
        swal({
          type: 'error',
          title: 'Danger...',
          text: err,
          timer: 2000,
          onOpen: () => {
            swal.showLoading();
            timerInterval = setInterval(() => {
              // swal.getContent().querySelector('strong')
              //   .textContent = swal.getTimerLeft();
            }, 100);
          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (
          // Read more about handling dismissals
            result.dismiss === swal.DismissReason.timer
          ) {
            // console.log('I was closed by the timer');
          }
        });
        localStorage.removeItem('token'); 
        // location.reload();// if the request fails, remove any possible user token if possible
        reject(err);
      });
    });
  },
  logOUT ({ commit, dispatch }) {
  //  console.log();
    
    this.set('userslogin', '')
      .then(localStorage.removeItem('token'))
      .then(this.set('authstatus'), false)
      .then(this.set('token', false)
        .then(window.getApp.$emit('APP_LOGOUT')));
  },
  saveOrderproduct ({ commit, dispatch }, form) {
    
     
    return new Promise((resolve, reject) => {
      let menu =  JSON.parse(JSON.stringify(form));
      menu.forEach(element => {
        
        this.set('orderproduct@docno', element.docno);
        sessionStorage.setItem('docno', element.docno);
        this.set('orderproduct@docdate', element.docdate);
        sessionStorage.setItem('docdate', element.docdate);
        this.set('orderproduct@apcode', element.apcode);
        sessionStorage.setItem('apcode', element.apcode);
        this.set('orderproduct@apname', element.apname);
        sessionStorage.setItem('apname', element.apname);
        this.set('orderproduct@duedate', element.duedate)
          .then(res => {
            sessionStorage.setItem('duedate', element.duedate);
          }).catch(err => {
            reject(err);
          });
      });
    });
  },
  

};
const getters = 
{
  ...make.getters(state),
  getKeypress () {
    return typeof this !== 'undefined' ? this.state.keypress : null;
  }
};
// const state = {
//   sidebar: {
//     opened: false,
//     withoutAnimation: false
//   },
//   config: {
//     googleMaps: {
//       apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
//     },
//     windowMatchSizeLg: '(min-width: 992px)',
//     palette: {
//       primary: '#4ae387',
//       danger: '#e34a4a',
//       info: '#4ab2e3',
//       success: '#db76df',
//       warning: '#f7cc36',
//       white: '#fff',
//       black: '#000',
//       fontColor: '#34495e',
//       transparent: 'transparent',
//       lighterGray: '#ddd'
//     }
//   },
//   authen: {
//     isLoggedIn: !!localStorage.getItem('id_token'),
//     logout: false,
//     status: false,
//     loginRequest: '',
//     loginSucess: false
//   },
  
 
// };
// const mutations = make.mutations(state); 
// const actions =  make.actions('authen');
//   login ({ dispatch }, users) {
//     console.log(users);
//     dispatch('loginRequest', users.user);
    
//   },
 
// };
// const getters = {
// make all getters (optional)
// ...make.getters(state),
// };
// const mutations = {
//   [types.CLOSE_MENU] (state) {
//     if (document.documentElement.clientWidth < 992) {
//       state.sidebar.opened = false;
//     }
//   },
//   [types.TOGGLE_SIDEBAR] (state, opened) {
//     state.sidebar.opened = opened;
//   },
//   [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
//     state.sidebar.withoutAnimation = value;
//   },
//   setLoading (state, isLoading) {
//     state.isLoading = isLoading;
//   },
//   [types.LOGIN] (state) {
//     state.pending = true;
//   },
//   [types.LOGIN_SUCCESS] (state, user) {
//     state.isLoggedIn = true;
//     state.pending = false;
//     state.status = { loggedIn: true };
//     state.user = user;
//   },
//   [types.LOGOUT] (state) {
//     state.isLoggedIn = false;
//   },
//   [types.loginFailure] (state, user) {
//     state.status = { };
//     state.user = null;
//   }, 
// };

// const actions = {
//   closeMenu ({ commit }) {
//     commit(types.CLOSE_MENU);
//   },
//   toggleSidebar ({ commit }, opened) {
//     commit(types.TOGGLE_SIDEBAR, opened);
//   },
//   isToggleWithoutAnimation ({ commit }, value) {
//     commit(types.TOGGLE_WITHOUT_ANIMATION, value);
//   },
//   login ({ commit }, creds) {
//     commit(types.LOGIN); 
//     auth.login(creds)
//       .then(
//         user => {
//           commit('loginSuccess', user);
//           Route.push('/');
//         },
//         error => {
//           commit('loginFailure', error);
         
//         }
//       );
//   },
//   logout ({ commit }) {
//     sessionStorage.removeItem('token');
//     commit(types.LOGOUT);
//   }
// };

export default {
  state,
  mutations,
  actions,
  getters
};
