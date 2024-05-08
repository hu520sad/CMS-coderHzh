
import type pageModal from "@/components/page-modal/page-modal.vue"
import { ref } from 'vue'

type EditCallFn = (itemData: any) => void

function usePageModal(editCallBack: EditCallFn) {
	const PgModal = ref<InstanceType<typeof pageModal>>()
	// 点击新建和编辑
	function handleNewClick() {
		PgModal.value?.remarkStageModal()
	}
	function handleEditClick(itemData: any) {
		PgModal.value?.remarkStageModal(true, itemData)
		if (editCallBack) editCallBack(itemData)
	}

	return {
		handleNewClick,
		handleEditClick,
		PgModal
	}
}

export default usePageModal
