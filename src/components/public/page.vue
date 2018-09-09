<template>
	<div class="page-index">
		<span v-for='(page,index) in getRenderPages' v-bind:class="{ now: checkNowPage(page) }">
			{{page}}
		</span>
	</div>
</template>


<script>
// 导入vuex
import { mapState,mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	data(){
		return {
			nowpage:1
		}
	},
	computed:{
		...mapGetters([
	      'getPage'
	      // ...
	    ]),
		getRenderPages : function(){
			var pageArr = [];
			if(this.nowpage<=3){
				pageArr.push(1);
				pageArr.push(2);
				pageArr.push(3);
				pageArr.push(4);
				pageArr.push(5);
			}else{
				pageArr.push(this.nowpage-2);
				pageArr.push(this.nowpage-1);
				pageArr.push(this.nowpage);
				pageArr.push(this.nowpage+1);
				pageArr.push(this.nowpage+2);
			}
			
			return pageArr;
		},
		checkNowPage : function(page){
			return page==this.nowpage;
		}
	},
	created:function(){
		this.nowpage = this.getPage();
	},
	methods: {
	
	}
}
</script>

<style lang="stylus">
.page-index{
  height:30px;
  float:right;
  margin-right:20px;
  text-align:right;
  
  span{
    height:30px;
    width:25px;
    backgroud:#848484;
  }
  span{
    backgroud:#fff;
  }
}
</style>