<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermission from '@/hooks/usePermission'

interface IProps {
	contentConfig: {
		pageName: string
		header?: {
			title?: string
			btnTitle?: string
		}
		propsList: any[]
		childrenTree?: any
	}
}

const props = defineProps<IProps>()

const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()

systemStore.$onAction(({ name, after }) => [
	after(() => {
		if (name === 'editPageAction' || name === 'newPageAction' || name === 'deletePageByIdAction') {
			currentPage.value = 1
		}
	})
])

//获取是否有增删改查的权限
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)

postDpRequest()

const { pageList, pageTotalCount } = storeToRefs(systemStore) as any

//分页器的使用
function handleSizeChange() {
	postDpRequest()
}
function handleCurrentChange() {
	postDpRequest()
}

//发送请求的参数一直在变化，弄一个函数整理这些变化，统一发送请求
function postDpRequest(formVal: any = {}) {
	if (!isQuery) return
	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	const info = { size, offset, ...formVal }
	systemStore.postPageListAction(props.contentConfig.pageName, info)
}

//新建/删除/编辑用户
const emit = defineEmits(['newClick', 'EditClick'])
function newUser() {
	emit('newClick')
}

defineExpose({
	postDpRequest
})

function handleDelteUser(id: number) {
	systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleEditClick(itemData: any) {
	emit('EditClick', itemData)
}
</script>

<template>
	<div class="content">
		<div class="header-list">
			<h2 style="font-size: 20px">{{ contentConfig.header?.title ?? '部门列表' }}</h2>
			<el-button v-if="isCreate" type="primary" @click="newUser">{{
				contentConfig.header?.btnTitle ?? '新建部门'
			}}</el-button>
		</div>
		<div class="table">
			<el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
				<template v-for="item in contentConfig.propsList" :key="item.prop">
					<template v-if="item.type === 'timer'">
						<el-table-column v-bind="item" align="center">
							<template #default="scoped">
								{{ formatUTC(scoped.row[item.prop]) }}
							</template>
						</el-table-column>
					</template>
					<template v-else-if="item.type === 'handler'">
						<el-table-column align="center" label="操作" width="150px">
							<template #default="scoped">
								<el-button
									size="small"
									icon="Edit"
									type="primary"
									text
									@click="handleEditClick(scoped.row)"
									v-if="isUpdate"
								>
									编辑
								</el-button>
								<el-button
									size="small"
									icon="Delete"
									type="danger"
									text
									@click="handleDelteUser(scoped.row.id)"
									v-if="isDelete"
								>
									删除
								</el-button>
							</template>
						</el-table-column>
					</template>
					<template v-else-if="item.type === 'custom'">
						<el-table-column align="center" v-bind="item">
							<template #default="scoped">
								<slot :name="item.slotName" v-bind="scoped"></slot>
							</template>
						</el-table-column>
					</template>
					<template v-else>
						<el-table-column align="center" v-bind="item"> </el-table-column>
					</template>
				</template>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[10, 20, 30, 40]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageTotalCount"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
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
