import config from "./index.js";

var API = config.API;
var API_HEADER = config.API_HEADER;

const Utils = {
    NAVIGATE_TO_AUTHED_URL(navigate_url) {
        let authorization = uni.getStorageSync("authorization");
        if (authorization) {
            this.navigateToUrl(navigate_url)
        } else {
            this.toLogin();
        }
    }, navigateToUrl(full_path) {
        uni.navigateTo({
            url: full_path, success: res => {
            }, fail: (e) => {
                console.log(e)
            }, complete: () => {
            }
        });
    }, toIndex() {
        uni.switchTab({
            url: '/pages/news/list'
        });
    }, toLogin() {
        this.navigateToUrl("/pages/home/user/login-page/pwd-login/pwd-login")
    }, hasLogin() {
        return uni.getStorageSync("authorization") ? true : false;
    }, logout() {
        uni.clearStorageSync();
    }, loginUser() {
        return uni.getStorageSync("loginUser");
    }, postData(url, json_data, success, fail) {
        uni.request({
            url: API + url,
            method: 'POST',
            header: API_HEADER,
            data: json_data,
            success: res => success(res.data),
            fail: res => fail(res),
            complete: () => {
            }
        });
    }, getData(url, json_data, success, fail) {
        uni.request({
            url: API + url,
            method: 'GET',
            header: API_HEADER,
            data: json_data,
            success: res => success(res.data),
            fail: res => fail(res),
            complete: () => {
            }
        });
    }
}

export default Utils;
