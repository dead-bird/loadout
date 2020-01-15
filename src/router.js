import User from './views/User';
import Router from 'vue-router';
import Home from './views/Home';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/:id',
      component: User,
    },
  ],
});
