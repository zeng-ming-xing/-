<template>
	<view class="rank">
		<view class="rank_item" v-for="(v,i) in rankdata" :key="i" :class="{'active':index==i}" @click="changeitem(i)">
			{{v}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				rankdata:['默认','销量',"价格",'佣金']
			};
		},
		methods:{
			changeitem(i){
				this.index=i
			}
		}
	}
</script>

<style lang="less">
 .rank{
	 width: 100%;
	 display: flex;
	 height: 90rpx;
	 background-color: #CCCCCC;
	 align-items: center;
	 justify-content: center;
	 .rank_item{
		 flex: 1;
		 font-size: 34rpx;
         align-items: center;
         justify-content: center;
		 display: flex;
		 height: 100%;
	 }
	 .active{
		 background-color: #FFFFFF;
		 color: red;
	 }
 }
</style>
