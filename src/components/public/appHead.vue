<template>
	<header class="head">
		<template v-if="isBack">
			<div class="back" @click.prevent.stop="back">
				<i class="fa fa-angle-left fa-3x" aria-hidden="true"></i>
			</div>
		</template>
		<template v-else>
			<a href="https://vuejs.org"><img src="../../assets/logo.png"/></a>
		</template>

		<div class="search-bar">
			<input type="text"/> <button>搜索</button>
		</div>
		<div class="nav-bar">
			<a href="https://cnodejs.org/">cnode社区</a>
			<a href="/topics">首页</a>
			<a href="javascript:void(0)">登录</a>
		</div>
		<div class="nav-menu">
			<div class="side-btn" @click.stop.prevent="changeSideMenu">
				<i class="fa fa-bars fa-2x" aria-hidden="true"></i>
			</div>
			<transition name="slide-x-fade" >
				<div class="side-menu" v-show="isShowSideMenu">
					<a v-for="(link,index) in links" :key="index"
						:href="link.url">{{link.name}}
					</a>
				</div>
			</transition>
		</div>
	</header>
</template>

<script>
import FastClick from 'fastclick'
export default {
	name: 'appHead',
	props:{
		isBack:{
			type:Boolean,
			default: true
		}
	},
	data(){
		return {
			isShowSideMenu : false,
			links:[
				{
					url:"https://cnodejs.org/",
					name:"社区"
				},
				{
					url:"/topics",
					name:"首页"
				},
				{
					url:"#",
					name:"登录"
				}
			]
		}
	},
	mounted:function(){
		var backs = document.getElementsByClassName('back');
		if(backs){
			var back = backs[0];
			if(back){
				FastClick.attach(back);
			}
		}
	},
	computed:{

	},
	methods:{
		changeSideMenu : function(){
			this.isShowSideMenu = !this.isShowSideMenu;
			var that = this;
			if(this.isShowSideMenu==true){
				function handle(){
					console.log("head_________click");
					that.isShowSideMenu = false;
					document.removeEventListener("click",handle,false);
				}
				document.addEventListener("click",handle,false);
			}
		},
		back : function(){
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="stylus">
*{
  transition: all 1s easy-in 1s;
}

.head{
  height: 60px;
  background: #262627;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 1000;
  display: block;

  a{
    display: inline-block;
    height: 50px;
    float: left;
    margin-left: 50px;
    cursor: pointer;
    img{
      height:50px;
    }
  }
  .search-bar{
    width: 40%;
    display: inline-block;
    position: relative;
    height: 60px;
    line-height: 57px;
    float: left;
    a{
      float: left;
      margin-left: 50px;
    }
    input{
      border: 1px solid #184631;
      outline: 0;
      border-radius: 5px;
      height: 30px;
      background: transparent;
      color: #fff;
      padding: 0 10px;
    }
    input:focus{
      width:260px;
      border: 1px solid #41b883;
      outline: 0;
    }
    button{
      height: 30px;
      color: #fff;
      background: #41b883;
      border: 0;
      border-radius: 5px;
      width: 61px;
    }
  }
  .nav-bar{
    width: 20%;
    float: right;
    margin-right: 30px;
    height: 60px;
    line-height: 57px;
    a{
      color:#f5f5f5;
      text-decoration: none;
			margin-left:10px;
    }
  }
  .nav-menu{
    display:none;
  }
}
@media(max-width: 400px){
  .head{
    line-height: 84px;

    a{
      float: left;
      height: 35px;
      margin-left:10px;
      img{
        height: 35px;
      }
    }
    .back{
      display: inline-block;
      height: 100%;
      width: 50px;
      float: left;
      color: #44a077;
    }
    .search-bar {
      display:none;
    }
    .nav-bar{
      display:none;
    }
    .nav-menu{
      display: inline-block;
      height: 60px;
      /*float: right;*/
      right: 0;
      position: absolute;
      .side-btn{
        height: 60px;
        width:50px;
        margin: 0;
        color: #44a077;
        line-height: 75px;
        span:focus{
          border:none;
          outline:none;
        }
      }
      .side-btn:focus{
        background:#424242;
      }
      .side-menu{
        position: absolute;
        width: 100px;
        z-index: 999;
        top: 60px;
        right: 0;
        a{
          display: block;
          margin: 0;
          height: 33px;
          color: #44a077;
          text-decoration: unset;
          border-bottom: 1px solid #000;
          line-height: 34px;
          width: 100%;
          background: #262627;
        }
        a:nth-child(2){
          transition : all .2s linear .2s;
        }
        a:nth-child(3){
          transition : all .2s linear .2s;
        }
      }
    }
  }
}

.slide-x-fade-enter-active {
  animation: show .2s;
}
.slide-x-fade-leave-active {
  animation: hide .2s;
}
.slide-x-fade-leave-to
{
  opacity: 0;
}
.slide-x-fade-enter{

}

@keyframes show {
    0% {
        opacity: 0;
        transform: translateX(10px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes hide {
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(10px);
    }
}
</style>
