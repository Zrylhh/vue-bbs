<template>
	<div class="container-list">
		<div class="nav-bar" >
			<span v-for='(tmpTab, index) in tabs'
				@click.prevent.stop="changeTab(tmpTab.tab)" 
				:class="{now:checkNowTab(tmpTab.tab)}">
				{{tmpTab.name}}
			</span>
		</div>
		<div class="themes-list">
			<div v-if='getRequestStatus'>
				<div v-if="themeData.length>0">
					<transition-group name="fade" tag="div">
						<div v-for='(theme, index) in themeData' :key='theme.id' :id="theme.id" class="theme">
							<router-link :to="{name:'topic',params: { topicId: theme.id }}">
								<img src="../assets/example.png"/>
								<div class="intro">
					              <h4>{{theme.title}}</h4>
					              <p><span>{{theme.author.loginname}}</span> | <span>{{theme.create_at}}</span></p>
					              <span class="reply-num"><i class="fa" ></i>{{theme.reply_count}}</span>
					            </div>
							</router-link>
						</div>
					</transition-group>
				</div>
				<div v-else>
					no more data {{themeData.length}}
				</div>
			</div>
			<div v-else>
				request status false
			</div>
			<div class="fail" v-else>/(ㄒoㄒ)/~~， 请求到数据失败!</div>
			<app-page :baseUrl="baseUrl" :nowpage=page ></app-page>
		</div>
	</div>
</template>

<script>
// 导入vuex
import { mapState,mapGetters , mapMutations, mapActions } from 'vuex'
import AppPage from './public/page.vue'

export default {
	data () {
	    return {
	      page:1, // 当前页码
	      tab:"",
	      baseUrl:"topics"
	    }
  	},
  	computed: {
	    ...mapState({
	      getPage: state => state.ThemeListStore.page,
	      newsUrl: state => state.ThemeListStore.newsUrl,
	      themeData: state => state.ThemeListStore.themeData,
	      limit: state => state.ThemeListStore.limit,
	      mdrender: state => state.ThemeListStore.mdrender,
	      isLoading: state => state.ThemeListStore.isLoading,
	      tabs: state => state.ThemeListStore.tabs
	      
	    }),
	    ...mapGetters([
	      'getRequestStatus',
	      // ...
	    ])
	},
	methods: {
		...mapActions([
	      'askNews',
	      'changePage',
	      'changeIsBack'
	    ]),
	    getLink:function(id){
	    	return "topic/"+id;
	    },
	    changeTab : function(tab){
	    	this.tab = tab;
	    },
	    checkNowTab : function(tab){
	    	return tab==this.tab;
	    }
	},
	created: function () {
	
		console.log("themeList: _________on created");
		this.$store.dispatch("changeIsBackAction",false);
		let params = {};
		params.page = this.page;
		params.tab = this.tab;
	    this.askNews(params);
	    //this.$forceUpdate();
	},
	mounted: function () {
		console.log("themeList: _________on mounted start");
		console.log(this.themeData);
		console.log("themeList: _________on mounted end");
	},
	updated:function(){
		console.log("themlist updated");
	},
	beforeUpdate:function(){
		console.log("themlist beforeUpdate");
	},
	components: {
		'app-page':AppPage
	},
	watch:{
        $route:function(){
        	console.log("themeList____ route change");
        	var tmpPage=this.$route.params.page;
        	if(tmpPage&&!isNaN(tmpPage)&&parseInt(tmpPage)>0){
        		this.page = parseInt(tmpPage);
        	}
        },
		tab:function(){
			// 改变tab之后，页数归1
			this.page = 1;
			let params = {};
			params.page = this.page;
			params.tab = this.tab;
		    this.askNews(params); 
		},
		page:function(){
			let params = {};
			params.page = this.page;
			params.tab = this.tab;
		    this.askNews(params); 
		}
	}
}
</script>

<style lang="stylus">
.container-list{
  background: #fff;
  width: 82%;
  margin: 0 auto;
  position: relative;
  display: block;
  .swiper-wrapper{
    height: 200px;
    .swiper-slide img{
      width: 100%;
      height: 200px;
    }
  }
  .nav-bar{
  	height:40px;
  	background: #262627;
  	color:#fff;
  	border-left: 12px solid #41b883;
  	text-align: left;
  	padding-left: 10px;
  	span{
  	  width: 50px;
      height: 100%;
      display: inline-block;
      line-height: 40px;
      text-align: center;
  	}
  	span.now{
  	  background:#505050;
  	}
  	span:hover{
  	  background:#505050;
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
            .reply-num{
                i:before{
                    color: #f76f0b;
                    content: "\f0e5";
                }
            }
            .reply-num:hover{
                i:before{
                    content: "\F075";
                }
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
@media(max-width: 400px){
  .container-list{
    width: 100%;
    .themes-list{
      width: 100%;
      border:0;
      padding:0;
      .theme{
        height: 70px;
        padding: 5px 10px;
        font-size: 14px;
        a{
          border: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          -webkit-tap-highlight-color: transparent;
          outline: none;
          img{
            height:100%;
          }
          .intro{
            margin-top: 6px;
            p{
              margin:0;
              font-size: 13px;
            }
            h4{
              margin:0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .reply-num{
              font-size: 13px;
            }
          }
        }
      }
    }
    .nav-bar{
      border:0;
      padding:0;
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


.slide-fade-enter-active {
  transition: all .5s linear .3s;
}
.slide-fade-leave-active {
  transition: all .5s linear;
}
.slide-fade-leave-to
{
  transform: translateY(50px);
  opacity: 0;
}
.slide-fade-enter{
  transform: translateY(50px);
  opacity: 0;
}

.fade-enter-active {
  transition: all .5s linear .3s;
}
.fade-leave-active {
  transition: all .5s linear;
}
.fade-leave-to
{
  transform: translateX(30px);
  opacity: 0;
}
.fade-enter{
  transform: translateX(30px);
  opacity: 0;
}

</style>