<template>
  <div id="app">
  	<div class="page">
      <app-head :isBack="isBack"></app-head>
      <!--<app-nav></app-nav>-->
      <!--keep-alive 切换路不会触发mounted-->
      <keep-alive>
	  	<transition name="fade" tag="div">
	      <router-view></router-view>
		</transition>
	  </keep-alive>
      <app-mask :isPlay="isLoading"></app-mask>
      <!--<app-foot></app-foot>-->
    </div>      
  </div>
</template>

<script>
import { mapState,mapGetters , mapMutations, mapActions } from 'vuex'

import HelloWorld from './components/HelloWorld.vue'
import Spinner from './components/Spinner.vue'
import Head from './components/public/head.vue'
import Mask from './components/public/mask.vue'
export default {
	name: 'App',
	computed: {
		...mapState({
			isLoading: state => state.ThemeListStore.isLoading,
			isBack: state => state.ThemeListStore.isBack
		})
	},
	components: {
	  'app-head':Head,
	  'app-mask':Mask
	},
	data(){
		return {
			is_paused:false
		}
	
	}
}
</script>

<style>
body{
  margin: 0;
}
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
}
.toggle{
  transform: translateX(-120px);
}

.fade-enter-active {
  transition: all .5s linear .3s;
}
.fade-leave-active {
  transition: all .5s linear;
}
.fade-leave-to
{
/*  transform: translateX(30px);*/
  opacity: 0;
}
.fade-enter{
/*  transform: translateX(30px);*/
  opacity: 0;
}
</style>
