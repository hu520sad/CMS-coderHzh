<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from './c-cpns/header-info.vue';
import headerCrumb from './c-cpns/header-crumb.vue';

//控制方块，传递信息
const isCollapse = ref(false)
const emit = defineEmits(['mainGetCollapse'])
function handMenuLClick() {
	isCollapse.value = !isCollapse.value
	emit('mainGetCollapse', isCollapse.value)
}
</script>

<template>
	<div class="main-header">
		<div class="logo" @click="handMenuLClick">
			<el-icon>
				<component :is="isCollapse ? 'Expand' : 'fold'" size="28px"></component>
			</el-icon>
		</div>
		<div class="content">
			<div class="breadcrumb"><header-crumb></header-crumb></div>
			<div class="info">
				<header-info></header-info>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.main-header {
	display: flex;
	height: 100%;
	align-items: center;
	flex: 1;
	color: white;

	.logo {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		padding: 0 18px;
	}
}
</style>
