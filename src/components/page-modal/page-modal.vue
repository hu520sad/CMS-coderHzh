<script setup lang="ts">
import useMainStore from '@/store/main/main';
import { useSystemStore } from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

//定义props
interface IProps {
	modalConfig: {
		pageName: string
		header: {
			newTitle: string
			editTitle: string
		}
		formItems: any[],
	},
	otherInfo?: any
}

const props = defineProps<IProps>()


//兄弟组件通过父组件通信
const DialogVisible = ref(false)
const editData = ref()
const isNewRef = ref(true)
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
	initialForm[item.prop] = item.initialForm ?? ''
}
const formData = reactive<any>(initialForm)
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
	let infoData = formData
	if (props.otherInfo) {
		infoData = { ...infoData, ...props.otherInfo }
	}
	if (isNewRef.value === false && editData.value) {
		//编辑数据
		systemStore.editPageAction(props.modalConfig.pageName, infoData, editData.value.id)
	} else {
		//新建用户
		systemStore.newPageAction(props.modalConfig.pageName, infoData)
	}

}



</script>

<template>
	<div class="userModal">
		<el-dialog v-model="DialogVisible"
			:title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle" width="500" center>
			<div class="form">
				<el-form :model="formData" label-width="80px" size="large">
					<template v-for="item in modalConfig.formItems" :key=item.prop>
						<el-form-item :label="item.label" :prop="item.prop">
							<template v-if="item.type === 'input'">
								<el-input v-model="formData[item.prop]" :placeholder="item.placeholder">
								</el-input>
							</template>
							<template v-if="item.type === 'date-picker'">
								<el-date-picker v-model="formData[item.prop]" start-placeholder="开始时间" type="daterange"
									end-placeholder="结束时间" range-separator="-">
								</el-date-picker>
							</template>
							<template v-if="item.type === 'select'">
								<el-select v-model="formData[item.prop]" :placeholder="item.placeholder"
									style="width: 100%">
									<template v-for="option in item.options" :key="option.value">
										<el-option :label="option.label" :value="option.value" />
									</template>
								</el-select>
							</template>
							<template v-if="item.type === 'custom'">
								<slot :name="item.slotName"></slot>
							</template>
						</el-form-item>
					</template>
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
