<template>
	<view class="index">
		<scroll-view class="subject" scroll-x="true"  enable-flex="true">
				<view @click="changeitem(v.id,i)" :class="{'active':index==i}" class="subject_item" v-for="(v,i) in channellist" :key="i">
                      {{v.name}}
				</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="goods_list" @scrolltolower='scrolltoupper' >
       <showgoods :showgood="showlist"></showgoods>
		</scroll-view>
	</view>
</template>
<script>
	import showgoods from "../../components/showgoods.vue"
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
		components:{
		showgoods
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
		}
}
</style>
