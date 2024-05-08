import type { RouteRecord } from "vue-router"

function loadLocalRoute() {
	//1.动态获取所有路由对象
	//*从独立的文件中读取路由对象到数组当中
	const localRoutes: RouteRecord[] = []

	//读取router/main所有的ts文件
	const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })

	for (const key in files) {
		const module = files[key]
		localRoutes.push(module.default)
	}
	return localRoutes
}
export let firstMenu: any = null
//不要在工具里加，只做一件事，使其具有通用性
export function mapMenusToRoutes(userMenus: any[]) {

	const localRoutes = loadLocalRoute()

	//
	const routes: RouteRecord[] = []
	for (const menu of userMenus) {
		for (const subMenus of menu.children) {
			const route = localRoutes.find((item) => item.path === subMenus.url)
			if (route) {
				if (!routes.find(item => item.path === menu.url)) {
					routes.push({ path: menu.url, redirect: route } as any)
				}
				routes.push(route)
			}
			if (!firstMenu && route) firstMenu = subMenus
		}
	}
	return routes
}


export function mapPathToMenu(path: string, userMenus: any[]) {
	for (const menus of userMenus) {
		for (const subMenus of menus.children) {
			if (subMenus.url === path) return subMenus
		}
	}
}

export function mapPathToBread(path: string, userMenus: any[]) {
	const breadCrumbs: any[] = []
	for (const menus of userMenus) {
		for (const subMenus of menus.children) {
			if (subMenus.url === path) {
				breadCrumbs.push({ name: menus.name, path: menus.url })
				breadCrumbs.push({ name: subMenus.name, path: subMenus.url })
			}
		}
	}

	return breadCrumbs
}

export function mapMenuListToIds(menuList: any) {
	const ids: number[] = [];
	function recurseGetId(menus: any[]) {
		for (const item of menus) {
			if (item.children) {
				recurseGetId(item.children)
			}
			else {
				ids.push(item.id)
			}
		}
	}

	recurseGetId(menuList)


	return ids
}

export function mapMenuToPer(menuList: any) {
	const ids: any[] = [];

	function recurseGetId(menuList: any) {
		for (const item of menuList) {
			if (item.type === 3) {
				ids.push(item.permission)
			} else {
				recurseGetId(item.children ?? [])
			}
		}
	}
	recurseGetId(menuList)

	return ids;
}
