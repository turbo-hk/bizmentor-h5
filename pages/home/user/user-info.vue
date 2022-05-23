<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title"></text>
		</view>
	</view>
</template>

<script>
	import Utils from "/config/utils.js";
	export default {
		data() {
			return {}
		},
		onLoad() {
			const hasLogin = Utils.hasLogin();
			console.log(hasLogin)
			if (!hasLogin) {
				Utils.toLogin();
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
