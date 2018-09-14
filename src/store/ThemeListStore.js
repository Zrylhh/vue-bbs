import axios from 'axios'
//import $ from 'webpack-zepto'

export default {
	state: {
	    page: 1,
	    tab :'',
	    tabs:[
	        {
	        	name:"全部",
	        	tab:""
	        },
	        {
	        	name:"精华",
	        	tab:"good"
	        },
	        {
	        	name:"问答",
	        	tab:"ask"
	        },
	        {
	        	name:"分享",
	        	tab:"share"
	        },
	        {
	        	name:"招聘",
	        	tab:"job"
	        }
	    ],
	    limit :10,
	    mdrender :false ,
	    data: [],
	    themeData: [],
	    searchNews: [],
	    loadBtn: false,
	    loadAnimation: true,
	    requestStatus: true,
	    baseUrl: 'https://cnodejs.org/api/v1/topics',
	    isLoading:false
	  },
	getters: {
	    getRequestStatus: state => {
	      return state.requestStatus;
	    },
	    getPage: state =>{
	    	return state.page;
	    }
	},
	mutations:{
		loadNews(state){
			let data = state.data;
			if (data.length > 1) { // 判断数据是否存在
//				state.themeData = [];
		        for (var i = 0; i < data.length; i++) {
//		          state.themeData.push(data[i])
		          state.themeData[i] = data[i];
		        }
		      } else {
		        state.loadAnimation = false
		        console.log('没有更多数据了')
		        return false
		      }
			// 数据请求成功显示加载更多按钮
			console.log("mutation：加载数据"+state.themeData.length+"条");
		      state.loadBtn = true
		      state.loadAnimation = false
		},
		loadPage(state,nowpage){
			console.log("store____mutation____changePage, nowpage:"+nowpage);
			state.page = nowpage;
		}
	},
	actions:{
		askNews ({commit, state}, params) {
			state.isLoading = true;
			state.page = params.page;
			state.tab = params.tab;
			
			let paramsStr = "?page="+state.page;
			paramsStr += "&tab="+state.tab;
			paramsStr += "&limit="+state.limit;
			paramsStr += "&mdrender="+state.mdrender;
			
			axios({
		        method: 'get',
		        url: state.baseUrl+paramsStr
		      })
		      .then((res)=>{
		    	  // loading 结束
		    	  state.isLoading = false;
		    	  var data = res.data;
		    	  console.log("res.success:"+data.success);
		    	  if(res.status==200&&data.success==true){
		    		  // 请求成功
		    		  state.data = data.data;
		    		  console.log("actions：请求数据"+state.data.length+"条");
		    		  state.requestStatus = true;
		    	  }else{
		    		  state.requestStatus = false;
		    	  }
		    	  commit('loadNews')
		      })
		},
		changePage ({commit,state}, nowpage){
			console.log("store____action____changePage, nowpage:"+nowpage);
			
			let params = "?page="+nowpage;
			params += "&tab="+state.tab;
			params += "&limit="+state.limit;
			params += "&mdrender="+state.mdrender;
			state.isLoading = true;
			axios({
		        method: 'get',
		        url: state.baseUrl+params
		      })
		      .then((res)=>{
		    	  state.isLoading = false;
		    	  var data = res.data;
		    	  if(res.status==200&&data.success==true){
		    		  // 请求成功
		    		  state.data = data.data;
		    		  console.log("actions：请求数据"+state.data.length+"条");
		    		  state.requestStatus = true;
		    	  }else{
		    		  state.requestStatus = false;
		    	  }
		    	  commit('loadNews')
		    	  commit('loadPage',nowpage);
		      })
		},
	}
}