<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue';
import userContent from './c-cpns/user-content.vue';
import { ref } from 'vue'
import userModal from '../user/c-cpns/user-modal.vue';

//搜索和重置逻辑
const userCon = ref<InstanceType<typeof userContent>>()

function querySearch(formVal: any) {
	userCon.value?.postListRequest(formVal)
}
function freshSearch() {
	userCon.value?.postListRequest()
}

//模态框
const useModal = ref<InstanceType<typeof userModal>>()
function handleNewClick() {
	useModal.value?.remarkStageModal()
}

function handleEditClick(itemData: any) {
	useModal.value?.remarkStageModal(true, itemData)
}



</script>


<template>
	<div class="user">
		<userSearch @role-search="querySearch" @reset-click="freshSearch"></userSearch>
		<userContent ref="userCon" @new-click="handleNewClick" @edit-click="handleEditClick"></userContent>
		<userModal ref="useModal"></userModal>
	</div>
</template>

<style scoped>
.user {
	border-radius: 8px;
	overflow: hidden
}
</style>
