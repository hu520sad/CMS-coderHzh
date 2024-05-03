<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types/login'
import useLoginStore from '@/store/login/useLoginStore'
import { localCache } from '@/utils/cache'
import { ACCOUNT_NAME, ACCOUNT_PWD } from '@/global/variable'

//登录验证规则
const rules = reactive<FormRules>({
	name: [
		{ required: true, message: '请输入账号名称', trigger: 'blur' },
		{
			pattern: /^[a-z0-9]{6,20}$/,
			message: '必须是6~20数字或字母组成~',
			trigger: 'blur'
		}
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 3, max: 20, message: '密码长度为3~20位数', trigger: 'blur' }
	]
})

//账号密码
const account = reactive<IAccount>({
	name: localCache.getCache(ACCOUNT_NAME) ?? '',
	password: localCache.getCache(ACCOUNT_PWD) ?? ''
})

//账号登录逻辑，表单提交发起请求，子组件向父组件暴露
const ruleFormRef = ref<FormInstance>()
const loginStore = useLoginStore()

function loginAction(isRemPassword: boolean) {
	ruleFormRef.value?.validate((valid) => {
		if (valid) {
			const name = account.name
			const password = account.password
			console.log(12111, isRemPassword)

			loginStore.loginAccountAction({ name, password }).then(() => {
				if (isRemPassword) {
					localCache.setCache(ACCOUNT_NAME, name)
					localCache.setCache(ACCOUNT_PWD, password)
				} else {
					localCache.removeCache(ACCOUNT_NAME)
					localCache.removeCache(ACCOUNT_PWD)
				}
			})
		} else {
			ElMessage.error('Oops, 请输入正确的格式.')
		}
	})
}

defineExpose({
	loginAction
})
</script>

<template>
	<div class="name-pane">
		<el-tab-pane label="账号登录" name="账号">
			<template #label>
				<el-icon class="label">
					<UserFilled />
				</el-icon>
				<div>账号登录</div>
			</template>
			<el-form label-width="62" :rules="rules" :model="account" status-icon ref="ruleFormRef" size="large">
				<el-form-item label="账号" prop="name">
					<el-input v-model="account.name" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="account.password" show-password />
				</el-form-item>
			</el-form>
		</el-tab-pane>
	</div>
</template>

<style lang="less" scoped>
.label {
	margin-right: 5px;
}
</style>
