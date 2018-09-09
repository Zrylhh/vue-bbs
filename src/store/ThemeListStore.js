import axios from 'axios'
//import $ from 'webpack-zepto'

export default {
	state: {
	    page: 1,
	    tab :'',
	    limit :10,
	    mdrender :false ,
	    data: [],
	    themeData: [],
	    searchNews: [],
	    loadBtn: false,
	    loadAnimation: true,
	    requestStatus: true,
	    baseUrl: 'https://cnodejs.org/api/v1/topics'
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
		        for (var i = 0; i < data.length; i++) {
		          state.themeData.push(data[i])
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
		}
	},
	actions:{
		askNews ({commit, state}, params) {
			axios({
		        method: 'get',
		        url: state.baseUrl+params
		      })
		      .then((res)=>{
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
		      
		}
	}
}