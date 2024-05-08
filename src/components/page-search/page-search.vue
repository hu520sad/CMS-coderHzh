<script setup lang="ts">
import usePermission from '@/hooks/usePermission';
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';


//自定义事件和接收属性
interface IProps {
	searchConfig: {
		formItem: any[]
	}
}

const props = defineProps<IProps>()
const emit = defineEmits(['roleSearch', 'resetClick'])

//定义form的数据
const initialValue: any = {}
for (const item of props.searchConfig.formItem) {
	initialValue[item.prop] = item.initialValue ?? ''
}
const searchKeyWord = reactive(initialValue)


//搜索和重置逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
function refreshTable() {
	emit('resetClick')
	formRef.value?.resetFields()
}

function querySearch() {
	emit('roleSearch', searchKeyWord)
}

// const isQuery=usePermission(`${props.searchConfig.}`)
</script>

<template>
	<div class="userSearch">
		<div class="searchInner">
			<el-form size="large" ref="formRef" label-width="70" :model="searchKeyWord">
				<el-row :gutter="80">
					<template v-for="item in searchConfig.formItem" :key="item.prop">
						<el-col :span="8">
							<el-form-item :label="item.label" :prop="item.prop">
								<template v-if="item.type === 'input'">
									<el-input v-model="searchKeyWord[item.prop]" :placeholder="item.placeholder">
									</el-input>
								</template>
								<template v-if="item.type === 'date-picker'">
									<el-date-picker v-model="searchKeyWord[item.prop]" start-placeholder="开始时间"
										type="daterange" end-placeholder="结束时间" range-separator="-">
									</el-date-picker>
								</template>
								<template v-if="item.type === 'select'">
									<el-select v-model="searchKeyWord[item.prop]" :placeholder="item.placeholder"
										style="width: 100%">
										<template v-for="option in item.options" :key="option.value">
											<el-option :label="option.label" :value="option.value" />
										</template>
									</el-select>
								</template>
							</el-form-item>
						</el-col>
					</template>
				</el-row>
			</el-form>

			<div class="btn">
				<el-button size="large" icon="refresh" @click="refreshTable">重置</el-button>
				<el-button size="large" type="primary" icon="search" @click="querySearch">查询</el-button>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.userSearch {
	background-color: #fff;
	padding: 20px 28px;

	.el-form-item {
		padding: 10px;
	}

	.btn {
		display: flex;
		justify-content: flex-end;
	}

	.el-col {
		padding-left: 10px !important;
	}

}
</style>
