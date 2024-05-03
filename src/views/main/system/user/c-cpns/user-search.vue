<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { reactive, ref } from 'vue';

const searchKeyWord = reactive({
	name: '',
	realname: '',
	cellphone: '',
	enable: '',
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
						<el-form-item label="用户名" prop="name">
							<el-input placeholder="请输入用户名" v-model="searchKeyWord.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="真实姓名" prop="realname">
							<el-input placeholder="请输入真实姓名" v-model="searchKeyWord.realname"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="手机号码" prop="cellphone">
							<el-input placeholder="请输入手机号码" v-model="searchKeyWord.cellphone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="状态" prop="enable">
							<el-select placeholder="请选择查询的状态" v-model="searchKeyWord.enable">
								<el-option label="启动" :value="1"></el-option>
								<el-option label="停止" :value="0"></el-option>
							</el-select>
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
