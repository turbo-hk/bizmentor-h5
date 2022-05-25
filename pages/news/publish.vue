<template>
	<view class="container">
		<editor1 :store_detail="store_detail" @getContents="getContents" class="bg" style="height: 60vh;"></editor1>

	</view>
</template>

<script>
	import Utils from "/config/utils.js";
	import editor1 from '../../components/editor/editor.vue'

	export default {
		components: {
			editor1
		},
		data() {
			return {
				store_detail: '开始输入...'
			}
		},
		methods: {
			getContents(html) {
				this.store_detail = html
			}
		}
	}
</script>

<style>
	.container {
		padding: 10px;
	}
</style>
