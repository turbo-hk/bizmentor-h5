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
		//this.navigateToUrl("/pages/home/user/login-page/pwd-login/pwd-login")
		//this.navigateToUrl("/pages/home/user/login-page/wx-mp-login/wx-mp-login")
		//请求微信接口，用来获取code
		let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
		Utils.getData('/member/auth/social-auth-redirect', {
			"redirectUri": local,
			"type": 31,
			"tenant-id": 123
		}, function(res) {
			console.log(res)
			if (res.code == 0) {
				window.location.href = res.data;
			}
		}, function() {

		})
	},
	apiHeaders(type) {
		const authorization = uni.getStorageSync("authorization");

		if (type) {
			return {
				"tenant-id": config.TENANT_ID,
				"Authorization": "Bearer " + authorization,
				"Content-Type": type
			}
		}
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
	postForm(url, json_data, success, fail) {
		const API_HEADER = this.apiHeaders("application/x-www-form-urlencoded;charset=utf-8;");
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
	},
	isWeiXinLogin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true; // 微信中打开
		} else {
			return false; // 普通浏览器中打开
		}
	},
	getPageUrl() {
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		let curRoute = routes[routes.length - 1].route //获取当前页面路由
		let curParam = routes[routes.length - 1].options; //获取路由参数
		// 拼接参数
		let param = ''
		for (let key in curParam) {
			param += '&' + key + '=' + curParam[key]
		}
		let data = {}
		data.curRoute = curRoute
		data.curParam = curParam
		return data;
	}
}

export default Utils;
