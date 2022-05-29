<template>
	<view class="u-page">
		<!-- 顶部文字 -->
		<image class="logo" src="/static/logo.png"></image>
		<u--input v-model="login.mobile" :placeholder="loginForm.mobilePlaceholder" prefixIcon="phone"
			prefixIconStyle="font-size: 22px;color: #909399"></u--input>
		<u-checkbox-group placement="row" @change="checkboxChange">
			<u-checkbox v-model="login.agreements"  shape="circle" label="同意">

			</u-checkbox>
			<u-link href="https://uviewui.com/" text="用户服务协议" :under-line="true"></u-link>
			&
			<u-link href="https://uviewui.com/" text="隐私政策" :under-line="true"></u-link>

		</u-checkbox-group>
		<button class="send-btn" :disabled="!canLogin" :type="canLogin?'primary':'default'"
			@click="wxBindLogin">{{loginForm.submitBtnText}}</button>
	</view>
</template>

<script>
	import {
		wxLogin,wxAuthRedirect
	} from "../../../../config/api.js";
	import {
		msg,isWeiXinLogin
	} from "../../../../common/js/util.js";
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
			console.log("code", event.code, "state", event.state)
			if(isWeiXinLogin() === false){
				msg("暂不支持的方式");
				return;
			}
			if(event.code === undefined || event.state == undefined){
				this.linkWx();
			}
		},
		methods: {
			wxBindLogin() {
				if (this.login.agreements == false) {
					msg("请阅读用户服务协议");
					return;
				}
				const that = this;
				if (this.login.code == undefined || this.login.state == undefined) {
					wxLogin(that.login).then(res => {
						if (res.code == 0) {
							loginSuccess(res.data)
						} else if (res.code == 1002014005) {
							msg("操作太频繁")
						} else {
							msg(res.msg);
						}
					})
				}
			},
			checkboxChange(e) {
				this.login.agreements = !this.login.agreements;
			},
			linkWx(){
				let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址 
				wxAuthRedirect({
					"redirectUri": local,
				}).then(res => {
					console.log(res)
					if (res.code == 0) {
						window.location.href = decodeURIComponent(res.data);
					}
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
	
	.u-page {
		margin-top: 15rpx;
		padding: 0 30rpx;
	}
	
	.title {
		text-align: center;
		padding-bottom: 5px;
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
