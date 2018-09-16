<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
     <multiselect v-model="value" label="title" :options="items" 
     :custom-label="customLabel" 
     :show-labels="false" 
     :resetAfter="true" 
     :multiple="false" 
     :searchable="true" 
     :loading="loading" 
     :internal-search="false" 
     :clear-on-select="true" 
     :close-on-select="true" 
     :options-limit="10" 
     :max-height="400" 
     :show-no-results="false" 
     :hide-selected="true" 
     @search-change="initialize" 
     :placeholder="slabel"
     group-values="data" group-label="categorys"
      class="hidden-md-and-down"
     >
          <template slot="option" slot-scope="props">
         <v-flex xs12 sm6 md6><img class="option__image" :src="loadpic(props.option.picfilename1)" ></v-flex>
         <v-flex xs12 sm6 md6>{{ props.option.code }}</v-flex>
        <v-flex xs12 sm6 md6>{{ props.option.name1 }}</v-flex>
       </template>
  </multiselect>
      <v-spacer></v-spacer>
     <v-menu offset-y origin="left center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
       <v-btn icon flat slot="activator">
         <v-icon>language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(option, id) in options"
            :key="id"
            @click="setLanguage(option.code)"
          ><span style="width:20px"></span>
          <v-list-tile-action>
          <span class="flag-icon flag-icon-large" :class="flagIconClass(option.flag)"></span>
          </v-list-tile-action>
            <v-list-tile-content> {{ `language.${option.name}` | translate }} </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/static/avatar/man_4.jpg" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in menuitems" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>

<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
import { get, sync, call } from 'vuex-pathify';
import ap from './../api/stock';
import store from './../store';
import Multiselect from 'vue-multiselect';
import { nest, grouping } from './../api/nest';



export default {
  name: 'app-toolbar',
  components: {
    NotificationList,
    Multiselect
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          code: 'th',
          flag: 'th',
          name: 'thai'
        },
        {
          code: 'en',
          flag: 'gb',
          name: 'english'
        }]
       
    }
  },
  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: {},
    model: null,
    filter: '',
    menuitems: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          // logout().then(
          // auth.logout();
          // window.getApp.$emit('APP_LOGOUT');
          // this.logout();
          store.dispatch('logOUT');
        }
      },
    ],
    value: null,
    moptions: []
    
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
    globalsearch: {
      get () {
       
        return this.$store.getters['globalsearch'];
      },
      set (key) {
        this.$store.set('globalsearch', key);
      }
    },
    slabel () {
    
      return this.$t('label.toolbar.search');
      
    }
  },
  watch: {
    value () {
      // console.log(this.vaule);
      this.selecteditem(this.value);
      return this.value;
      
    }
  },
  created () {
    // this.initialize();
  },
  methods: {
    initialize (query) {
      this.loading = true;
      // console.log('step1');
      this.getItem(query).then(data => {
        if (typeof data !== 'undefined') this.items = [{ 'category': 'stock', data }];
        // console.log(this.items);
      });
      this.loading = false;
    },
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    setLanguage (locale) {
      this.$i18n.set(locale);
      this.$emit('change-locale:locale', this.$i18n.set(locale));
    },
    currentLanguage () {
      return this.$i18n.locale() === 'en' ? 'gb' : this.$i18n.locale();
    },
    flagIconClass (code) {
      return `flag-icon  flag-icon-${code}`;
    },
    logout () { 

      get('logOUT', this.users);
    },
    searchDataFromApi (val) {

      this.loading = true;
      return new Promise((resolve, reject) => {
        
        this.getItem(val).then(rows => {

          let items = this.items = { 'category': 'stock', rows };
          // console.log(items);
          const total = typeof items === 'undefined' ? 0 : items.length;
       
        
          // console.log(items);
          setTimeout(() => {
            this.loading = false;
            resolve({
              items,
              total
            });
          }, 100);
        });
       
      });
    },
    getItem (val) {
       
      return ap.getItem(val).then(res => {
        
        let _items = JSON.parse(JSON.stringify(res.data));
        return _items;
      }).catch(err => {
        let error = err; // console.log(err);
      });
        
    },
    customLabel ({ code, name1 }) {
      
      return `${code} – ${name1}`;
    },
    selecteditem (val) {
      // console.log(this.$store.getters['itemselected']);
      if (this.$store.getters['itemselected'] == null) { 
        this.$store.set('itemselected', val);
        // this.$store.set('itemselected', '');
      } else {
        this.$store.set('itemselected', '');
        this.$store.set('itemselected', val);
      }

      
      
    },
    loadpic (src) {
      if (typeof src !== 'undefined' && src !== null) return null; else return `${ap.url}images/${src}`;
     
    }
  }
};
</script>
<style lang="stylus" scoped>
  @import("https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css")
 .multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 50%;
    min-height: 40px;
    text-align: left;
    color: #35495e;
}
 .flag-icon-large {
      width: 31px;
      height: 23px;
    }

    .flag-icon-small {
      min-width: 22px;
      height: 17px;
    }

</style>
