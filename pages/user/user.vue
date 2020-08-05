<template>
	<view class="user">
		<!--用户信息展示-->
		<view class="user_item">
			<image class="user_bac" :src="userimg" mode="scaleToFill" >
			<view class="user_info" v-if="show">
				<image :src="userimg" mode="widthFix"></image>
				<view>{{username}}</view>
			</view>
			<view class="user_login" v-else>
				<button type="primary" plain open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">登录</button>
			</view>
			</image>
		</view>
		<!--用户足迹等-->
		<view class="user_move">
			<view class="move_item">
				<image mode="widthFix" src="../../static/11/dingyue.png"></image>
				<view>订阅</view>
			</view>
			<view class="move_item">
				<image mode="widthFix" src="../../static/11/A.png"></image>
				<view>足迹</view>
			</view>
			<view class="move_item">
				<image mode="widthFix" src="../../static/11/shoucangaixin.png" ></image>
				<view>收藏</view>
			</view>
		</view>
		<!--用户获益情况-->
		<view class="user_account">
			<view class="my_account common">
				<view class="title">
					<label>我的钱包</label>
					<uni-icons type="help"></uni-icons>
				</view>
				<view class="contact">
					<view class="account_ing">入账中</view>
					<view class="account_money">0.00元</view>
					<view class="account_date">每日21日到账</view>
					<view class="num_account">
						<text>今日 0.00</text>
						<text>累计 0.00</text>
					</view>
				</view>
			</view>
			<view class="account_details common">
				<view class="title_right">
					<label>账户明细</label>
					<uni-icons type="arrowright"></uni-icons>
				</view>
				<view class="r_account">
					<view class="r_ing">可提现</view>
					<view class="r_money">0.00元</view>
					<view class="goto">
						<button type="warn">去提现</button>
					</view>
				</view>
			</view>

		</view>
		<!--用户服务-->
		<view class="user_service">
			<view class="common_service order">
				<view class="l_contact">
				<uni-icons type="compose"></uni-icons> 佣金订单</view>
				<view class="r_icon"><uni-icons type="arrowright"></uni-icons></view>
			</view>
			<view class="subordinate common_service">
				<view class="l_contact">
				<uni-icons type="person"></uni-icons>我的下级</view>
				<view class="r_icon"><uni-icons type="arrowright"></uni-icons></view>
			</view>
			<view class="seeting common_service">
				<view class="l_contact">
				<uni-icons type="settings"></uni-icons>授权设置</view>
				<view class="r_icon"><uni-icons type="arrowright"></uni-icons></view>
			</view>
			<view class="customer_service common_service">
				<view class="l_contact" @click="help">
				<uni-icons type="headphones"></uni-icons>客服</view>
				<view class="r_icon"><uni-icons type="arrowright"></uni-icons></view>
			</view>
			<view class="Strategy common_service">
				<view class="l_contact">
				<uni-icons type="flag"></uni-icons>新手攻略</view>
				<view class="r_icon"><uni-icons type="arrowright"></uni-icons></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../request/request.js"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	export default {
		data() {
			return {
				username: "",
				userimg: null,
				show:false,
			}
		},
		components: {
			uniIcons
		},
		mounted() {
			//判断本地有没有用户信息
			const userinfo = uni.getStorageSync("usrinfo");
			if (userinfo === "") {
				this.show = false
			} else {
				this.show = true
			}
			this.username = userinfo.nickName;
			this.userimg = userinfo.avatarUrl;
		},
		methods: {
			help(){
			},
			getuserinfo() {
				//获取用户信息
				//先将this进行定义 否则this无法正常使用
				let that = this
				uni.authorize({
						scope: "scope.userInfo",
						success() {
							uni.getUserInfo({
								success(res) {
									uni.setStorageSync("usrinfo", res.userInfo);
									that.username = res.userInfo.nickName;
									that.userimg = res.userInfo.avatarUrl;
									//获取用户登录时的code
									uni.login({
										success(res) {

											const codeing = res.code;
											request({
												url: "/v1/mini_get_openid",
												data:{code:codeing},
												method:"POST"
											}).then(result => {
	
												const openid = result.data.data.openid;

												uni.setStorageSync("openid", openid)
											}, err => {
												console.log(err)
											})
									that.show=true
										}
									})
								}
							},err=>{
								return 
							})
						}
					})

				
			}
		}
	}
</script>

<style lang="less" scoped>
	.user {
		width: 100%;
		.user_item {
			width: 100%;
			height: 30vh;
			overflow: hidden;
			position: relative;
			.user_bac{
				width: 100%;
				filter: blur(10px);
				position: absolute;
				z-index: -99;
			}
			.user_login {
				width: 80%;
				height: 100%;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50%;
			}

			.user_info {
				width: 80%;
				height: 100%;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50%;
				

				image {
					width: 150rpx;
					border-radius: 50%;
				}
			}
		}

		.user_move {
			margin: 0 auto;
			width: 80%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			background-color: #F8F8F8;
			margin-top: -30rpx;

			.move_item {
				flex: 1;
				text-align: center;

				image {
					width: 50rpx;
				}

			}
		}

		.user_account {
			height: 300rpx;
			width: 680rpx;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			border-radius: 20rpx;
			border: 1px solid #CCCCCC;

			.common {
				flex: 1;
				display: flex;
				flex-direction: column;
				height: 100%;
				padding: 20rpx;
			}

			.my_account {
				

				.title {
					color: #CCCCCC;
					font-size: 30rpx;
				}

				.contact {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: calc(100% - 50rpx);
					border-right: 1px solid #dae3f1;

					.account_ing {
						flex: 1;
						padding: 10rpx;
                        color:#CCCCCC;
					}

					.account_money {
						flex: 3;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 40rpx;
					}

					.account_date {
						flex: 1;
						color: #CCCCCC;
					}

					.num_account {
						flex: 1;
					}

				}

			}

			.account_details {
				.title_right {
					text-align: right;
					font-size: 30rpx;
					color: #CCCCCC;
				}

				.r_account {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: calc(100% - 50rpx);

					.r_ing {
						flex: 1;
						padding: 10rpx;
						color: #CCCCCC;
					}

					.r_money {
						flex: 3;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 40rpx;
					}

					.goto {
						flex: 2;

						button {}
					}

				}
			}

		}

		.user_service {
			margin-top: 30rpx;
			display: flex;
			height: 400rpx;
			flex-direction: column;
			width: 100%;
			.common_service {
				margin: 20rpx 0;
				font-size: 30rpx;
				padding: 0 20px;
				display: flex;
				.l_contact{
					flex:2;
				}
				.r_icon{
					flex: 4;
					text-align: right;
				}
			}

		}
	}
</style>
