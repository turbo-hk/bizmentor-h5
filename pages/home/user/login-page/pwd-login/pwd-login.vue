<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">用户名密码登录</text>
		<input class="input-box" :inputBorder="false" v-model="login.username"
			:placeholder="pwdLoginForm.placeholder" />
		<input type="password" class="input-box" :inputBorder="false" v-model="login.password"
			:placeholder="pwdLoginForm.passwordPlaceholder" />
		<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
			@click="pwdLogin">{{pwdLoginForm.login}}</button>
		<!-- 忘记密码 -->
		<view class="auth-box">
			<text class="link" @click="toRetrievePwd">{{pwdLoginForm.forgetPassword}}</text>
			<text class="link" @click="toRegister">{{pwdLoginForm.register}}</text>
		</view>
	</view>
</template>

<script>
	import loginSuccess from '../common/loginSuccess.js';
	import Utils from "/config/utils.js";
	export default {
		data() {
			return {
				pwdLoginForm: {
					login: "登录",
					placeholder: "请输入手机号/用户名",
					passwordPlaceholder: "请输入密码",
					forgetPassword: "忘记密码",
					register: "注册账号",
				},
				login: {
					username: undefined,
					password: undefined,
				},
				isWeixin: false,

			}
		},
		computed: {
			canLogin() {
				return this.login && this.login.username && this.login.username.length && this.isPwd;
			},
			isPwd() {
				return this.login && /^.{6,20}$/.test(this.login.password);
			},
			isPhone() {
				return this.login && /^1\d{10}$/.test(this.login.phone);
			}
		},
		onLoad() {},
		methods: {
			pwdLogin() {
				const that = this;
				Utils.postData('/member/auth/login', {
					"mobile": this.login.username,
					"password": this.login.password
				}, function(res) {
					if (res.code != 0) {
						uni.showToast({
							title: res.msg || '登录失败',
							icon: 'none'
						});
					} else {
						res.data.username = that.login.username;
						loginSuccess(res.data)
					}
				}, function() {})
			},
			toRetrievePwd() {

			},
			toRegister() {
				Utils.navigateToUrl('/pages/home/user/login-page/register/register')
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

	.input-box {
		padding: 0 15px;
		margin-bottom: 10px;
		background-color: #F8F8F8;
		border-radius: 6px;
		font-size: 28rpx;
	}

	.input-box,
	.get-code {
		height: 45px;
		line-height: 45px;
	}

	.title {
		text-align: center;
		padding-bottom: 5px;
	}

	.send-btn {
		width: 100%;
		margin-top: 15px;
		border-radius: 6rpx;
	}

	.auth-box {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 20px;
	}

	.link {
		color: #04498c;
	}

	.auth-box .link {
		font-size: 26rpx;
	}
</style>
