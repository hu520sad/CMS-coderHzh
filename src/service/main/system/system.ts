import hyRequest from "@/service";


/* 用户列表查询 */
export function postUserListData(listQuery: any) {
	return hyRequest.post({
		url: '/users/list',
		data: listQuery
	})
}

/* 新建用户 */
export function postNewUser(userInfo: any) {
	return hyRequest.post({
		url: '/users',
		data: userInfo
	})
}

/* 删除用户 */
export function deleteUserById(id: number) {
	return hyRequest.delete({
		url: `/users/${id}`
	})
}

/* 编辑用户 */
export function editUserData(id: number, userInfo: any) {
	return hyRequest.patch({
		url: `/users/${id}`,
		data: userInfo
	})
}

/* 针对页面的网络请求 */
export function postPageListData(page: string, listQuery: any) {
	return hyRequest.post({
		url: `/${page}/list`,
		data: listQuery
	})
}

/* 删除 */

export function deletePageById(pageName: string, id: number) {
	return hyRequest.delete({
		url: `/${pageName}/${id}`
	})
}

/* 新建 */
export function newPageData(pageName: string, pageInfo: any) {
	return hyRequest.post({
		url: `/${pageName}`,
		data: pageInfo
	})
}

/* 编辑 */
export function editPageData(pageName: string, id: number, pageInfo: any) {
	return hyRequest.patch({
		url: `/${pageName}/${id}`,
		data: pageInfo
	})
}
