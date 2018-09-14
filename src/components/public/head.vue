<template>
	<header class="head">
		<a href="https://vuejs.org"><img src="../../assets/logo.png"/></a>
		<div class="search-bar">
			<input type="text"/> <button>搜索</button>
		</div>
		<div class="nav-bar">
			<a href="https://cnodejs.org/">cnode社区</a>
			<a href="/topics">首页</a>
			<a href="javascript:void(0)">登录</a>
		</div>
	</header>
</template>

<script>
export default {
	name: 'head',
	data(){
		return {
		
		}
	},
	computed:{
		
	},
	methods:{
		
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
  
  img{
    height:50px;
    cursor:pointer;
    float: left;
    margin-left: 50px;
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
    }
  }
}
</style>
