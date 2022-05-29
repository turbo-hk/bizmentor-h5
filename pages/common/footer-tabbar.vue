<template>
	<view class="footer-tabbar">
		<u-tabbar :value="index"  :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="tabbarClick('/pages/news/list')"></u-tabbar-item>
			<u-tabbar-item text="发布" icon="plus" @click="tabbarClick('/pages/news/push')"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="tabbarClick('/pages/home/index')"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import {navigateTo} from "../../common/js/util.js";
	export default {
		name: "footer-tabbar",
		props: {
			index: {
				type: Number,
				required: true,
				default: 1
			}
		},
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			tabbarClick(e) {
				navigateTo(e);
			},
		}
	}
</script>

<style>
</style>
