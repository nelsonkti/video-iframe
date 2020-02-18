import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import VideoDetail from '@/components/VideoDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/video/detail/:id',
      name: 'VideoDetail',
      component: VideoDetail
    }
  ]
})
