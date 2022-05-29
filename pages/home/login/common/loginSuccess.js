import {
	toIndex, navigateTo
} from "../../../../common/js/util.js";
export default function(result) {
	uni.showToast({
		title: '登录成功',
		icon: 'none'
	});
	uni.clearStorageSync();
	console.log('登录成功', result);
	uni.setStorageSync("userId", result.userId);
	uni.setStorageSync("authorization", result.accessToken)
	var delta = 0 //判断需要返回几层
	let pages = getCurrentPages();
	// console.log(pages);
	pages.forEach((page, index) => {
		console.log(pages)
		// console.log(pages[pages.length-index-1].route.split('/')[2]);
		pages[pages.length - index - 1].route.split('/')
		if (pages[pages.length - index - 1].route.split('/')[2] == 'login-page') {
			delta++
		}
	})
	
	let href = uni.getStorageSync("href");
	if(href){
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
}
