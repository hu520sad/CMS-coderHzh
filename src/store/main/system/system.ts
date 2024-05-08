import { deletePageById, deleteUserById, editPageData, editUserData, newPageData, postNewUser, postPageListData, postUserListData } from "@/service/main/system/system";
import { defineStore } from "pinia";
import useMainStore from "../main";

export const useSystemStore = defineStore('SystemStore', {
	state: () => ({
		userList: [],
		totalCount: 1,
		pageList: [],
		pageTotalCount: 1
	}),
	actions: {
		async postUserlist(listQuery: any) {
			const userListResult = await postUserListData(listQuery)
			const { list, totalCount } = userListResult.data
			this.userList = list;
			this.totalCount = totalCount
		},

		async postNewUserAction(userInfo: any) {
			//1.创建新的用户
			const newResult = await postNewUser(userInfo)

			//2.重新发送请求
			this.postUserlist({ offset: 0, size: 10 })
		},

		async deleteUserAction(id: number) {
			//1.删除用户
			const deleteResult = await deleteUserById(id)

			//2.重新发送请求
			this.postUserlist({ offset: 0, size: 10 })
		},

		async EditUserAction(id: number, userinfo: any) {
			//1.编辑用户
			const editResult = await editUserData(id, userinfo)

			// 2.重新请求新的数据
			this.postUserlist({ offset: 0, size: 10 })
		},

		/* page页面的网络请求 */
		async postPageListAction(pageName: string, listQuery: any) {
			const pageResult = await postPageListData(pageName, listQuery)
			const { list, totalCount } = pageResult.data
			console.log(list);

			this.pageList = list;
			this.pageTotalCount = totalCount
		},
		async deletePageByIdAction(pageName: string, id: number) {
			const deleteResult = await deletePageById(pageName, id)

			//重新发出列标请求
			this.postPageListAction(pageName, { offset: 0, size: 10 })
		},

		async newPageAction(pageName: string, pageInfo: any) {
			const newResult = await newPageData(pageName, pageInfo);

			this.postPageListAction(pageName, { offset: 0, size: 10 })

			const mainStore = useMainStore()
			mainStore.postRoleDpAction()
		},

		async editPageAction(pageName: string, pageInfo: any, id: number) {
			const editResult = await editPageData(pageName, id, pageInfo);


			this.postPageListAction(pageName, { offset: 0, size: 10 })

			const mainStore = useMainStore()
			mainStore.postRoleDpAction()
		}
	}
})
