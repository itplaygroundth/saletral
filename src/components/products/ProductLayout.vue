<template>
 <div class="page-wrapper">
            <router-view></router-view>
</div>   
</template>
<script>
import orderproduct from './orderproduct';
import product from './product';
export default {
  components: {
    'orderp-app': orderproduct,
    'product-app': product
  },
  data: () => ({
     
  }),

  methods: {
    
  }
};
</script>