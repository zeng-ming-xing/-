<template>
	<view class="index">
		<scroll-view class="subject" scroll-x="true"  enable-flex="true">
				<view @click="changeitem(v.id,i)" :class="{'active':index==i}" class="subject_item" v-for="(v,i) in channellist" :key="i">
                      {{v.name}}
				</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="goods_list" @scrolltolower='scrolltoupper' >
		<view class="showlist">
			<view @click="Godetail(v)" class="list_item" v-for="(v,i) in showlist" :key="i">
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
		</scroll-view>
	</view>
</template>
<script>
	import {request} from "../../request/request.js"
	export default {
		data() {
			return {
			backtop:false,
			 id:0,
             list_id:'',
			 showlist:[],
			 index:0,
			 channellist: [{
			 	id: 0,
			 	name: "9.9包邮",
			 	path: "../../static/22/99baoyou.png"
			 }, {
			 	id: 1,
			 	name: "今日爆款",
			 	path: "../../static/22/jinribaokuan.png"
			 }, {
			 	id: 2,
			 	name: "品牌好货",
			 	path: "../../static/22/ziyuan.png"
			 }, {
			 	id: 4,
			 	name: "猜你喜欢",
			 	path: "../../static/22/cainixihuan.png"
			 }, {
			 	id: 5,
			 	name: "实时热销",
			 	path: "../../static/22/shishirexiaobang.png"
			 }, {
			 	id: 8,
			 	name: "高佣榜单",
			 	path: "../../static/22/yongjin.png"
			 }]
			}
		},
		onLoad(v){
			//路由跳转获取商品
			const {id}=v;
			const {index}=v
			this.id=id
			this.index=index
			console.log(id)
			request({url:'/v1/pdd/goods-list',method:'GET',data:{
				channel_type:id
			}}).then(res=>{
				this.list_id=res.data.data.list_id;
				let list=res.data.data.list;
				this.showlist=list	
			},err=>{
				console.log(err)
			})
		},
		methods: {
			//根据参数获取商品
            changeitem(id,i){
				this.index=i
				request({url:'/v1/pdd/goods-list',method:'GET',data:{
					channel_type:id
				}}).then(res=>{
					this.list_id=res.data.data.list_id;
					let list=res.data.data.list;
					this.showlist=list	
				},err=>{
					console.log(err)
				})
			},
			//触底加载更多
			scrolltoupper(e){
				request({url:'/v1/pdd/goods-list',method:'GET',data:{
					channel_type:this.id,
					list_id:this.list_id
				}}).then(res=>{
					this.list_id=res.data.data.list_id;
					let list=res.data.data.list;
					this.showlist.push(...list)
				},err=>{
					console.log(err)
				})
			},
			//商品详情页跳转
			Godetail(v){
				const value=JSON.stringify(v)
				uni.navigateTo({
					url:'../details/details?v='+value
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
.index{
	width: 100%;
	overflow: hidden;
	.subject{
	position: fixed;
	z-index: 9999;
	width: 100%;
	padding: 10rpx;
	display: flex;
	white-space: nowrap;
	background-color: #CCCCCC;
	height: 44rpx;
		.subject_item{
		display: inline-block;
		flex: 1;
        padding: 0 30rpx;
		height: 44rpx;
		}
		.active{
			background-color: #F1F1F1;
			border-radius: 20rpx;
			color: red;
		}
		}
		.goods_list{
			margin-top: 64rpx;
			width: 100%;
			height: calc(100vh - 64rpx);
		.showlist{
			background-color: #F1F1F1;
			width: calc(100% - 1px);
			border: 1px solid #F1F1F1;
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
		}
}
</style>
