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
	leader: "",
	parentId: ''
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
const { entireDp } = storeToRefs(mainStore)

//建立
function handleConfirmClick() {
	DialogVisible.value = false
	if (isNewRef.value === false && editData.value) {
		//编辑数据
		systemStore.editPageAction('department', formData, editData.value.id)
	} else {
		//新建用户
		systemStore.newPageAction('department', formData)
	}

}



</script>

<template>
	<div class="userModal">
		<el-dialog v-model="DialogVisible" :title="isNewRef ? '新建部门' : '编辑部门'" width="500" center>
			<div class="form">
				<el-form size="large" :model="formData" label-width="80px">
					<el-form-item label="部门名称" prop="name">
						<el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
					</el-form-item>
					<el-form-item label="部门领导" prop="leader">
						<el-input v-model="formData.leader" placeholder="请输入部门名称"></el-input>
					</el-form-item>
					<el-form-item label="选择部门" prop="parentId">
						<el-select placeholder="请选择上级部门" style="width: 100%;" v-model="formData.parentId">
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
