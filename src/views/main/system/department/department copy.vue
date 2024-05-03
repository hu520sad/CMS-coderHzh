<script setup lang="ts" name="department">
import pageSearch from "./c-cpns/page-search.vue"
import pageContent from "./c-cpns/page-content.vue";
import pageModal from "./c-cpns/page-modal.vue";
import { ref } from "vue";


// 搜索与页面展示
const PgConten = ref<InstanceType<typeof pageContent>>()
const PgModal = ref<InstanceType<typeof pageModal>>()
function handleQueryClick(formItem: any) {
	PgConten.value?.postDpRequest(formItem)
}
function handleResetClick() {
	PgConten.value?.postDpRequest()
}

function handleNewClick() {
	PgModal.value?.remarkStageModal()
}
function handleEditClick(itemData: any) {
	PgModal.value?.remarkStageModal(true, itemData)
}

</script>

<template>
	<div class="department">
		<pageSearch @roleSearch="handleQueryClick" @resetClick="handleResetClick" />
		<pageContent @newClick="handleNewClick" ref="PgConten" @editClick="handleEditClick" />
		<pageModal ref="PgModal" />
	</div>
</template>

<style scoped></style>
