<template>
	<view class="themes">
		<view class="theme_img">
			<image :src="themeimg" mode="widthFix"></image>
		</view>
		<view class="theme_contact">
			<view v-for="(v,i) in themelist" :key="i" class="theme_item">
				<image :src="v.goods_image_url" mode="widthFix"></image>
				<view class="dis">
					<view class="item_name">
						{{v.goods_name}}
					</view>
				</view>
				<view class="item_account">
					<view class="priviliege">
						<view class="juan">
							<text class="j_r">卷</text>
							<text>￥{{v.coupon_price}}</text>
						</view>
						<view class="juan_m">
							卷后￥<text class="after_m">{{v.coupon_after_price}}</text>
						</view>
					</view>
					<view class="count">
						<view>销量{{v.sales_tip}}</view>
						<view>原价￥<text class="delete">{{v.min_group_price?v.min_group_price:v.min_normal_price}}</text></view>
					</view>
					<view class="make_m">
						<view class="up_vip">
							<uni-icons type="arrowthinup"></uni-icons>
							<text>升级赚:{{v.fanli_Money}}</text>
						</view>
						<view class="up_make">
							可赚:<text>￥{{v.fanli_Money/2 | ceil}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../request/request.js'
	export default {
		data() {
			return {
				themelist: [],
				themeimg: null,
				ceilmo: 0
			}
		},
		filters: {
			ceil(money) {
				return money.toFixed(2);
			}
		},
		methods: {},
		onLoad(option) {
			//根据主题id获取数据
			const {
				id
			} = option;
			const {
				img_url
			} = option;
			this.themeimg = img_url;
			console.log(this.themeimg)
			let url = '/v1/pdd/themes-goods-search/' + id
			request({
				url,
				method: 'GET'
			}).then(res => {
				this.themelist = res.data.data.list
			}, err => {
				console.log(err)
			})

		}
	}
</script>

<style lang="less" scoped>
	.themes {
		width: 100%;

		.theme_img {
			width: 100%;

			image {
				width: 100%;
			}
		}

		.theme_contact {
			width: calc(100% - 40rpx);
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx;
			justify-content: space-around;

			.theme_item {
				width: 48%;

				image {
					width: 100%;
					border-radius: 20rpx;
				}

				.dis {
					display: flex;

					.item_name {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}

				.item_account {
					padding-top: 13rpx;
					display: flex;
					flex-direction: column;
					padding: 10rpx;
					height: 18vh;


					.priviliege {
						flex: 2;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.juan {
							background-color: #FF3333;
							color: #FFFFFF;

							.j_r {
								border-right: 1px dashed #FFFFFF;
							}
						}

						.juan_m {
							color: #FF3333;

							.after_m {
								font-size: 45rpx;
							}
						}
					}

					.count {
						flex: 1;
						display: flex;
						justify-content: space-between;
						align-items: center;
						color: #999999;

						.delete {
							text-decoration: line-through;
							text-line-through-color: #999999;

						}

					}

					.make_m {
						flex: 2;
						display: flex;
						background-color: #FF3300;
						border-bottom-left-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
						justify-content: space-between;
						align-items: center;

						.up_vip {
							color: #660000;
						}

						.up_make {
							color: #FFFFFF;

							text {
								font-size: 38rpx;
							}
						}
					}
				}
			}

		}
	}
</style>
