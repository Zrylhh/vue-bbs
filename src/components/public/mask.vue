<template>
	<div class="trans-mask" v-show="isPlay">
		<div class="trans-1">
	      <div class="ball"></div>
	      <div class="ball"></div>
	      <div class="ball"></div>
	    </div>
	</div>
</template>


<script>

export default{
	props :{
		isPlay: {
			type:Boolean,
			default:false
		}
	}
}
</script>

<style lang="stylus">
.trans-mask{
  height:100%;
  line-height: 40;
  width:100%;
  position: fixed;
  top: 0;
  left: 0;
  
  .trans-1{
  	text-align:center;
  	margin:20px 0;
  	.ball{
  	  width:20px;
  	  height:20px;
  	  border-radius:50%;
  	  display:inline-block;
  	  animation: trans1 1.4s infinite ease-in-out;
  	}
  	.ball:nth-child(1){
	  background:#33afaa;
	  animation-delay: -0.32s;
	}
	.ball:nth-child(2){
	  background:#1b908b;
	  animation-delay: -0.16s;
	}
	.ball:nth-child(3){
	  background:#0c6b67;
	}
  }
}
@keyframes trans1 {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>