import Vue from 'vue';
import Router, { RouteRecord } from 'vue-router';

import { IVueRouteMetaInfo } from '@/models/IVueRouteMetaInfo';
import { Auth } from '@/utils/Auth';

Vue.use(Router);

const router =  new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home,
      component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
      meta: {
        IsPublic: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      meta: {
        IsPublic: true,
      },
    },
    {
      path: '/Experiments',
      name: 'Experiments',
      component: () => import(/* webpackChunkName: "experiments" */ '@/views/ExperimentGround.vue'),
      meta: {
        IsPublic: true,
      },
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      meta: {
        IsPublic: true,
      },
    },
    {
      path: '/RegistUser',
      name: 'RegistUser',
      component: () => import(/* webpackChunkName: "registUser" */ '@/views/RegistUser.vue'),
      meta: {
        IsPublic: true,
      },
    },
    {
      path: '/Authorized',
      name: 'Authorized',
      component: () => import(/* webpackChunkName: "authorized" */ '@/views/Authorized.vue'),
      meta: {
        isPublic: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const loginStatus = await Auth.IsLoggedIn();

  const callbackFunc: (val: RouteRecord, index: number, array: RouteRecord[]) => unknown = (record: RouteRecord) => {

    if (record.meta) {
      const metadata = record.meta as IVueRouteMetaInfo;

      if (metadata.IsPublic) {
        return false;
      } else {
        return !loginStatus;
      }
    } else {
      return false;
    }
  };

  if (to.matched.some(callbackFunc)) {
    console.log('REQUIRE REDIRECT: ' + to.fullPath);
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    console.log('REGULAR REDIRECT: ' + to.fullPath);
    next();
  }
});


export default router;
