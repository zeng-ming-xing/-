<template>
	<view class="soft">
		<view class="pdd" @click="changitem">
			<view class="title" :class="{'click_title':index==0}" >
				拼多多
			</view>
			<view class="desc" :class="{'click_desc':index==0}" >超值好货</view>
		</view>
		<view class="jd" @click="changeitemJ">
			<view class="title" :class="{'click_title':index==1,'jd_click':index==1}">
				京东精选
			</view>
			<view class="desc" :class="{'click_desc':index==1,'jd_desc':index==1}">
				大牌正品
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0
			}
		},
		methods:{
			changitem(){
				this.index=0
			},
			changeitemJ(){
				this.index=1
			}
		}
	}
</script>

<style lang="less" scoped>
	.soft{
		width: calc(100% - 80rpx);
		padding: 20rpx 40rpx;
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.title{
			font-size: 38rpx;
		}
		.desc{
			color: #CCCCCC;
		}
		.click_title{
			color: red;
		}
		.click_desc{
			width: 60%;
			margin: 0 auto;
			background-color: red;
			border-radius: 20rpx;
			color: #FFFFFF;
		}
		.jd_click{
			color: blue;
		}
		.jd_desc{
			background-color: blue;
		}
		.pdd{
			flex: 1;
			text-align: center;
			border-right: 1rpx solid #C0C0C0;
		}
		.jd{
			flex: 1;
			text-align: center;
		}
	}

</style>
