<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

const searchKeyWord = reactive({
	name: '',
	leader: '',
	createAt: ''
})

//搜索和重置逻辑
const emit = defineEmits(['roleSearch', 'resetClick'])
const formRef = ref<InstanceType<typeof ElForm>>()
function refreshTable() {
	emit('resetClick')
	formRef.value?.resetFields()
}

function querySearch() {
	emit('roleSearch', searchKeyWord)
}
</script>

<template>
	<div class="userSearch">
		<div class="searchInner">
			<el-form size="large" ref="formRef" label-width="70" :model="searchKeyWord">
				<el-row :gutter="80">
					<el-col :span="8">
						<el-form-item label="部门名称" prop="name">
							<el-input placeholder="请输入部门" v-model="searchKeyWord.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="部门领导" prop="leader">
							<el-input placeholder="请输入部门领导" v-model="searchKeyWord.leader"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="创建时间" prop="createAt">
							<el-date-picker v-model="searchKeyWord.createAt" start-placeholder="开始时间" type="daterange"
								end-placeholder="结束时间" range-separator="-">
							</el-date-picker>
						</el-form-item>
					</el-col>
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
