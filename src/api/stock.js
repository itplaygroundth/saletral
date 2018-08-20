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
   
    return Axios.get(`${config.API_URL}items`).then(this.handleResponse);
  },
  getItem (val) {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader(),
      
    };
   
    return Axios.get(`${config.API_URL}item/${val}`).then(this.handleResponse);
  },
  getCount () {
    const requestOptions = {
      method: 'GET',
      headers: login.getAuthHeader()
    };
    
    return Axios.get(`${config.API_URL}item/count`).then(this.handleResponse);
  },
  insertItem (data) {
    const requestOptions = {
      method: 'POST',
      headers: login.getAuthHeader(),
     
    };
    console.log(data);
    return Axios.post(`${config.API_URL}item`, data).then(this.handleResponse);
  },
  updateItem (data) {
    const requestOptions = {
      method: 'PUT',
      headers: login.getAuthHeader(),
    };
    
    return Axios.put(`${config.API_URL}item`, data).then(this.handleResponse);
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
};