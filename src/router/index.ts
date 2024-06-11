import { LOGIN_TOKEN } from '@/global/variable'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/login',
			component: () => import('../views/login/login.vue')
		},
		{
			path: '/main',
			name: 'main',
			component: () => import('../views/main/main.vue')
		},
		{
			path: '/:pathMatch(.*)',
			component: () => import('../views/NotFound/NotFound.vue')
		}
	]
})

//路由守卫
//to from
//to /=>/main 返回值决定跳转区域
router.beforeEach((to) => {
	const token = localCache.getCache(LOGIN_TOKEN)
	if (to.path.startsWith('/main') && !token) {
		return '/login'
	}

	if (to.path === '/main' && token) {
		return firstMenu?.url
	}
})

export default router

// children: [
// 	{
// 		path: '/main/analysis/overview',
// 		component: () =>
// 			import('../views/main/analysis/overview/overview.vue')
// 	},
// 	{
// 		path: '/main/analysis/dashboard',
// 		component: () =>
// 			import('../views/main/analysis/dashboard/dashboard.vue')
// 	},
// 	{
// 		path: '/main/system/user',
// 		component: () => import('../views/main/system/user/user.vue')
// 	},
// 	{
// 		path: '/main/system/role',
// 		component: () => import('../views/main/system/role/role.vue')
// 	}
// ]
