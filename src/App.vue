<template>
  <div id="appRoot">
    
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
         <keep-alive>
         <component :is="selectedComponent"></component>
         </keep-alive>
        
        <v-content>
          <!-- Page Header -->
          
          <page-header v-if="$route.meta.breadcrumb" style=""></page-header>
     
         
          <transition name="fade" mode="out-in">
            <router-view ></router-view>
          </transition>
           <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer">
            <span class="caption">Bl@cksheep &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <!-- <span class="caption mr-1"> Make With Love </span> <v-icon color="pink" small>favorite</v-icon> -->
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
        <v-btn small fab dark falt fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-navigation-drawer
          class="setting-drawer"
          temporary
          right
          v-model="rightDrawer"
          hide-overlay
          fixed
          >
          <theme-settings></theme-settings>
        </v-navigation-drawer>        
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon> 
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>    
  </div>
</template>
<script>
import AppDrawer from '@/components/AppDrawer';
import AppToolbar from '@/components/AppToolbar';
import AppLocalToolbar from '@/components/AppLocalToolbar';
import AppFab from '@/components/AppFab';
import PageHeader from '@/components/PageHeader';
// import menu from '@/api/menu';
import ThemeSettings from '@/components/ThemeSettings';
import AppEvents from  './event';
import axios from 'axios';
import store from './store';


export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppLocalToolbar,
    AppFab,
    PageHeader,
    ThemeSettings
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: '',
      color: '',
      

    },
    shown: true,
    componentList: [
      { label: 'bar', component: AppToolbar },
      { label: 'Header', component: AppLocalToolbar }
    ]
  }),

  computed: {
    selectedComponent: {
      get () {
        // this.selectedComponent = this.$store.getters['selectedComponent'];
        // console.log(this.$store.getters['selectedComponent']);
        return typeof this.$store.getters['selectedComponent'] !== 'undefined' ? this.$store.getters['selectedComponent'] : 'AppToolbar';
      },
      set () {
        // console.log(this.$store.getters['selectedComponent']);
        this.selectedComponent = this.$store.getters['selectedComponent'];
      }
     
    }
  },
  created () {
     
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    window.addEventListener('keydown', this.onkey);
    this.intercept();
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.onkey);
  },
  
  methods: {
    openThemeSettings () {
      this.$vuetify.goTo(0);
      this.rightDrawer = (!this.rightDrawer);
    },
    onkey (event) {
      
      this.$store.set('keypress', event);
      
    },
    intercept () {
      
      this.axios.interceptors.response.use((response) => { // intercept the global error
        return response;
      }, function (error) {
        if (typeof error.response !== 'undefined') {
          let originalRequest = error.config;
          if (error.response.status === 401 && !originalRequest._retry) {
            // console.log('intercepter:', error);
            // localStorage.setItem('token', null);
            window.getApp.$emit('APP_LOGOUT');
          }
        }
      });
    }
  }
};
    
// let originalRequest = error.config;
// if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
//   originalRequest._retry = true; // now it can be retried 
//   return this.$Vue.axios.post('/users/token', null).then((data) => {
//     this.$store.dispatch('auth'); 
//     this.$store.dispatch('auth', data.data);
//     originalRequest.headers['Authorization'] = 'Bearer ' + this.$store.state.token; // new header new token
//     return this.$Vue.axios(originalRequest); // retry the request that errored out
// }).catch((error) => {
//   for (let i = 0; i < error.response.data.errors.length; i++) {
//     if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
//       auth.logout();
//       return;
//     }
//   }
// });
// }
// if (error.response.status === 404 && !originalRequest._retry) {
//   originalRequest._retry = true;
//   window.location.href = '/';
//   return;
// }
// Do something with response error
// return Promise.reject(error);
// })
// }
// },
// };

</script>


<style lang="stylus" scoped>
  .setting-fab 
    top:50%!important; 
    right:0;
    border-radius:0  
  .page-wrapper
    min-height:calc(100vh - 64px - 50px - 81px );  

.sticky {
  position: fixed;
  top: 0;
  width: 100%
}

.sticky + .content {
  padding-top: 102px;
}
</style>
