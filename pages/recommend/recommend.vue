<template>
	<view class="recommend">
		<view  class="nav">
			 <view  v-for="(v,i) in itemList" :class="{'active':item==i}" @click="itemchange(i)" :key="i" class="nav_item">
				 {{v}}
			 </view>
		 </view>
		 <scroll-view scroll-y='true'  class="item_show">
			<view v-for="(v,i) in showlist" :key="v.id" class="scroll" @click="Gotheme(v)">
				<image :src="v.image_url" mode="widthFix" ></image>
				<view>{{v.name}}</view>
			</view>
		 </scroll-view>
	</view>
</template>

<script>
	import navbar from '../../components/navbar.vue'
	import {
		request
	} from '../../request/request.js'
	export default {
		data() {
			return {
				item:0,
				itemList:['主题潮品','排行榜','店铺神卷'],
				showlist:[]
			}
		},
		methods: {
			//获取主题下标
			itemchange(i){
				this.item=i
			},
			//获取主题潮品数据
			getswiper() {
				request({
					url: '/v1/pdd/themes-list',
					method: 'GET'
				}).then(
					res => {
						this.showlist = res.data.data.list
						console.log(this.showlist)
					}, err => {
						console.log(err)
					})
			},
		//主题详情跳转
		Gotheme(v){
			uni.navigateTo({
				url:'../theme/theme?id='+v.id+'&img_url='+v.image_url
			})
		}
		},
		components:{
			navbar
		},
		mounted() {
			this.getswiper();
		}
		
	}
</script>

<style lang="less" scoped>
	.recommend{
		height: 100vh;
		.nav{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 35rpx;
			background-color:#CCCCFF;
			height: 80rpx;
			.nav_item{
				flex: 1;
				text-align: center;
			}
			.active{
				width: 40rpx;
				background-color: #FFFFFF;
				border-radius: 40rpx;
				padding: 8rpx;
			}
		}
	    .item_show{
			width: 100%;
			height: calc(100% - 80rpx);
			display: flex;
			flex-direction: column;
			background-color: #f9fff8;
			.scroll{
				
				padding: 20rpx;
				font-size: 36rpx;
				color: #9999FF;
				background-color: #FFFFFF;
				border: 1px solid #F1F1F1;
				image{
					width: 100%;
					border-radius: 18rpx;
				}
			}
		}
	}

</style>
