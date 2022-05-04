import Utils from "/config/utils.js";
export default function(result) {
	uni.showToast({
		title: '登录成功',
		icon: 'none'
	});
	uni.clearStorageSync();
	console.log('登录成功', result);
	uni.setStorageSync("authorization", result.token)
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
	console.log('判断需要返回几层', delta);
	if (delta == 0) {
		Utils.toIndex();
	} else {
		uni.navigateBack({
			delta
		})
	}
}
