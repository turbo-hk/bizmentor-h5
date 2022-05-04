<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">
			<uni-forms-item name="mobile" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="register.mobilePlaceholder"
					v-model="formData.mobile" trim="both" maxlength="11" />
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="register.nicknamePlaceholder"
					v-model="formData.nickname" trim="both" style="width: 660rpx;" />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="register.passwordDigitsPlaceholder"
					type="password" v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="repeatPassword" v-model="formData.repeatPassword" required>
				<uni-easyinput :inputBorder="false" class="easyinput" :placeholder="register.passwordAgain"
					type="password" v-model="formData.repeatPassword" trim="both" />
			</uni-forms-item>
			<button class="send-btn" type="primary" @click="submit">{{register.registerAndLogin}}</button>
		</uni-forms>
	</view>
</template>

<script>
	import loginSuccess from '../common/loginSuccess.js';
	import Utils from "/config/utils.js";
	export default {
		data() {
			return {
				register: {
					mobilePlaceholder: "请输入手机号码",
					nicknamePlaceholder: "请输入用户昵称",
					passwordDigitsPlaceholder: "请输入6-20位密码",
					passwordAgain: "再次输入密码",
					registerAndLogin: "注册并登录"
				},
				formData: {
					"mobile": "",
					"nickname": "",
					'password': '',
					'repeatPassword': ''
				},
				rules: {
					"mobile": {
						"rules": [{
								required: true,
								errorMessage: '请输入手机号码',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (/^1\d{10}$/.test(value)) {
										return true;
									} else {
										callback('请输入正确的手机号码')
									}
								}
							}
						],
						"label": "用户名"
					},
					"password": {
						"rules": [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								minLength: 6,
								maxLength: 20,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							}
						],
						"label": "密码"
					},
					"repeatPassword": {
						"rules": [{

								required: true,
								errorMessage: '再次输入密码',

							},
							{
								minLength: 6,
								maxLength: 20,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									console.log(value);
									if (value != data.password) {
										callback('两次输入密码不一致')
									};
									return true
								}
							}
						],
						"label": "确认密码"
					}
				},
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '注册'
			})
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				});
				this.$refs.form.validate().then((res) => {
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			submitForm(params) {
				const that = this;
				Utils.postData("/member/auth/register", params, function(res) {
					if (res.code != 0) {
						uni.showToast({
							title: res.msg || '注册失败',
							icon: 'none'
						});
					} else {
						loginSuccess(res.data)
					}
				}, function() {

				})
			}
		}
	}
</script>

<style>
	@import url("../common/login-page.css");

	.uni-container {
		padding: 15px;
	}

	.send-btn {
		margin-top: 5px;
	}

	.uni-container ::v-deep .uni-forms-item__label {
		width: 15px !important;
	}
</style>
