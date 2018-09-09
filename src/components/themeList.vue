<template>
	<div class="container">
		<div class="themes-list">
			<div v-if='getRequestStatus'>
				<div v-for='(theme, index) in themeData' :key='index' :id="theme.id" class="theme">
					<a :href="getLink(theme.id)">
						<img src="../assets/example.png"/>
						<div class="intro">
			              <h4>{{theme.title}}</h4>
			              <p><span>{{theme.author.loginname}}</span> | <span>{{theme.create_at}}</span></p>
			            </div>
					</a>
				</div>
				<!--<button class="loadMore" @click='loadMoreBtn' v-show='loadBtn'>点击加载更多</button>-->
			</div>
			<div class="fail" v-else>/(ㄒoㄒ)/~~， 请求到数据失败!</div>
		</div>
		<app-page></app-page>
	</div>
</template>

<script>
// 导入vuex
import { mapState,mapGetters , mapMutations, mapActions } from 'vuex'
import Page from './public/page.vue'
export default {
	data () {
	    return {
	      page:1
	    }
  	},
  	computed: {
	    /**
	     * @desc 从store中引入需要的数据
	     */
	    ...mapState({
	      page: state => state.ThemeListStore.page,
	      newsUrl: state => state.ThemeListStore.newsUrl,
	      themeData: state => state.ThemeListStore.themeData,
	      page: state => state.ThemeListStore.page,
	      tab: state => state.ThemeListStore.tab,
	      limit: state => state.ThemeListStore.limit,
	      mdrender: state => state.ThemeListStore.mdrender
	    }),
	    ...mapGetters([
	      'getRequestStatus'
	      // ...
	    ])
	  },
	created: function () {
		console.log("_________on created");
		let params = "?page="+this.page;
		params += "&tab="+this.tab;
		params += "&limit="+this.limit;
		params += "&mdrender="+this.mdrender;
	    this.askNews(params) // 第一次加载请求数据
	    let _this = this
	  },
	methods: {
		...mapActions([
	      'askNews'
	    ]),
	    getLink:function(id){
	    	return "/topic/"+id;
	    }
	},
	components: {
		'app-page':Page
	}
}
</script>

<style lang="stylus">
.container{
  background: #fff;
  .swiper-wrapper{
    height: 200px;
    .swiper-slide img{
      width: 100%;
      height: 200px;
    }
  }
  .themes-list{
    min-height: 500px;
    padding: 0 10px;
    width: 70%;
    border-left: 12px solid #41b883;
    .theme{
    	height: 160px;
	    padding: 15px 60px;
	    border-bottom: 1px solid #b7b7b7;
		a{
			text-decoration: unset;
		}	    
	    img{
        	float:left;
        }
        .intro{
        	color:#333;
        	
        	h4{
        		text-decoration: unset;
        	}
        }
    }
    .new{
      height: 160px;
	    border: 1px solid;
	    background: #838383;
	    padding: 30px 57px;
      img{
        height: 80px;
        width: 100px;
      }
      .intro{
        width: 80%;
        height: 80px;
        display: flex;
        padding-left: 10px;
        flex-direction: column;
        justify-content: space-between;
        h4{
          font-size: 20px;
          line-height: 1.2;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        p{
          font-size: 13px;
          color: #666;
        }
      }
    }
    .loadMore{
      height: 50px;
      width: 100%;
      color: #545454;
      background: #eee;
      text-align: center;
      line-height: 50px;
      font-size: 13px;
      border: none;
      border-radius: 0;
      outline: none;
      margin-bottom: 10px;
    }
    .fail{
      display: flex;
      min-height: 300px;
      align-items: center;
      justify-content: center;
    }
  }
}
/*加载动画*/
.spinner {
  position: fixed;
  left: 40%;
  bottom: 10%;
  width: 80px;
  height: 80px;
  margin: 50px auto;
  background-color: #69C61D
  border-radius: 100%;
  -webkit-animation: scaleout 1.0s infinite ease-in-out;
  animation: scaleout 1.0s infinite ease-in-out;
}
@-webkit-keyframes scaleout {
  0% { -webkit-transform: scale(0.0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
.goTop{
  color: #50BFFF;
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 9999;
  cursor: pointer;
  width: 60px;
  height: 60px;
  transition: all 1s ease;
  transform: scale(0.6);
}
.goTop:active{
  color: #C40000;
  transform: scale(1);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.tip{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  a{
    color: #19C8A9;
  }
  span{
    margin-bottom: 10px;
  }
}
</style>