<template>
	<div class="page-index">
		<span @click.prevent.stop="go(1)">&lt;&lt;</span>
		<span>···</span>
		<span v-for='(page,index) in getRenderPages' 
			:class="{ now: checkNowPage(page) }"
			@click.prevent.stop="go(parseInt(page))"
			>
			{{page}}
		</span>
		<span>···</span>
		<span @click.prevent.stop="go('next')">&gt;</span>
	</div>
</template>


<script>
// 导入vuex
import { mapState,mapGetters, mapMutations, mapActions } from 'vuex'

export default {
	name:'app-page',
	props :{
		nowpage : {
            type : Number,
            default : 1
        },
	},
	data(){
		return {
		}
	},
	computed:{
		getRenderPages : function(){
			console.log("page ______getRenderPages");
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
		}
	},
	created:function(){
		console.log("page_____ nowpage:"+this.nowpage);
	},
	methods: {
		checkNowPage : function(page){
			return page==this.nowpage;
		},
		go:function(page){
            //父组件通过change方法来接受当前的页码
            if(page==='next'){
            	page = this.nowpage + 1;
            }
            console.log("page____go,page:"+page);
            this.$emit('change', page);
            return false;
		}
	}
}
</script>

<style lang="stylus">
.page-index{
  height:30px;
  float:right;
  margin-right:20px;
  text-align:right;
  margin-top: 30px;
  margin-bottom: 30px;
  span{
    display: inline-block;
    height: 30px;
    width: 30px;
    border: 1px solid #e6e6e6;
    border-collapse: inherit;
    text-align: center;
    line-height: 31px;
    cursor:pointer;
  }
  span:hover{
    background: #dcdcdc;
  }
  span.now{
    background: #dcdcdc;
  }
}
</style>