import {
	toIndex,
	navigateTo,
	msg
} from "../../../../common/js/util.js";
import {
	getMemberUser
} from "../../../../config/api.js";
export default function(result) {
	console.log('登录成功', result);
	uni.setStorageSync("authorization", result.accessToken)
	getMemberUser().then(res => {
		if(res.code != 0){
			msg('登录失败')
			return;
		}
		msg('登录成功');
		let href = uni.getStorageSync("href");
		uni.clearStorageSync();
		uni.setStorageSync("loginUser", res.data);
		uni.setStorageSync("userId", result.userId);
		uni.setStorageSync("authorization", result.accessToken)
		var delta = 0 //判断需要返回几层
		let pages = getCurrentPages();
		// console.log(pages);
		pages.forEach((page, index) => {
			console.log(pages)
			// console.log(pages[pages.length-index-1].route.split('/')[2]);
			pages[pages.length - index - 1].route.split('/')
			if (pages[pages.length - index - 1].route.split('/')[2] == 'login') {
				delta++
			}
		})
		console.log("login success, href", href)
		if (href) {
			window.location.href = href;
			return;
		}
		console.log('判断需要返回几层', delta);
		if (delta == 0) {
			toIndex();
		} else {
			uni.navigateBack({
				delta
			})
		}

	})
}
