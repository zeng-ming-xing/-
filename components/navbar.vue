<template>
	<view class="navbar common">
		 <view class="left common"><slot name="left"></slot></view>
		 <view class="center common"><slot name="center"></slot></view>
		 <view class="right common"><slot name="right"></slot> </view>
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
	.common{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.navbar{
		width: 100%;
		height: 80rpx;
		
		.left{flex: 1;
		text-align: center;
		height: 100%;
		}
		.center{ flex: 3;
		text-align: center;
		height: 100%;
		
		}
		.right{flex: 1;
		text-align: center;
		height: 100%;
		}
	}
</style>

