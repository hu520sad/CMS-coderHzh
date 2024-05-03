<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { mapPathToMenu } from '@/utils/map-menus';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
	isCollapse: {
		type: Boolean,
		default: false
	}
})
//拿去用户权限菜单
const userMenu = localCache.getCache('userMenus')

//点击菜单导航前往
const route = useRouter()
function toNavigate(navUrl: string) {
	route.push(navUrl)
}

//elMenu的默认菜单
const routes = useRoute()
const activeDefault = computed(() => {
	const path = mapPathToMenu(routes.path, userMenu)
	return path.id + ''
})
</script>

<template>
	<div class="main-menu">
		<div class="logo">
			<img class="img" src="@/assets/img/logo.svg" alt="" />
			<h2 class="title" v-show="!isCollapse">CoderHzh-CMS</h2>
		</div>
		<!-- 菜单栏 -->
		<div class="menu">
			<el-menu :default-active="activeDefault" text-color="#b7bdc3" active-text-color="#fff"
				background-color="#001529" :collapse="isCollapse">
				<template v-for="item in userMenu" :key="item.id">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<el-icon>
								<component :is="item.icon.split('-icon-')[1]"></component>
							</el-icon>
							<span>{{ item.name }}</span>
						</template>

						<template v-for="itemChild in item.children" :key="itemChild.url">
							<el-menu-item @click="toNavigate(itemChild.url)" :index="itemChild.id + ''">{{
								itemChild.name
							}}</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
			</el-menu>
		</div>
	</div>
</template>

<style lang="less" scoped>
.main-menu {
	height: 100%;
	background-color: #001529;
}

.logo {
	display: flex;
	height: 28px;
	padding: 10px;
	align-items: center;
	justify-content: flex-start;
	margin-right: 8px;

	.title {
		font-size: 16px;
		font-weight: 700;
		color: white;
		// margin-left: 4px;
	}

	.img {
		height: 100%;
		margin: 0 8px;

	}
}

.el-menu {
	border-right: none;
	user-select: none;
}

.el-sub-menu {
	.el-menu-item {
		padding-left: 50px !important;
		background-color: #0c2135;
	}

	.el-menu-item:hover {
		color: #fff;
	}

	.el-menu-item.is-active {
		background-color: #0a60bd;
	}
}
</style>
