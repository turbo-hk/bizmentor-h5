//var api_url = 'http://192.168.31.33:48080/app-api';
var api_url = 'http://121.5.8.49:48080/app-api';
var tenant_id = '123';

const config = {
	API: api_url, //服务端接口域名
	API_HEADER: {
		"tenant-id": tenant_id,
		"Authorization": "Bearer " + uni.getStorageSync("authorization"),
	}
}

export default config;
