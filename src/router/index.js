import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import store from '@/store'
import themeList from '@/components/themeList'
import themeDetail from '@/components/themeDetail'

Vue.use(Router)

const router = new Router({
	linkActiveClass: 'active',
	hashbang: true, // 将路径格式化为#!开头
	history: true, // 启用HTML5 history模式，可以使用pushState和replaceState来管理记录
	mode:'history',
	routes:[
	  {
		  path:"/topics",
		  component: themeList,
		  meta:{
			  title:"首页"
		  }
	  },{
		  path:"/topic/:topicId",
		  component: themeDetail,
		  meta:{
			  title:"..."
		  }
	  }         
	]
})

/**
 * @desc 全局监听路由变化
 */
router.beforeEach((to, from, next) => {
//  store.dispatch('updateHistoryLength') // 变化时更新路由切换长度
	// 暂时不做动作
	// 修改title
	if (to.meta.title) {
	    document.title = to.meta.title;
	}
    next()
})

export default router