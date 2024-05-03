<script setup lang="ts">
import useLoginStore from '@/store/login/useLoginStore';
import { mapPathToBread } from '@/utils/map-menus';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

//映射面包屑
const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
	return mapPathToBread(route.path, userMenus)
})
</script>

<template>
	<div class="breadC">
		<el-breadcrumb separator-icon="ArrowRight">
			<template v-for="item in breadcrumbs" :key="item.name">
				<el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<style lang="less" scoped></style>
