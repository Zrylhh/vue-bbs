import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import store from '@/store'
import themeList from '@/components/themeList'
//import themeDetail from '@/components/themeDetail'

Vue.use(Router)

const router = new Router({
	linkActiveClass: 'active',
	hashbang: true, // 将路径格式化为#!开头
	history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
	routes:[
      {
          path:"/",
          component:themeList
      },
	  {
		  path:"/topics",
		  component: themeList
	  },{
		  path:"/topic/:id",
		  component: themeList
	  }         
	]
})

/**
 * @desc 全局监听路由变化
 */
router.beforeEach((to, from, next) => {
//  store.dispatch('updateHistoryLength') // 变化时更新路由切换长度
	// 暂时不做动作
  next()
})

export default router
