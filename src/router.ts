import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home,
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      meta: {
        isPublic: true,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/Experiments',
      name: 'Experiments',
      component: () => import(/* webpackChunkName: "experiments" */ '@/views/ExperimentGround.vue'),
      meta: {
        isPublic: true,
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: {
        isPublic: true,
      }
    },
    {
      path: '/Authorized',
      name: 'Authorized',
      component: () => import(/* webpackChunkName: "authorized" */ '@/views/Authorized.vue'),
      meta: {
        isPublic: false,
      }
    },
  ],
});
