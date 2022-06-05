<template>
	<view class="u-page">
		<u--form labelPosition="left" :model="formField" :rules="rules" ref="form1">
			<u-form-item label="" prop="content">
				<u--textarea v-model="formField.content" placeholder="请输入反馈的内容" count :height="200" :maxlength="500">
				</u--textarea>
			</u-form-item>
			<u-form-item label="" prop="contact">
				<u--textarea v-model="formField.contact" placeholder="请输入联系方式" autoHeight count :maxlength="200">
				</u--textarea>
			</u-form-item>
		</u--form>
		<u-button @click="submit" type="primary" customStyle="marginTop:100rpx" :throttleTime="3000">提交</u-button>
	</view>
</template>

<script>
	import {
		msg
	} from "@/common/js/util.js";
	import {
		createFeedback
	} from "@/config/api.js";
	export default {
		data() {
			return {
				formField: {
					imageList: [],
					content: undefined,
					contact: undefined
				},
				formInitData: {
					files: [],
				},
				rules: {
					'content': {
						type: 'string',
						required: true,
						message: '请输入反馈的内容',
						trigger: ['blur', 'change']
					},
					'contact': {
						type: 'string',
						required: true,
						message: '请输入联系方式',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onLoad() {

		},
		methods: {
			submit() {
				this.$refs.form1.validate().then(res => {
					console.log(this.formField);
					createFeedback(this.formField).then(res => {
						console.log(res);
						if (res.code === 0) {
							msg("感谢您的反馈。")
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 2000);
						}
					})
				}).catch(errors => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.u-page {
		margin-top: 15rpx;
		padding: 0 30rpx;
	}
</style>
