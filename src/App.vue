<template>
  <div id="app">
  	<div class="page">
      <app-head></app-head>
      <!--<app-nav></app-nav>-->
      <!--keep-alive 切换路不会触发mounted-->
      <!--暂时只有两个页面，帖子列表和帖子详情 -->
      <keep-alive><router-view></router-view></keep-alive>
      <!--<app-foot></app-foot>-->
    </div>      
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Spinner from './components/Spinner.vue'
import Head from './components/public/head.vue'
export default {
	name: 'App',
	components: {
	  'app-head':Head
	},
	data(){
		return {
			is_paused:false
		}
	
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.page{
  position: relative;
  z-index: 99;
  transition: all 0.5s;
  width: 86%;
  margin: 0 auto;
}
.toggle{
  transform: translateX(-120px);
}
</style>
