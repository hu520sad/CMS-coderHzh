import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/variable'
import { firstMenu, mapMenuToPer, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'



const useLoginStore = defineStore('LoginStore', {
	state: () => ({
		userinfo: {},
		token: '',
		userMenus: [],
		userPermission: [] as any
	}),

	actions: {
		//对象属性对象
		async loginAccountAction(account: IAccount) {
			const loginResult = await accountLoginRequest(account)
			const id = loginResult.data.id
			this.token = loginResult.data.token

			//进行本地缓存
			localCache.setCache(LOGIN_TOKEN, this.token)

			//获取用户个人详细信息
			const userinfoResult = await getUserInfoById(id)
			const userinfo = userinfoResult.data
			this.userinfo = userinfo
			localCache.setCache('userinfo', userinfo)

			//获取角色请求的用户权限
			const userMenuResult = await getUserMenusByRoleId(userinfo.role.id)
			const userMenus = userMenuResult.data
			this.userMenus = userMenus
			localCache.setCache('userMenus', userMenus)

			//添加动态路由
			const routes = mapMenusToRoutes(userMenus)
			routes.forEach(route => router.addRoute('main', route))

			//获取菜单映射的权限列表
			const permission = mapMenuToPer(userMenus);
			this.userPermission = permission


			//获取部门列表和角色列表
			const mainStore = useMainStore()
			mainStore.postRoleDpAction()


			//成功页面跳转
			router.push('/main')
		},

		//刷新缓存数据
		freshCacheData() {
			//缓存本地数据逻辑集成
			const token = localCache.getCache(LOGIN_TOKEN)
			const userinfo = localCache.getCache('userinfo')
			const userMenus = localCache.getCache('userMenus')

			if (token && userinfo && userMenus) {
				this.token = token;
				this.userinfo = userinfo;
				this.userMenus = userMenus;

				//重新获取部们列表和角色列表
				const mainStore = useMainStore()
				mainStore.postRoleDpAction()

				const permission = mapMenuToPer(userMenus);
				this.userPermission = permission

				//添加动态路由
				const routes = mapMenusToRoutes(userMenus)
				routes.forEach(route => router.addRoute('main', route))
			}
		}
	}
})

export default useLoginStore
