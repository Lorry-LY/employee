import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EmployeeView from '../views/EmployeeView.vue'

import IndexForm from '../components/employee/IndexForm.vue'
import AddForm from '../components/employee/AddForm.vue'
import SearchForm from '../components/employee/SearchForm.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/employee',
    component: EmployeeView,
    redirect: "/employee/add",
    children: [
      {
        path: "/employee/add",
        component: AddForm
      },
      {
        path: "/employee/search",
        component: SearchForm
      },
      {
        path: "/employee/index",
        component: IndexForm
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
