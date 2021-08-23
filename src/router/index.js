import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsPaperSelect from "@/components/steps/NewsPaperSelect";
import Success from "../components/Success";
import Newspaper from "../views/Newspaper";
import WebSite from "../views/WebSite";
import SocialNetworks from "../views/SocialNetworks";
import Index from "../views/Index"
import AdvertisementType from "@/components/steps/AdvertisementType";
import CreateOrder from "@/components/steps/CreateOrder";
import Content from "@/components/steps/Content";
import Done from "@/components/steps/Done";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // {
  //   path: '/',
  //   name: 'NewsPaperSelect',
  //   component: NewsPaperSelect
  // },
  {
    path: '/newspaper',
    name: 'Newspaper',
    component: Newspaper
  },
  {
    path: '/website',
    name: 'WebSite',
    component: WebSite
  },
  {
    path: '/socialnetworks',
    name: 'SocialNetworks',
    component: SocialNetworks
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  //
  // {
  //   path: '/advertisementtype',
  //   name: 'AdvertisementType',
  //   component: AdvertisementType
  // },
  // {
  //   path: '/content',
  //   name: 'Content',
  //   component: Content
  // },
  // {
  //   path: '/createorder',
  //   name: 'CreateOrder',
  //   component: CreateOrder
  // },
  // {
  //   path: '/done',
  //   name: 'Done',
  //   component: Done
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
