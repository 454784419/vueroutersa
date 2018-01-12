// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Layout from './components/Layout';
import VueResource from 'vue-resource';
import VRouter from 'vue-router';
import Index from './pages/index';
import DetailPage from './pages/detail';
Vue.use(VRouter);
Vue.use(VueResource);
// Vue.config.productionTip = false
const router=new VRouter({
  mode:'history',
  routes:[
    {
      path:"/",
      component:Index
    },
    {
      path:"/detail",
      component:DetailPage
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
