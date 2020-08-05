<template>
	<scroll-view @scrolltolower="tolowar" enable-flex="true" class="show-today" scroll-x="true" show-scrollbar="false">
		<view class="show_d_item" v-for="(v,i) in today" :key="i">
			<image :src="v.goods_image_url" mode="widthFix"></image>
			<view class="show_info">
				<view class="title">{{v.goods_name}}</view>
				<view class="after_juan">卷后￥{{v.coupon_after_price}}</view>
				<view class="cell">
					<view class="cell_num">{{v.sales_tip}}单</view>
					<view class="juan_num">
						<text class="left">卷</text>
						<text class="right">{{v.coupon_price}}</text>
					</view>
				</view>
				<view class="Gobuy">立即购买</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
			
		},
		props:{
			today:Array
		},
		methods:{
			tolowar(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="less" scoped>
.show-today{
	width: 100%;
	display: flex;
	white-space: nowrap;
	height: 500rpx;
	.show_d_item{
		background-color: #FFFFFF;
		border-radius: 10rpx;
		display: inline-block;
		flex: 1;
		padding:0 20rpx ;
		margin-right: 20rpx;
		image{
			width: 250rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;
		}
		.show_info{
			width: 250rpx;
			display: flex;
			flex-direction: column;
		}
		.title{
			flex:2;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.after_juan{
			flex: 2;
			color: red;
			text-align: center;
			padding: 10rpx 0;
		}
		.cell{
			padding-bottom: 10rpx;
			display: flex;
			flex: 1;
			justify-content: space-between;
			font-size: 30rpx;
			.cell_num{
			flex: 1;
				color:#808080;
			}
			.juan_num{
				flex: 1;
				background-color: #d92111;
				color: #FFFFFF;
				display: flex;
				justify-content: space-around;
			}
			.left{
				flex: 1;
				border-right: 1px dashed #FFFFFF;
			}
			.right{
				flex: 2;
				text-align: center;
			}
		}
		.Gobuy{
			flex: 2;
			padding: 9rpx 0;
			background-color: #d96f3a;
			border-radius:10rpx;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
