<template>
  <div class="img-container">
    <!--<img :src="fullScreenImgUrl"/>-->
    <span>hello</span>
  </div>
</template>

<script>
const exampleImg = require("../../assets/example.png");
var tmpUrl = "https://cn.vuejs.org/images/logo.png";
export default {
  data(){
    return {
      fullScreenImgUrl:exampleImg
    }
  },
  methods:{

  },
  computed:{

	},
  created:function(){
    console.log("imgView___________created");
    //var imgSrc = this.$route.params.src;
    //if(!imgSrc){
    //    imgSrc = "../../assets/example.png";
    //}
    //const img = require(tmpUrl);
    //this.fullScreenImgUrl = exampleImg;
  }
}


</script>

<style lang="stylus">
.img-container{
  width:100%;
  height:100;
    span{
      display:block;
    }

}
</style>
