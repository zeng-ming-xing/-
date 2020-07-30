<template>
	<view class="user">
	    <view class="user_item">
			  <view class="user_info">
				   <button type="primary" plain open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">登录</button>
			  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{}
			}
		},
		methods: {
			getuserinfo(){
				//获取用户信息
				//先将this进行定义 否则this无法正常使用
				let that=this
                 uni.authorize({
                 	scope:"scope.userInfo",
					  success() {
						  uni.getUserInfo({
						  	success(res) {
						  		console.log(res.userInfo);
								uni.setStorageSync("usrinfo",res.userInfo);
								that.userinfo=res.userInfo;
								console.log(that.userinfo)
								}
						  	})
					  }
                 }),
				 uni.getSetting({
				 	success(res) {
						console.log(res)
						}
				 }),
				 //获取用户登录时的code
				 uni.login({
				 	success(res) {	
						console.log(res)
				 	}
				 })
			}
		}
	}
</script>

<style lang="less" scoped>
	.user{
		width: 100%;
		.user_item{
			width: 100%;
			height: 30vh;
			background-color:#ffaa7f;
			.user_info{
				width: 80%;
				height: 100%;
				margin: 0 auto;
        display: flex;
      justify-content: center;
					  align-items: center;
					  width: 50%;
			}
		}
	}
  
</style>
