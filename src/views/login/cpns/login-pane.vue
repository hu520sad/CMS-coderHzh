<script setup lang="ts">
import { ref, watch } from 'vue'
import phonePane from '../cpns/phone-pane.vue'
import namePane from '../cpns/name-pane.vue'
import { localCache } from '@/utils/cache'
const activeTab = ref('账号')

const namePanel = ref<InstanceType<typeof namePane>>() //获取子组件属性
const pwdRef = ref(localCache.getCache('pwdRef') ?? false)
//监听pwdRef的变化并且保存在本地
watch(pwdRef, (newValue) => {
	localCache.setCache('pwdRef', newValue)
})

//忘记密码细节 发动子组件函数
function handleLoginBtn() {
	if (activeTab.value === '手机') {
		console.log('手机登录')
	} else {
		console.log('账号登录')
		namePanel.value?.loginAction(pwdRef.value)
	}
}
</script>

<template>
	<div class="login">
		<div class="loginContent">
			<div class="top">
				<h1>后台管理系统</h1>
			</div>
			<div class="tab">
				<el-tabs type="border-card" stretch v-model="activeTab">
					<namePane ref="namePanel"></namePane>
					<phonePane></phonePane>
				</el-tabs>
			</div>
			<div class="controls">
				<el-checkbox label="记住密码" size="large" v-model="pwdRef" />
				<el-link type="primary">忘记密码</el-link>
			</div>
			<el-button type="primary" class="loginBtn" @click="handleLoginBtn">立即登录</el-button>
		</div>
	</div>
</template>

<style lang="less" scoped>
.login {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url('@/assets/img/login-bg.svg');

	.loginContent {
		width: 330px;
		display: flex;
		flex-direction: column;

		.top {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
		}

		.tab {
			margin-top: 8px;
			margin-bottom: 5px;

			// display: flex; //flex的方向设置，影响子元素的宽度和高度分配
			// flex-direction: column;
		}

		.controls {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.loginBtn {
			margin-top: 6px;
			height: 40px;
		}
	}
}
</style>
