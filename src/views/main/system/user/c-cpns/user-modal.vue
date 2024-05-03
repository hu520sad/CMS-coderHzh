<script setup lang="ts">
import useMainStore from '@/store/main/main';
import { useSystemStore } from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

//兄弟组件通过父组件通信
const DialogVisible = ref(false)
const editData = ref()
const isNewRef = ref(true)
const formData = reactive<any>({
	name: '',
	realname: '',
	password: '',
	cellphone: '',
	roleId: '',
	departmentId: ''
})
function remarkStageModal(isEdit = false, itemData?: any) {
	DialogVisible.value = !DialogVisible.value
	if (isEdit && formData) {
		//编辑数据
		isNewRef.value = !isEdit
		for (const key in formData) {
			formData[key] = itemData[key]
		}
		editData.value = itemData
	} else {
		//新建数据
		isNewRef.value = true
		for (const key in formData) {
			formData[key] = ''
		}
		editData.value = null
	}
}
defineExpose({
	remarkStageModal
})



//角色列表
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRole, entireDp } = storeToRefs(mainStore)

//建立
function handleConfirmClick() {
	DialogVisible.value = false
	if (isNewRef.value === false && editData.value) {
		//编辑数据
		systemStore.EditUserAction(editData.value.id, formData)
	} else {
		//新建用户
		systemStore.postNewUserAction(formData)
	}

}



</script>

<template>
	<div class="userModal">
		<el-dialog v-model="DialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="500" center>
			<div class="form">
				<el-form size="large" :model="formData" label-width="80px">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="realname">
						<el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
					</el-form-item>
					<el-form-item v-if="isNewRef" label="密码" prop="password">
						<el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
					</el-form-item>
					<el-form-item label="手机号码" prop="cellphone">
						<el-input v-model="formData.cellphone" placeholder="请输入手机号码"></el-input>
					</el-form-item>
					<el-form-item label="选择角色" prop="roleId">
						<!-- <el-input v-model="formData.roleId" placeholder="请选择角色"></el-input> -->
						<el-select placeholder="请选择角色" style="width: 100%;" v-model="formData.roleId">
							<template v-for="role in entireRole" :key="role.id">
								<el-option :label="role.name" :value="role.id" />
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择部门" prop="departmentId">
						<el-select placeholder="请选择角色" style="width: 100%;" v-model="formData.departmentId">
							<template v-for="Dp in entireDp" :key="Dp.id">
								<el-option :label="Dp.name" :value="Dp.id" />
							</template>
						</el-select>
					</el-form-item>
				</el-form>

			</div>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="DialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleConfirmClick">
						确定
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="less" scoped>
.form {
	padding-right: 30px;
	margin-top: 10px;
}
</style>
