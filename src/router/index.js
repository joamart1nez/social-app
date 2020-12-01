import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user',
    component: () => import('../views/User.vue'),
    meta: {requiredAuth: true},
    children: [
      {
        path: '/',
        components: {
          user:() => import('../components/Home.vue')
        } 
      },
      {
        path: 'profile',
        components: {
          user:() => import('../components/Profile.vue')
        } 
      },
      {
        path: 'friends',
        components: {
          user:() => import('../components/Friends.vue')
        } 
      },
      {
        path: 'tasks',
        components: {
          user:() => import('../components/Tasks.vue')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiredAuth);

  if(protectedRoute && store.state.token === null){
    next({name: 'Login'});
  }else{
    next();
  }
})

export default router
