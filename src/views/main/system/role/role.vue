<template>
	<div class="role">
		<pageSearch @reset-click="handleResetClick" @roleSearch="handleQueryClick" :search-config="searchConfig" />
		<pageContent @newClick="handleNewClick" @edit-click="handleEditClick" :contentConfig="contentConfig"
			ref="PgConten"></pageContent>
		<pageModal :modal-config="modalConfig" :other-info="otherInfo" ref="PgModal">
			<template #menulist>
				<el-tree ref="treeRef" style="max-width: 600px" :data="entireMenu" show-checkbox node-key="id"
					:props="{ children: 'children', label: 'name' }" @check="handleEltreeCheck" />
			</template>
		</pageModal>
	</div>
</template>

<script setup lang="ts" name="role">
import searchConfig from "@/views/main/system/role/config/search.config"
import contentConfig from "./config/content.config";
import modalConfig from "./config/modal.config";
import pageSearch from '@/components/page-search/page-search.vue';
import pageContent from "@/components/page-content/page-content.vue";
import pageModal from "@/components/page-modal/page-modal.vue";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMainStore from "@/store/main/main";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { ElTree } from "element-plus";
import { nextTick } from "vue";
import { mapMenuListToIds } from "@/utils/map-menus";

function editCallBack(itemData: any) {
	nextTick(() => {
		const ids = mapMenuListToIds(itemData.menuList)
		treeRef.value?.setCheckedKeys(ids)
	})
}
const { PgConten, handleResetClick, handleQueryClick } = usePageContent()
const { handleEditClick, handleNewClick, PgModal } = usePageModal(editCallBack)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenu } = storeToRefs(mainStore)

const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()
function handleEltreeCheck(data1: any, data2: any) {
	const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
	otherInfo.value = { menuList }
}





</script>

<style scoped></style>
