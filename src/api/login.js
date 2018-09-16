import Router from '../router';
import Axios from '../../node_modules/axios';
const bcrypt = require('bcryptjs');

const API_URL = 'https://vps434.vpshispeed.net/sapi/';
const LOGIN_URL = API_URL + 'getdb/';
// const AUTH_TOKEN = `${sessionStorage.getItem('token')}`;
// Axios.defaults.headers.common = { 'Authorization': 'bearer ' + AUTH_TOKEN };
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// const SIGNUP_URL = API_URL + 'register/'

// export const userService = {
//   login,
//   logout,
//   register,
//   getAll,
//   getById,
//   update,
//   delete: _delete
// };


export default {
  user: {
    authenticated: false
  },
  //   login (context, creds, redirect, txt) {
  //     this.$store.dispatch('login', {
  //       creds
  //     }).then(() => {
  //       Router.push(redirect);
  //     });
  //   },
  //   logout () {
  //     localStorage.removeItem('id_token');
  //     localStorage.removeItem('access_token');
  //     this.user.authenticated = false;
  //   },
  //   checkAuth () {
  //     const jwt = localStorage.getItem('id_token');
  //     if (jwt) {
  //       this.user.authenticated = true;
  //     } else {
  //       this.user.authenticated = false;
  //     }
  //   },
  //   // The object to be passed as a header for authenticated requests
 


  login (creds) {
     
     
    const requestOptions = {
      headers: this.getAuthHeader(),
      body: {
        username: creds.user, 
        password: creds.password // bcrypt.hashSync(creds.password, 8) 
      }
    };
    // console.log(JSON.stringify({ username: creds.user, password: creds.password }));
    //  console.log(LOGIN_URL);
  
    return Axios.post(LOGIN_URL, requestOptions)
      .then(this.handleResponse)
      .then(user => {
        
        // login successful if there's a jwt token in the response

        if (user.token) {
          // console.log(user.token);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('token', JSON.stringify(user.token));
        }

        return user;
      });
  }, logout () {
  // remove user from local storage to log user out
    localStorage.setItem('token', null);
    
  }, register (user) {
    const requestOptions = {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(user)
    };

    return Axios.post(`${API_URL}users/register`, requestOptions).then(this.handleResponse);
  },
  getAll () {
    const requestOptions = {
      method: 'GET',
      headers: this.getAuthHeader()
    };

    return Axios.get(`${API_URL}/users`, requestOptions).then(this.handleResponse);
  },
  getById (id) {
    const requestOptions = {
      method: 'GET',
      headers: this.getAuthHeader()

    };

    return Axios.get(`${API_URL}/users/${id}`, requestOptions).then(this.handleResponse);

    
  },
    

  update (user) {
    const requestOptions = {
      method: 'PUT',
      headers: { ...this.getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    return Axios.put(`${API_URL}/users/${user.id}`, requestOptions).then(this.handleResponse);
  },

  // premxed function name with underscore because delete is a reserved word in javascript
  _delete (id) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.getAuthHeader()
    };

    return Axios.delete(`${API_URL}/users/${id}`, requestOptions).then(this.handleResponse);
  },
  handleResponse (response) {
    
   
    const data = response.data;
    
    if (!response.data) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        localStorage.removeItem('user');
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    
    return data;
  },
  getAuthHeader () {
    // console.log(`${localStorage.getItem('token')}`);
    return {
      'Authorization': `bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
      'Access-Control-Max-Age': '1728000',
      
    };
  }
};