import config from './config.js';
import login from './login';
import Axios from '../../node_modules/axios';

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
    // console.log(`${login.API_URL}item`);
    return Axios.get(`${login.API_URL}item`, requestOptions).then(this.handleResponse);
  },
  getItem (val) {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader(),
      
    };
    
    let url = val === '' ? `${config.API_URL}item` : `${config.API_URL}item/${val}`;

    Axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;

    return Axios.get(url).then(this.handleResponse);
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
      'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
      'Access-Control-Max-Age': '1728000',
      
    };
  }
};