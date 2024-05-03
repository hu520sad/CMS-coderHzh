<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

//接受header信息收缩菜单
const isCollapse = ref(false)
function foldCollapse(isFold: boolean) {
	isCollapse.value = isFold
}
</script>

<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside :width="isCollapse ? '60px' : '210px'"><main-menu :isCollapse="isCollapse"></main-menu></el-aside>
			<el-container>
				<el-header><main-header @main-get-collapse="foldCollapse"></main-header></el-header>
				<el-main><router-view></router-view></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style lang="less" scoped>
.main {
	height: 100%;
}

.main-content {
	height: 100%;

	.el-aside {
		// overflow-x: hidden;
		// overflow-y: auto;
		// line-height: 200px;

		scrollbar-width: none;
		/* firefox */
		-ms-overflow-style: none;
		/* IE 10+ */

		transition: width 0.3s ease;
	}

	.el-header {
		background-color: black;
	}

	.el-main {
		background-color: #f1e8e8;
	}
}
</style>
