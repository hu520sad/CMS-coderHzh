import { ref } from 'vue'
import type pageContent from "@/components/page-content/page-content.vue"

function usePageContent() {
	const PgConten = ref<InstanceType<typeof pageContent>>()
	function handleQueryClick(formItem: any) {
		PgConten.value?.postDpRequest(formItem)
	}
	function handleResetClick() {
		PgConten.value?.postDpRequest()
	}

	return {
		PgConten,
		handleResetClick,
		handleQueryClick
	}
}

export default usePageContent
