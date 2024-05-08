import hyRequest from ".."

/* 角色列表获取 */
export function postRolelist() {
	return hyRequest.post({
		url: 'role/list',
	})
}

/* 部门列表获取 */
export function postDepaetmentList() {
	return hyRequest.post({
		url: 'department/list',
	})
}

/* 菜单获取 */
export function getEntireMenu() {
	return hyRequest.post({
		url: '/menu/list'
	})
}

