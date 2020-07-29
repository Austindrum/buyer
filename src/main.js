import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import FlashMessage from '@smartweb/vue-flash-message';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.component("Loading", Loading);
Vue.config.productionTip = false
Vue.use(FlashMessage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
