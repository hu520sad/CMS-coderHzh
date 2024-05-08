<script setup lang="ts" name="department">
import pageSearch from "@/components/page-search/page-search.vue"
import pageContent from "@/components/page-content/page-content.vue";
import pageModal from "@/components/page-modal/page-modal.vue";
import searchConfig from "./config/searcg.config";
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import { computed, ref } from "vue";
import useMainStore from "@/store/main/main";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

//对于modalConfig进行操纵
const modalConfigRef = computed(() => {
	const mainStore = useMainStore()
	const department = mainStore.entireDp.map((item) => {
		return { label: item.name, value: item.value }
	})
	modalConfig.formItems.forEach(item => {
		if (item.prop === 'parentId') {
			item.options?.push(...department)
		}
	});

	return modalConfig
})


// 搜索与页面展示  setup当中相同逻辑的抽取：hooks
const { PgConten, handleResetClick, handleQueryClick } = usePageContent()
const { handleEditClick, handleNewClick, PgModal } = usePageModal()


</script>

<template>
	<div class="department">
		<pageSearch @roleSearch="handleQueryClick" @resetClick="handleResetClick" :searchConfig="searchConfig" />
		<pageContent :content-config="contentConfig" @newClick="handleNewClick" ref="PgConten"
			@editClick="handleEditClick">
		</pageContent>
		<pageModal ref="PgModal" :modalConfig="modalConfigRef" />
	</div>
</template>

<style scoped></style>
