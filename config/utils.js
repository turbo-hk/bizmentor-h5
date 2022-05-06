import config from "./index.js";

const Utils = {
	NAVIGATE_TO_AUTHED_URL(navigate_url) {
		let authorization = uni.getStorageSync("authorization");
		if (authorization) {
			this.navigateToUrl(navigate_url)
		} else {
			this.toLogin();
		}
	},
	navigateToUrl(full_path) {
		uni.navigateTo({
			url: full_path,
			success: res => {},
			fail: (e) => {
				console.log(e)
			},
			complete: () => {}
		});
	},
	toIndex() {
		uni.switchTab({
			url: '/pages/news/list'
		});
	},
	toLogin() {
		this.navigateToUrl("/pages/home/user/login-page/pwd-login/pwd-login")
	},
	apiHeaders(){
		const authorization = uni.getStorageSync("authorization");
		console.log("authorization", authorization)
		return {
			"tenant-id": config.TENANT_ID,
			"Authorization": "Bearer " + authorization
		}
	},
	hasLogin() {
		console.log('haslogin', uni.getStorageSync("authorization"))
		console.log('haslogin', uni.getStorageSync("authorization") ? true : false)
		return uni.getStorageSync("authorization") ? true : false;
	},
	logout() {
		uni.clearStorageSync();
	},
	userInfo() {
		console.log('token', uni.getStorageSync("authorization"))
		const loginUser = uni.getStorageSync("loginUser");
		console.log('登录状态', loginUser)
		if (!loginUser && this.hasLogin()) {
			console.log('强制拉取用户信息')
			this.getData('/member/user/get', {}, function(res) {
				console.log(res.data)
				uni.setStorageSync("loginUser", res.data);
			}, function() {})
		}
		return uni.getStorageSync("loginUser");
	},
	postData(url, json_data, success, fail) {
		const API_HEADER = this.apiHeaders();
		uni.request({
			url: config.API + url,
			method: 'POST',
			header: API_HEADER,
			data: json_data,
			success: res => success(res.data),
			fail: res => fail(res),
			complete: () => {}
		});
	},
	getData(url, json_data, success, fail) {
		const API_HEADER = this.apiHeaders();
		uni.request({
			url: config.API + url,
			method: 'GET',
			header: API_HEADER,
			data: json_data,
			success: res => success(res.data),
			fail: res => fail(res),
			complete: () => {}
		});
	}
}

export default Utils;
