import axios from 'axios';
import config from './config.js';

const instance = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  params: {} // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(function (config) {
  alert('test');

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;
// export default {

    
// Vue.axios.interceptors.response.use((response) => { // intercept the global error
//     return response
//   }, function (error) {
//     let originalRequest = error.config
//     if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
//       originalRequest._retry = true // now it can be retried 
//       return Vue.axios.post('/users/token', null).then((data) => {
//         store.dispatch('authfalse') 
//         store.dispatch('authtruth', data.data)
//         originalRequest.headers['Authorization'] = 'Bearer ' + store.state.token // new header new token
//         return Vue.axios(originalRequest) // retry the request that errored out
//       }).catch((error) => {
//         for (let i = 0; i < error.response.data.errors.length; i++) {
//           if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
//             auth.logout()
//             return
//           }
//         }
//       })
//     }
//     if (error.response.status === 404 && !originalRequest._retry) {
//       originalRequest._retry = true
//       window.location.href = '/'
//       return
//     }
//     // Do something with response error
//     return Promise.reject(error)
//   })
// }