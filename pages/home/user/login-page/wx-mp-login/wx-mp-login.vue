<template>
	<view class="content">
		<!-- 顶部文字 -->
		<view class="bottom-side-otherLogin" @click="getWeChatCode">
			<button type="primary" class="share-button" plain="true">微信授权登录</button>
		</view>
	</view>
</template>

<script>
	import Utils from "/config/utils.js";
	export default {
		data() {
			return {
				isWeixin: false,

			}
		},
		computed: {

		},
		onLoad() {},
		methods: {
			/*微信登录相关  start*/
			//方法：用来判断是否是微信内置的浏览器
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},
			//请求微信接口，用来获取code
			getWeChatCode() {
				let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
				Utils.getData('/member/auth/social-auth-redirect', {
					"redirectUri": local,
					"type": 31,
					"tenant-id": 123
				}, function(res) {
					console.log(res)
					if (res.code == 0) {
						window.location.href = res.data;
					}
				}, function() {

				})
			},

		}
	}
</script>

<style>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.content {
		padding: 0 50rpx;
		width: 750rpx;
		flex: 1;
	}

	.send-btn {
		width: 100%;
		margin-top: 15px;
		border-radius: 6rpx;
	}
</style>
