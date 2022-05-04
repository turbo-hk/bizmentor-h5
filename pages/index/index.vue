<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">123</text>
		<!-- 登录框 -->
		<input type="number" class="input-box" :inputBorder="false" v-model="phone" maxlength="11"
			placeholder="请输入手机号码" />
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
			}
		},
		onLoad() {

		},
		methods: {
			sendShortMsg(){
				
			}

		}
	}
</script>

<style>
</style>
