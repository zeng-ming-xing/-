<template>
	<view class="navbar">
		 <view class="left"><slot name="left">左边</slot></view>
		 <view class="center"><slot name="center">中间</slot></view>
		 <view class="right"><slot name="right">右边</slot> </view>
	</view>
</template>

<script>
	export default{
		data(){
			return {}
		},
		methods:{}
	}
</script>

<style lang="less" scoped>
	.navbar{
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: center;
		align-items: center;
		.left{flex: 1;
		text-align: center;}
		.center{ flex: 3;
		text-align: center;}
		.right{flex: 1;
		text-align: center;}
	}
</style>

