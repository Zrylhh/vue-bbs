<template>
	<div  class="page-index">
		<router-link :to="'/'+baseUrl+'/'+'1'" tag="span">&lt;&lt;</router-link>
		<span>···</span>
		<template v-for='(page,index) in getRenderPages'>
			<router-link 
				:to="'/'+baseUrl+'/'+page" 
				tag="span" 
				:class="{ now: checkNowPage(page) }">
				{{page}}
			</router-link>
		</template>
		<span>···</span>
		<router-link :to="'/'+baseUrl+'/'+(nowpage+1)" tag="span">&gt;</router-link>
	</div>
</template>


<script>
// 导入vuex
import { mapState,mapGetters, mapMutations, mapActions } from 'vuex'
import FastClick from 'fastclick'
export default {
	name:'app-page',
	props :{
		nowpage : {
            type : Number,
            default : 1
        },
        baseUrl: {
        	type : String
        }
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
		},
		checkDevice :function(){
			if(window.outerWidth>400){
				return true;
			}else{
				return false;
			}
		}
	},
	created:function(){
		console.log("page_____ nowpage:"+this.nowpage);
	},
	mounted:function(){
		if(!this.checkDevice){
			console.log("page_____ fit to mobile use fastclick");
			console.log(document);
			var pages = document.getElementsByClassName('page-index');
			var pageIndex = pages[0];
			FastClick.attach(pageIndex);
		}
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