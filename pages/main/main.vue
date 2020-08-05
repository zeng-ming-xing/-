<template>
	<view class="main">
		<!--导航-->
		<view class="nav">
			<view class="navbar">
				<view class="main_search">
					<uni-icons type="search" size="30rpx"></uni-icons>
					点击搜索更多优惠
				</view>
			</view>
			<view class="category">
				<scroll-view class="cate" scroll-x="true" enable-flex="true">
					<view @click="changeitem(v,i)" class="cate_item" v-for="(v,i) in list" :key="i" :class="{'active':index==i}">
						{{v.name}}
					</view>
				</scroll-view>
				<view class="allcate">
					全部<uni-icons type="more" color="#FFFFFF"></uni-icons>
				</view>
			</view>

		</view>
		<scroll-view scroll-y="true" class="main_view">
			<!--轮播-->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(v,i) in swiperList" :key="v.id">
					<image @click="Gotheme(v)" class="swiper" :src="v.image_url" mode=" widthFix"></image>
				</swiper-item>
			</swiper>
			<!--主题分类-->
			<view class="channel">
				<view @click="Goindex(v.id,i)" class="channel_item" v-for="(v,i) in channellist" :key="v.id">
					<image :src="v.path"  mode="widthFix"></image>
					<view>{{v.name}}</view>
				</view>
			</view>
		   <!--今日爆款-->
			<view class="today_hot">
				<view class="today_title">
				<view class="title">爆品推荐</view>
				<view class="more">左滑更多</view>
				</view>
				 <scrollX :today="today" @loadmore="Loadmore"> 
				 </scrollX>
			</view>
		    <!--拼多多，京东-->
			<soft></soft>
			<!--排序-->
			<rank></rank>
		</scroll-view>
	</view>
</template>

<script>
	import scrollX from "../../components/srcollX.vue"
	import soft from "../../components/soft.vue"
	import rank from "../../components/rank.vue"

	import {
		request
	} from '../../request/request.js'
	export default {
		data() {
			return {
				today:[],
				swiperList: [],
				index: 0,
				list_id:'',
				list: [{
					id: 20100,
					name: '百货'
				}, {
					id: 20200,
					name: '母婴'
				}, {
					id: 20300,
					name: '视频'
				}, {
					id: 20400,
					name: '女装'
				}, {
					id: 20500,
					name: '电器'
				}, {
					id: 20600,
					name: '鞋包'
				}, {
					id: 20700,
					name: '内衣'
				}, {
					id: 20800,
					name: '美妆'
				}, {
					id: 20900,
					name: '男装'
				}, {
					id: 21000,
					name: '水果'
				}, {
					id: 21100,
					name: '家纺'
				}, {
					id: 21200,
					name: '文具'
				}, {
					id: 21300,
					name: '运动'
				}, {
					id: 21400,
					name: '虚拟'
				}, {
					id: 21500,
					name: '汽车'
				}, {
					id: 21600,
					name: '家装'
				}, {
					id: 21700,
					name: '家具'
				}, {
					id: 21800,
					name: '医药'
				}],
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
		methods: {
			//获取轮播图数据
			getswiper() {
				request({
					url: '/v1/pdd/themes-list',
					method: 'GET'
				}).then(
					res => {
						this.swiperList = res.data.data.list
					

					}, err => {
						console.log(err)
					})
			},
			//切换主题切换数据
			changeitem(v, i) {
				this.index = i
			},
			//轮播图主题跳转
			Gotheme(v) {
				uni.navigateTo({
					url: '../theme/theme?id=' + v.id + '&img_url=' + v.image_url
				})
			},
			//活动主题跳转
			Goindex(id,i){
				uni.navigateTo({
					url: '../index/index?id='+id+'&index='+i
				})
			},
			//获取今日热卖
			getTodayShow(){
				request({
					url: '/v1/pdd/goods-list',
					method: 'GET',
					data:{channel_type:7}
				}).then(
					res => {
						console.log(res)
						this.today=res.data.data.list;
						this.list_id=res.data.data.list_id	
					}, err => {
						console.log(err)
					})
			},
			Loadmore(){
				request({
					url: '/v1/pdd/goods-list',
					method: 'GET',
					data:{channel_type:7,
					      list_id:this.list_id
					  }
				}).then(
					res => {
						console.log(res)
						const list=res.data.data.list;
						this.today.push(...list);
						this.list_id=res.data.data.list_id	
					}, err => {
						console.log(err)
					})
			}
		},
		components: {
			scrollX,
			soft,
			rank
			
		},
		mounted() {
			this.getswiper()
			this.getTodayShow()
		}



	}
</script>

<style lang="less" scoped>
	.main {
		width: 100%;
		overflow: hidden;

		/*导航*/
		.nav {
			height: 12vh;
			width: 100%;
			background-color: #f09d66;
			padding-top: 7%;
			position: fixed;
			z-index: 99999;

			.category {
				width: 100%;
				white-space: nowrap;
				height: 44rpx;
				position: relative;
				top: 30rpx;

				.allcate {
					width: 15%;
					position: absolute;
					right: 0;
					top: 0;
					color: #FFFFFF;
					font-size: 33rpx;
				}

				.cate {
					margin-top: 10rpx;
					width: 80%;
					height: 44rpx;
					border-right: 1px solid #FFFFFF;
					display: flex;
					white-space: nowrap;

					.cate_item {
						display: inline-block;
						flex: 1;
						color: #FFFFFF;
						height: 46rpx;
						line-height: 46rpx;
						padding: 0 30rpx;


					}

					.active {
						background-color: #FFFFFF;
						color: #f09d66;
						border-radius: 20rpx;

					}
				}

			}

			.navbar {
				width: 100%;

				.main_search {
					border: 1px solid #CCCCCC;
					border-radius: 30rpx;
					font-size: 30rpx;
					color: #CCCCCC;
					width: 60%;
					height: 40%;
					margin-left: 40rpx;
					background-color: #ffffff;
					text-align: center;
					vertical-align: text-bottom;

				}
			}
		}

		/*滚动*/
		.main_view {
			.today_hot{
				width: calc(100%-40rpx);
				padding: 20rpx;
				background-color: #F1F1F1;
			.today_title{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title{
					font-family: Arial, Helvetica, sans-serif;
					font-size: 35rpx;
					font-weight: bolder;
					flex: 1;
				}
				.more{
					text-align: right;
					font-size: 29rpx;
					color: #C8C7CC;
				}
			
			}
			}
			margin-top: 15vh;
			width: 100%;
			.swiper {
				width: 100%;

			}
			.channel {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				background-color: #F1F1F1;
				padding-bottom: 8rpx 0;
			}
			.channel_item{
				flex: 1;
				padding: 10rpx 51rpx;
				image{
					width: 100rpx;
				}
			}
		}
	}
</style>
