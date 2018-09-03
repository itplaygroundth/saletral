// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// app.js
import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import axios from 'axios';

import VueAxios from 'vue-axios';

import App from './App';
import store from './store';
import router from './router';
import Vuetify from 'vuetify';
import VueSticky from 'vue-sticky'; // Es6 module

import './i18n';
import VueSweetalert2 from 'vue-sweetalert2';
import 'font-awesome/css/font-awesome.css';  
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';
import 'flag-icon-css/css/flag-icon.css';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';


// import VueAutonumeric from '../src/components/VueAutonumberic';

Vue.use(VueAxios, axios);


Vue.config.productionTip = false;
// Helpers
// Global filters
Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
// Vue.use(VueAxios);

// Vue.use(axios);
// Vue.use(MaskedInput);
Vue.use(VueSweetalert2);
 
Vue.use(Vuetify, {
  
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Bootstrap application components
// const VueSticky = VueSticky.default; // Global variable
Vue.use(VueMoment, {
  moment,
});
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});