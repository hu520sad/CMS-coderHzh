
import { postDepaetmentList, postRolelist } from "@/service/main/main";
import { defineStore } from "pinia";


interface IMainState {
	entireRole: any[]
	entireDp: any[]
}

const useMainStore = defineStore('mainStore', {
	state: (): IMainState => ({
		entireRole: [],
		entireDp: []
	}),

	actions: {
		async postRoleDpAction() {
			const allResult = await Promise.all([postDepaetmentList(), postRolelist()])
			const { list: roleList, totalCount: roleTotalCount } = allResult[1].data
			const { list: DpList, totalCount: DpCount } = allResult[0].data

			this.entireDp = DpList;
			this.entireRole = roleList

		}
	}
})

export default useMainStore
