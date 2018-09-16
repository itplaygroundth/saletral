<template>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 md6>
           
            <v-toolbar dense>
               <v-toolbar-side-icon></v-toolbar-side-icon>
            
                <v-toolbar-title class="body-2" >{{ $t("label.orderproduct.docno1")+":" }}</v-toolbar-title>
                <span style="width:20px"></span>
                 <label class="body-2">{{ docno }} </label>
                <v-spacer></v-spacer>
                 <v-toolbar-title>

          <v-spacer></v-spacer>
      <v-btn
        color="indigo lighten-3"
        
        small
        @click="goback"
      >
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
                 </v-toolbar-title>
            </v-toolbar>
           
        </v-flex>
        <v-flex>
         <template>
          <div>
            <v-data-table
              :headers="headers(true)"
              :items="items"
            >
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.index+1 }}</td>
                <td class="text-xs-left">{{ props.item.code }}</td>
                <td class="text-xs-left">{{ props.item.name1 }}</td>
                <td class="text-xs-right">
                  <v-edit-dialog
                    :return-value.sync="props.item.qty"
                    large
                    lazy
                    persistent
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    <div>{{ props.item.qty }}</div>
                    <div slot="input" class="mt-3 title">Update Qty</div>
                    <v-text-field
                      slot="input"
                      v-model="props.item.qty"
                      :rules="[max25chars]"
                      label="Edit"
                      single-line
                      counter
                      autofocus
                    ></v-text-field>
                  </v-edit-dialog>
                </td>
                <td class="text-xs-left">{{ props.item.unitcode }}</td>
                 <td class="text-xs-right">
                    <v-edit-dialog
                    :return-value.sync="props.item.price"
                    large
                    lazy
                    persistent
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    <div>{{ props.item.price }}</div>
                    <div slot="input" class="mt-3 title">Update Price</div>
                    <v-text-field
                      slot="input"
                      v-model="props.item.price"
                      :rules="[max25chars]"
                      label="Edit"
                      single-line
                      counter
                      autofocus
                    ></v-text-field>
                  </v-edit-dialog>
                 <td class="text-xs-left">{{ props.item.discountword }}</td>
                 <td class="text-xs-right">{{ props.item.price*props.item.qty }}</td>
                 <td> <v-icon
                    small
                    @click="deleteItem(props.item)"
                  >
                    delete
                </v-icon></td>
                 
              </template>
              <!-- <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
              </template> -->
            </v-data-table>

            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
              {{ snackText }}
              <v-btn flat @click="snack = false">Close</v-btn>
            </v-snackbar>
          </div>
        </template>
        </v-flex>
      </v-layout>
      <v-layout>
       <div class="pl-4 pt-1 pb-4">
        <v-btn @click="submit" color="success">{{ $t("button.save") }}</v-btn>
        <v-btn @click="reset" color="warning">{{ $t("button.cancel") }}</v-btn>
      </div>
      </v-layout>
    </v-container>
  
</template>

<script>
import router from '../../router';
export default {

  name: 'orderpsub-app',
  props: {
    
  },
  data: () => ({
    snack: false,
    snackColor: '',
    snackText: '',
    max25chars: (v) => v.length <= 25 || 'Input too long!',
    pagination: {},
    docno: '',
    isEditing: null,
    items: []
  }),
  computed: {
    headback: {
      get () {
        return this.$store.getters['headback'];
      },
      set (key) {
        this.$store.set('headback', key);
      }
    },
    globalsearch: {
      get () {
       
        return this.$store.getters['globalsearch'];
      }
      // ,
      // set (val) {
      //   this.$store.set('globalsearch', val);
      // } 
    },
    itemselected: {
      get () {
        // this.items.push(this.$store.getters['itemselected']);
        
        return this.$store.getters['itemselected'];
      } 
    },
    
  },
  
  watch: {
    headback () {
      return this.$store.getters['headback'];
    },
    itemselected () {
      // console.log(this.items);
      // console.log(this.$store.getters['itemselected']);
      let _item = this.$store.getters['itemselected'];
      // console.log(_item);
      // this.items.reduce((total, item) => total + item.data.reduce((a, b) => a + b), 0);
      
      if (this.items.length > 0) { 
        let itemarray = Object.values(this.items);
        let _found =  itemarray.find((data) => { return data.code === _item.code });
        if (_found) _found.qty += 1; // reduce((prev, cur) => prev.qty + 1, 0);
        else this.items.push({ code: _item.code, name1: _item.name1, unitcode: _item.unitcode, qty: 1, price: 0, discountword: '', amount: _item.price });
      } else {
        this.items.push({ code: _item.code, name1: _item.name1, unitcode: _item.unitcode, qty: 1, price: 0, discountword: '', amount: _item.price });
      }
      // this.items.push(this.$store.getters['itemselected']);
      localStorage.setItem('items', JSON.stringify(this.items));
      sessionStorage.setItem('items', JSON.stringify(this.items));
      // console.log(this.items);
      // console.log(this.$store.getters['itemselected']);
      
    },
    globalsearch () 
    {
      
      // this.search = this.globalsearch;
      this.searchDataFromApi(this.globalsearch)
        .then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });

    },
    items () 
    {
      localStorage.setItem('items', JSON.stringify(this.items));
      sessionStorage.setItem('items', JSON.stringify(this.items));
    }
    
 
  },
  created () {
    this.docno = this.$store.getters['orderproduct'].docno;
    // console.log(localStorage.getItem('items'));

    this.items = JSON.parse(localStorage.getItem('items')).length === 0 ? JSON.parse(sessionStorage.getItem('items')) : JSON.parse(localStorage.getItem('items'));
  },
  mounted () {
    this.headback = this.$store.getters['headback'];
  },
  methods: {
    goback () {
      this.isEditing = !this.isEditing;
      this.$store.set('headback', true);
      this.gotoPage('orderproduct');
    },
    gotoPage (item) {
      // console.log(`${this.$route.name}/${item}`);
      router.name = item;
      router.push({ name: `${item}` });
    },
    headers (show) {
      // 
      let head = JSON.parse(JSON.stringify(this.$t('label.orderproduct.headers')));
      if (show) {
        head = JSON.parse(JSON.stringify(this.$t('label.orderproduct.headers'))).filter(element => {
          // console.log(element);
          return element.show === true;
        });
      }  
      // console.log(head);
      return head;// JSON.parse(JSON.stringify(this.$t('label.product.headers')));
    },
    submit () {
      this.snack = true;
    },
    save () {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Data saved';
    },
    cancel () {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    reset () {
      this.items = [];
      localStorage.setItem('items', []);
      sessionStorage.setItem('items', []);
      // this.items = JSON.parse(localStorage.getItem('items'));
    },
    open () {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    close () {
      console.log('Dialog closed');
    },
    deleteItem (item) {
      const index = this.items.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1);
    },
  }
};
</script>
