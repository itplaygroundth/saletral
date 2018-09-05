<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header" color="white lighten-1">
   
     <!-- <v-toolbar 
   color="white lighten-3"
  > -->
  <v-card width="100%">
      <v-card-actions>
    <v-breadcrumbs divider="-">
      <v-breadcrumbs-item>
      <v-icon large>home</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-for="(item,key) in breadcrumbs" :key="key">
      {{ item }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
   
      <v-menu :nudge-width="100" class="hidden-md-and-up" >
        <v-toolbar-title slot="activator">
         
          <v-icon>more_vert</v-icon>
        </v-toolbar-title>
        <v-list >
          <v-list-tile
            v-for="(it,key) in menubtn" :key="key" >
            <v-list-tile-title> {{ it | translate }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    <v-spacer></v-spacer>
    
    <v-toolbar-items class="hidden-md-and-down">
       <v-tabs
        slot="extension"
        v-model="tab"
        color="transparent"
      > 
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab v-for="(item,key) in menubtn" :key="key" @click.stop="gotoPage(item)">
         {{ item.name | translate }}
        </v-tab>
      </v-tabs>
      <!-- <v-btn flat 
      v-for="(item,key) in menubtn" :key="key" @click.stop="gotoPage(item)"
      > {{ item.name | translate }}</v-btn>
      -->
    </v-toolbar-items>
  <!-- </v-toolbar> -->
  </v-card-actions>
  </v-card>
  </v-layout> 
  
</template>

<script>
// import menu from '@/api/menu';
import router from '../router';
export default {
  props: {
    
  },
  data () {
    return {
      title: ''
    };
  },
  computed: {
    breadcrumbs: function () {
      let breadcrumbs = [];
      let menu = JSON.parse(JSON.stringify(this.$t('menu.submenu')));
      menu.forEach(item => {
       
        if (item.items) {
          let child =  item.items.find(i => {
          
            return i.link === this.$route.name;
          });
          
          if (child) {
            breadcrumbs.push(item.title);
            breadcrumbs.push(child.name);
            this.title = child.name;
          } else { 
             
            item.items.find(x => {
              let subchild = null;
              if (x.menu) {
                subchild = x.menu.find(u => {
             
                  return u.link === this.$route.name;
                });
              }
              if (subchild) {
                breadcrumbs.push(item.title);
                breadcrumbs.push(x.name);
                breadcrumbs.push(subchild.name);
                this.title = subchild.name;
              }
              return null;
            });
           
         
          }
           
        } else {
          if (item.link === this.$route.name) {
            
            this.title = item.title;
            breadcrumbs.push(item.title);
          } 

        }
      });
      if (breadcrumbs.length === 0) {
        this.title = 'Dashboard';
        breadcrumbs.push('Dashboard');
      }

      return breadcrumbs;
    },
    menubtn: function () {
      let menubtn = [];
      let menu = JSON.parse(JSON.stringify(this.$t('menu.submenu')));
       
      menu.forEach(item => {
       
        if (item.items) {
          let child = item.items.find(i => {
            

            // console.log(i.link, this.$route.meta.root);

            return (i.link === this.$route.name || i.link === this.$route.meta.root);
           
          
          });
           
          if (child) {
           
            if (child.menu) {
              
              child.menu.forEach(ch => {
                if (child.root === this.$route.root) {
                  menubtn.push(ch);
                }
              });
            }
          }
        }
      });
      return menubtn; // JSON.parse(JSON.stringify(child)).menu;
    },
    binding () {
      const binding = {};

      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;
      return binding;
    },
   
  },
  methods: {
    gotoPage (item) {
      
      router.name = item.name;
      router.push({ name: item.link });
    }
  }
};
</script>
