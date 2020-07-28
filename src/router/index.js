import Vue from 'vue'
import VueRouter from 'vue-router'

import firebase from 'firebase'

import Home from '../components/Home'
import Login from '../components/user/Login'
import Dashbord from '../components/user/admin/Dashbord'
import Product from '../components/user/admin/page/Product'

Vue.use(VueRouter)


const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { requireAuth: true }
  },
  {
    path: '/dashbord',
    name: 'Dashbord',
    component: Dashbord,
    meta: { requireAuth: true },
    children: [
      {
        path: "/",
        name: "Product",
        component: Product,
        meta: { requireAuth: true },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {requireGuest: true}
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        next();
      }else{
        next({
          path:'/login'
        })
      }
    })
  }
  else if(to.meta.requireGuest){
    if(firebase.auth().currentUser){
      next({
        path: '/'
      })
    }else{
      next();
    }
  }
  else{
    next();
  }
})

export default router
