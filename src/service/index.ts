import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/variable'

const hyRequest = new HYRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestSuccessFn: (config) => {
			const token = localCache.getCache(LOGIN_TOKEN)
			//header有服务器创建自带属性，隐藏起来了
			if (config.headers && token) {
				//类型缩小
				config.headers.Authorization = 'Bearer ' + token
			}
			return config
		}
	}
})

export default hyRequest
