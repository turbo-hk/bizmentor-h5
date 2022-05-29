import App from './App'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

//http请求
require('./config/request.js')(app)

//时间格式化
import {
	formatDate
} from "@/common/js/dateFormat.js";

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.formatDate = formatDate;

App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
