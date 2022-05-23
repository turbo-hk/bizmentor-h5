<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title"></text>
		<image class="logo" src="/static/logo.png"></image>
		<input class="input-box" :inputBorder="false" v-model="login.mobile"
			:placeholder="loginForm.mobilePlaceholder" />
		<checkbox-group @change="checkboxChange">
			<label>
				<checkbox v-model="login.agreements" :checked="login.agreements" /><text
					class="tip">同意用户服务协议&隐私政策</text>
			</label>
		</checkbox-group>

		<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
			@click="wxBindLogin">{{loginForm.submitBtnText}}</button>
	</view>
</template>

<script>
	import Utils from "/config/utils.js";
	import loginSuccess from '../common/loginSuccess.js';
	export default {
		data() {
			return {
				login: {
					mobile: undefined,
					smsCode: "9999",
					agreements: false,
					code: undefined,
					state: undefined,
					"type": 31,
				},
				loginForm: {
					mobilePlaceholder: "请输入手机号",
					smsCodePlaceholder: "请输入验证码",
					phoneLoginTip: "未注册的手机号验证通过后自动注册",
					submitBtnText: "绑定手机号码"
				},
			}
		},
		computed: {
			canLogin() {
				return this.login.mobile && this.login.mobile.length && this.isPhone;
			},
			isPhone() {
				return this.login && /^1\d{10}$/.test(this.login.mobile);
			}
		},
		onLoad(event) {
			this.login.code = event.code;
			this.login.state = event.state;
			console.log(this.login)
		},
		methods: {
			wxBindLogin() {
				const that = this;
				if (this.login.code == undefined || this.login.state == undefined) {
					Utils.postData('/member/auth/social-bind-login/no-sms-code', that.login, function(res) {
						if (res.code == 0) {
							loginSuccess(res.data)
						} else if(res.code == 1002014005){
							uni.showToast({
								title: '操作太频繁',
								icon: 'none'
							});
						}else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}, function() {
					
					})
				}
				if (this.login.agreements == false) {
					uni.showToast({
						title: '请阅读用户服务协议',
						icon: 'none'
					});
					return;
				}
				Utils.postData('/member/auth/social-bind-login/no-sms-code', that.login, function(res) {
					if (res.code == 0) {
						loginSuccess(res.data)
					} else if(res.code == 1002014005){
						uni.showToast({
							title: '操作太频繁',
							icon: 'none'
						});
					}else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}, function() {
				
				})
				// Utils.postData('/member/auth/check-mobile', this.login, function(res) {
				// 	if (res.code != 0) {
				// 		uni.showToast({
				// 			title: res.msg,
				// 			icon: 'none'
				// 		});
				// 	} else {

				// 	}
				// }, function() {})
			},
			checkboxChange(e){
				console.log(e)
				this.login.agreements = !this.login.agreements;
			}
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


	.tip {
		color: #666666;
		font-size: 26rpx;
		margin: 6px 0;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
</style>
