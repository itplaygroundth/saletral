import config from './config.js';
import login from './login';
import Axios from '../../node_modules/axios';
const AUTH_TOKEN = `${localStorage.getItem('token')}`;
Axios.defaults.headers.common = { 'Authorization': 'bearer ' + AUTH_TOKEN };

// Axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;

const self = this;

export default {
  url: 
    config.API_URL,
  img_url:
    config.IMG_URL,
  
  getAll (val) {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader(),
      
    };
    console.log(Axios.defaults.headers.common);
    return Axios.get(`${login.API_URL}item`, requestOptions).then(this.handleResponse);
  },
  getItem (val) {
    const requestOptions = {
      headers: login.getAuthHeader(),
      method: 'GET'
    };
      
    let url = `${config.API_URL}item/${val}`;
    
    const result = Axios.get(url, requestOptions)
      .then(response => {
        return Promise.resolve(response.data);
      }).catch(err => {
        console.log(err);
      });
    return result;
       
  },
  getAItem () {
    const requestOptions = {
      headers: login.getAuthHeader(),
      method: 'GET'
    };
      
    let url = `${config.API_URL}item`;
    console.log(AUTH_TOKEN);
    const result = Axios.get(url, requestOptions)
      .then(response => {
        return Promise.resolve(response.data);
      }).catch(err => {
        console.log(err);
      });
    return result;
       
  },
  getCount () {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader()
    };
    
    return Axios.get(`${config.API_URL}item/count`, requestOptions).then(this.handleResponse);
  },
  insertItem (data) {
    const requestOptions = {
      method: 'POST',
      headers: login.getAuthHeader(),
      data: data
     
    };
   
    return Axios.post(`${config.API_URL}item`, requestOptions).then(this.handleResponse);
  },
  updateItem (data) {
    const requestOptions = {
      method: 'PUT',
      headers: login.getAuthHeader(),
      data: data
    };
    
    return Axios.put(`${config.API_URL}item`, requestOptions).then(this.handleResponse);
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
    // Axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
    // console.log(`${localStorage.getItem('token')}`);
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      
    };
  }
};