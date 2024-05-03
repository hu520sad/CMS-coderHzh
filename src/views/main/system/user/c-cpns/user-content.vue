<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system';
import { storeToRefs } from 'pinia';
import { formatUTC } from '@/utils/format';
import { ref } from 'vue';


const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
postListRequest()

const { userList, totalCount } = storeToRefs(systemStore) as any


//分页器的使用
function handleSizeChange() {
	postListRequest()
}
function handleCurrentChange() {
	postListRequest()
}

//发送请求的参数一直在变化，弄一个函数整理这些变化，统一发送请求
function postListRequest(formVal: any = {}) {
	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	const info = { size, offset, ...formVal }
	systemStore.postUserlist(info)
}


//新建/删除/编辑用户
const emit = defineEmits(['newClick', 'EditClick'])
function newUser() {
	emit('newClick')
}

defineExpose({
	postListRequest
})

function handleDelteUser(id: number) {
	systemStore.deleteUserAction(id)
}
function handleEditClick(itemData: any) {

	emit('EditClick', itemData)
}

</script>

<template>
	<div class="content">
		<div class="header-list">
			<h2 style="font-size: 20px">用户列表</h2>
			<el-button type="primary" @click="newUser">新建用户</el-button>
		</div>
		<div class="table">
			<el-table :data="userList" border style="width: 100%">
				<el-table-column align="center" type="selection" width="50px" />
				<el-table-column align="center" type="index" width="60px" label="序号" />
				<el-table-column prop="name" label="用户名" align="center" width="150px" />
				<el-table-column prop="realname" label="真实姓名" align="center" width="150px" />
				<el-table-column prop="cellphone" label="手机号码" align="center" width="150px"></el-table-column>
				<el-table-column prop="enable" label="状态" align="center" width="150px">
					<template #default="scoped">
						<el-button :type="(scoped.row.enable ? 'primary' : 'danger')" plain>
							{{ scoped.row.enable ? "启用" : "禁用" }}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="createAt" label="创建时间" align="center">
					<template #default="scoped">
						{{ formatUTC(scoped.row.createAt) }}
					</template>
				</el-table-column>
				<el-table-column prop="updateAt" label="更新时间" align="center">
					<template #default="scoped">
						{{ formatUTC(scoped.row.updateAt) }}
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="150px">
					<template #default="scoped">
						<el-button size="small" icon="Edit" type="primary" text @click="handleEditClick(scoped.row)">
							编辑
						</el-button>
						<el-button size="small" icon="Delete" type="danger" text
							@click="handleDelteUser(scoped.row.id)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
				:page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"
				@size-change="handleSizeChange" @current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<style lang="less" scoped>
.content {
	background-color: #fff;
	margin-top: 20px;
	padding: 20px;

	.header-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.table {
		margin-top: 12px;

		:deep(.el-table__cell) {
			padding: 14px 0;
		}

		.el-button {
			margin-left: 0;
			padding: 5px 8px;
		}
	}

	.pagination {
		display: flex;
		justify-content: flex-end;
		margin-top: 14px;
	}
}
</style>
