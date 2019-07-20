import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => !record.meta.isPublic) && !Auth.loggedIn) {
  //   next({ path: '/login', query: { redirect: to.fullPath }});
  // } else {
  //   next();
  // }
  next();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
