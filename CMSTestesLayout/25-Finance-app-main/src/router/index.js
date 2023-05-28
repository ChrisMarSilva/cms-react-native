import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/credit-card',
    name: 'Credit-Card',
    component: () => import(/* webpackChunkName: "about" */ '../views/Credit-Card.vue')
  },
  {
    path: '/home-loan',
    name: 'Home-Loan',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeLoan.vue')
  },
  {
    path: '/personal-loan',
    name: 'Personal-Loan',
    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalLoan.vue')
  },
  {
    path: '/demat-account',
    name: 'Demat-Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/DematAccount.vue')
  },
  {
    path: '/saving-account',
    name: 'Saving-Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/SavingAccount.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
