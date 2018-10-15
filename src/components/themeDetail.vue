<template>
	<div class="container-detail">
		<div class="main">
			<div class="theme-detail">
				<div class="title" :data-title="themeObj.title">
					<h3>{{themeObj.title}}</h3>
				</div>
				<div class="content">
					<p v-html="themeObj.content">
					</p>
				</div>
			</div>

			<div class="comment">
				<div v-for="(reply,index) in themeObj.replies" :key="reply.id" class="reply">
					<div class="avatar">
						<img src="../assets/avatar.png"/>
						<span class="username" v-html="getUserNameHtml(reply.author.loginname)">
						</span>
					</div>
					<div class="content">
						<p v-html="reply.content"></p>
						<p class="time">{{reply.create_at}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="user-info">
			<img src="../assets/example.png"/>
			<span class="username">{{themeObj.author.loginname}}</span>
		</div>
	</div>
</template>


<script>
import axios from 'axios'
import { mapState,mapGetters , mapMutations, mapActions } from 'vuex'
export default {
	data(){
		return {
			themeObj:{
				author:{

				}
			},
			baseUrl:'https://cnodejs.org/api/v1/topic',
			mdrender :true
		}
	},
	methods:{
		...mapActions([
	      'changeIsLoading',
	      'changeIsBackAction'
	    ]),
	    getUserNameHtml : function(loginname){
				if(typeof loginname == "object"){
					return loginname;
				}else{
					var baseValue = (Math.random()*parseInt("ffffff",16)+0.5)>>0;
			    	var bgColor = ("00000"+baseValue).toString(16).slice(-6);
			    	var textColor = "#"+("00000"+(parseInt("ffffff",16)-baseValue).toString(16)).slice(-6);

			    	// 计算补色
			    	var R = bgColor.slice(0,2);
			    	var G = bgColor.slice(2,4);
			    	var B = bgColor.slice(4,6);
			    	var reverseR = (255-parseInt(R,16)).toString(16);
			    	var reverseG = (255-parseInt(G,16)).toString(16);
			    	var reverseB = (255-parseInt(B,16)).toString(16);

			    	return `<span style="background:${'#'+bgColor};color:${'#'+reverseR+reverseG+reverseB};" >${loginname.slice(0,1)}</span>${loginname.slice(1)}`;
				}
	    }

	},
	computed:{

	},
	created:function(){
		console.log("进入主题详情页");
		console.log("themeDetail______parmas:"+JSON.stringify(this.$route.params));
		//this.changeIsLoading(false);
		// 因为基本不需要更新数据，所以只在创建时请求一次数据
		// 暂时不考虑发表评论后刷新评论的情况，也没有相关接口
		// 初始化图片
		var topicId = this.$route.params.topicId;
		if(window.outerWidth<400){
			this.$store.dispatch("changeIsBackAction",true);
		}
		axios({
			method: 'get',
			url: this.baseUrl +'/'+ topicId +'?mdrender='+this.mdrender
		})
		.then((res)=>{
			// 请求完成后
			if(res.status==200){
		    	// 请求成功
		    	this.themeObj = res.data.data;
					document.title = this.themeObj.title;
		    	//this.changeIsLoading(true);
		    }else{

		    }
		})
	},
	beforeMount: function(){
		//this.changeIsBack(true);
	},
	mounted: function(){
		//this.changeIsBack(true);
		// 挂载完毕后对文章及评论内容中的img进行处理，增加点击后跳转到imgView的事件
		// 因为内容的html是直接从接口获取的，所以不能在create时就添加事件
	},
	beforeUpdate: function(){
		//
	},
	directives:{
		// 自定义组件
		title: {
		    inserted: function (el) {
		    	console.log("改变title");
		    	document.title = el.dataset.title;
		    }
		}
	}
}
</script>


<style lang="stylus">
.container-detail{
  background: #e8e8e8;
  display: inline-block;
  width: 100%;
  .main{
    width: 65%;
    float: left;
    background: #fff;
    margin-left: 5%;
    .theme-detail{
      min-height: 200px;
      border-bottom: 1px solid #e4e4e4;
      .title{
      }
      .content{
        padding: 0 50px;
        a{
          color: #000;
        }
        .markdown-text{
          text-align: left;
          p{
            text-indent:2em;
            word-break: break-all;
          }
          img{
            max-width: 90%;
            display: block;
          }
          code{
            background: #f1f1f1;
            display: block;
            width: 90%;
            margin: 0 auto;
            padding: 10px 10px;
            color: #333;
            overflow: auto;
            font-size: 13px;
          }
        }
      }
    }
    .comment{
      margin-top: 20px;
      font-size: 14px;
      text-align: left;
      .reply{
        min-height: 150px;
        border-bottom: 1px solid #dedede;
        padding: 15px 50px;
        display:block;
        .avatar{
          .username{
            span{
              width: 1em;
              display: inline-block;
              text-align: center;
              border-radius: 4px;
            }
          }
        }
        .markdown-text{
          text-align: left;
          p{
            text-indent:2em;
          }
          img{
            max-width: 100%;
          }
          code{
            background: #f1f1f1;
            display: block;
            width: 90%;
            margin: 0 auto;
            padding: 10px 10px;
            color: #000;
            overflow: auto;
            font-size: 13px;
          }
          a{
            color: #000;
            word-wrap: break-word;
          }
        }
        img{
          height:60px;
        }
        p{
          font-size:15px;
          padding:0 20px;
          display: block;
        }
        .time{
          text-align:right;
        }
        .avatar{
          display: block;
          height: 60px;
          img{
	          float: left;
          }
          .username{
	          float: left;
					  height: 60px;
            display: block;
            line-height: 60px;
            span{
	            height: 1.5em;
	            line-height: 1.5em;
            }
          }
        }
        .content{
          display: block;
					margin-left: 35px;
        }
      }
    }

  }
  .user-info{
    width: 20%;
    float: right;
    padding:20px 0;
    background:#fff;
    margin-right: 5%;
    img{
      height: 100px;
    }
  }
}
@media(max-width: 400px){
  .container-detail{
    .main{
      width: 100%;
      margin: 0;
      .theme-detail{
        font-size: 14px;
        .title{
          text-align: left;
          padding-left: 20px;
        }
        .content{
          padding: 0 15px;
          .markdown-text{
            h1{
              font-size:20px;
            }
            a{
              color: #000;
            }
          }

        }
      }
      .comment{
        .reply{
          padding: 5px 10px;
          min-height: 80px;
          display:block;
          .avatar{
            display: block;
            height: 40px;
            padding: 5px 0px;
            img{
              height:100%;
            }
            .username{
              display: inline-block;
              vertical-align: top;
              span{
                height:1em;
                line-height:1em;
              }
            }
          }
          .content{
            p{
              padding:0 ;
              text-indent: 0;
            }
            .time{
              font-size:12px;
            }
          }
        }
      }
    }
    .user-info{
      display:none;
    }
  }
}
</style>
