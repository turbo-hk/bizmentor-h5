const http = uni.$u.http;
import qs from 'qs';

import {
	addURLParam
} from "@/common/js/util.js";

import {
	getEnv
} from "@/config/env.js"

/**
 * 文章列表
 */
export const contentList = (params, config = {}) => http.post('/content/page', params, config);

/**
 * 文章详情
 */
export const contentDetail = (params, config = {}) => http.get('/content/detail', {
	"params": params
}, config);
/**
 * 文章阅读
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const contentRead = (params, config = {}) => http.post('/content/read', params, config);

/**
 * 点赞
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const contentDianzan = (params, config = {}) => http.post('/content/dz', params, config);

/**
 *  收藏
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const contentShoucang = (params, config = {}) => http.post('/content/sc', params, config);

/**
 * 创建订单
 */
export const createOrder = (params, config = {}) => http.post('/content/pay/create', params, config);

/**
 * 提交订单
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const submitOrder = (params, config = {}) => http.post('/pay/order/submit', params, config);

/**
 * 微信授权登录链接获取
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const wxAuthRedirect = (params, config = {}) => {
	let env = getEnv();
	params["type"] = env.wxLoginType;
	params["tenant-id"] = env.tenantId;
	return http.get('/member/auth/social-auth-redirect', {
		"params": params
	}, config);
};


/**
 * 微信jsApi签名  form提交
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const wxJsApiSign = (params, config = {
	"header": {
		'Content-Type': "application/x-www-form-urlencoded;charset=utf-8;"
	}
}) => http.post('/member/wx-mp/create-jsapi-signature', params, config);

/**
 * 微信绑定手机号码登录
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const wxLogin = (params, config = {}) => http.post('/member/auth/social-bind-login/no-sms-code', params, config);

/**
 * 密码登录
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const pwdLogin = (params, config = {}) => http.post('/member/auth/login', params, config);

/**
 * 获取用户信息
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const getMemberUser = (params, config = {}) => http.get('/member/user/get', params, config);

/**
 * 获取账户信息
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const getAccount = (params, config = {}) => http.get('/user/member/account/balance', params, config);

/**
 * 退出登录
 * 
 * @param {*} params 
 * @param {*} config 
 */
export const logout = (params, config = {}) => http.post('/member/auth/logout', params, config);

