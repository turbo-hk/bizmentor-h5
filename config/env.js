import {
	ENV_LOCAL,
	ENV_PROD
} from "@/config/constants.js";

export const local = {
	"baseUrl": 'http://192.168.31.33:48080/app-api',
	"tenantId": '123',
	"wxAppId": 'wx9ff5dd29f461c008',
	"wxLoginType": 31
}

export const prod = {
	"baseUrl": 'https://console.bizmentor.cn/app-api',
	"tenantId": '123',
	"wxAppId": 'wx9ff5dd29f461c008',
	"wxLoginType": 31
}

/**
 * 获取环境变量
 */
export const getEnv = (env = ENV_LOCAL) => {
	if (env === ENV_LOCAL) {
		return local;
	}
	if (env === ENV_PROD) {
		return prod;
	}
}
