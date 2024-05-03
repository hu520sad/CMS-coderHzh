<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/variable';
import { localCache } from '@/utils/cache';
import { useRouter } from 'vue-router';


const route = useRouter()
function handleExitClick() {
	localCache.removeCache(LOGIN_TOKEN)
	route.push('/login')
}

</script>

<template>
	<div class="header-info">
		<div class="operation">
			<span class="infoIcon">
				<el-icon>
					<Message />
				</el-icon>
			</span>
			<span class="infoIcon">
				<span class="dot"></span>
				<el-icon>
					<ChatSquare />
				</el-icon>
			</span>
			<span class="infoIcon">
				<el-icon>
					<Setting />
				</el-icon>
			</span>
		</div>
		<div class="personInfo">

			<el-dropdown size="large">
				<span class="el-dropdown-link">
					<span class="userIcon">
						<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
						<span class="text">coderHzh</span>
					</span>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="handleExitClick">
							<el-icon>
								<CircleClose />
							</el-icon>
							<span>退出系统</span>
						</el-dropdown-item>
						<el-dropdown-item divided>
							<el-icon>
								<InfoFilled />
							</el-icon>
							<span>个人信息</span>
						</el-dropdown-item>
						<el-dropdown-item divided>
							<el-icon>
								<Unlock />
							</el-icon>
							<span>修改密码</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>

		</div>
	</div>
</template>

<style lang="less" scoped>
.header-info {
	display: flex;
	align-items: center;
}

.operation {
	display: inline-flex;
	margin-right: 20px;

	.infoIcon {
		position: relative;
		cursor: pointer;
		display: flex; //flex让span变成了div类的元素
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 35px;

		&:hover {
			background: #f2f2f2;
		}

		i {
			font-size: 20px;
		}

		.dot {
			position: absolute;
			top: 3px;
			right: 3px;
			z-index: 10;
			width: 6px;
			height: 6px;
			background: red;
			border-radius: 100%;
		}
	}
}

.personInfo {
	display: flex;
	align-items: center;

	.userIcon {
		margin-left: 8px;
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			font-size: 18px;
			font-weight: 700;
			padding: 8px;
			color: white;
		}

	}
}
</style>
