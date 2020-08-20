<template>
	<view class="showgoods">
		<view  class="list_item" v-for="(v,i) in showgood" :key="i">
			<image :src="v.goods_image_url" mode="widthFix"></image>
			<view class="goods_info">
				<view class="title">{{v.goods_name}}</view>
				<view class="juan">
				<view class="price">原价<text>{{v.min_group_price?v.min_group_price:v.min_normal_price}}</text></view>
				<view class="sell_num">销量{{v.sales_tip}}</view>
				</view>
				<view class="make">
					<view class="coup_price" :v-show="v.has_coupon">
						<text class="bo">卷</text><text>￥{{v.coupon_price}}</text>
					</view>
					<view class="up">升级可赚￥{{v.fanli_Money*2}}</view>
				</view>
				<view class="ceil">
					<view class="after_price">
						<text style="font-size: 27rpx;">卷后</text><text>￥{{v.coupon_after_price}}</text>
					</view>
					<view class="make_m">
						<text style="font-size: 27rpx;">可赚</text><text>￥{{v.fanli_Money}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			showgood:Array
		}
	}
</script>

<style lang="less" scoped>
 .showgoods{
	 width: calc(100% - 20rpx);
	 padding: 10rpx;
	 background-color: #F1F1F1;
	 .list_item{
	 	display: flex;
	 	margin: 20rpx auto;
	 	background-color: #FFFFFF;
	 	border-radius: 10rpx;
	 	width: 90%;
	 	image{
	 		flex: 1;
	 		border-radius: 10rpx;
	 	}
	 	.goods_info{
	 		flex: 2;
	 		display: flex;
	 		flex-direction: column;
	 		padding: 10rpx;
	          .title{
	 			 flex:2;
	 			 font-size: 26rpx;
	 		 }
	 		 .juan{
	 			 flex: 1;
	 			 padding: 10rpx 0;
	 			 display: flex;
	 			 justify-content: space-between;
	 			 .price{
	 				 flex: 1;
	 				 text{
	 					 text-decoration: line-through;
	 				 }
	 				 color: #98a3ab;
	 			 }
	 			 .cell_num{
	 				 flex: 1;
	 			 }
	 		 }
	 		 .make{
	 			 flex:1;
	 			 padding: 10rpx 0;
	 			 display: flex;
	 			 justify-content: space-between;
	 			 .up{
	 				 flex: 3;
	 				 font-size: 23rpx;
	 		         color:red;
	 				 text-align: right;
	 			 }
	 			 .coup_price{
	 				 flex: 1;
	 				 font-size: 30rpx;
	 				 background-color: red;
	 				 color: #FFFFFF;
	 				 border-radius: 10rpx;
	 				 .bo{
	 					 border-right:1rpx dashed #FFFFFF;
	 				 }
	 			 }
	 			 
	 		 }
	 		 .ceil{
	 			 flex: 1;
	 			 display: flex;
	 			 justify-content: space-between;
	 			 color: red;
	 			 .after_price{
	 				 font-size: 30rpx;
	 				 
	 			 }
	 			 .make_m{
	 				 color: #FFFFFF;
	 				 background-color: #ff530f;
	 				 border-top-left-radius: 25rpx;
	 			 }
	 			 
	 		 }
	 	}
	 }
	 
 }
</style>
