<template>
	<view class="u-page">
		<!-- 底部导航栏 -->
		<app-footer :index="2"></app-footer>
	</view>
</template>

<script>
	import Footer from '@/pages/common/footer-tabbar.vue';
	export default {
		data() {
			return {
			}
		},
		components: {
			'app-footer': Footer,
		},
		onLoad() {
		},
		
		methods: {
	
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
