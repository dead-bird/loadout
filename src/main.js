import './assets/styles/index.css';
import router from './router';
import store from './store';
import App from './App';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
