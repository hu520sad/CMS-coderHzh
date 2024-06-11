<template>
	<div class="dashboard">
		<el-row :gutter="10">
			<template v-for="item in amountList" :key="item">
				<el-col :span="6">
					<countCard v-bind="item"></countCard>
				</el-col>
			</template>
		</el-row>

		<el-row :gutter="10">
			<el-col :span="7">
				<chartCard>
					<pieEchart :pie-data="showGoodCategoryCount"></pieEchart>
				</chartCard>
			</el-col>

			<el-col :span="10">
				<chartCard>
					<lineEchart></lineEchart>
				</chartCard>
			</el-col>

			<el-col :span="7">
				<chartCard>
					<roseEchart :roseData="showGoodRoseData"></roseEchart>
				</chartCard>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="12">
				<chartCard></chartCard>
			</el-col>
			<el-col :span="12">
				<chartCard></chartCard>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import useAnalysisStore from '@/store/main/analysis/analysis'
import countCard from './c-cpns/count-card/count-card.vue'
import chartCard from './c-cpns/chart-card/chart-card.vue'
import { lineEchart, pieEchart, roseEchart } from '@/components/page-echarts'

import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

const { amountList, goodCategory, roseData } = storeToRefs(analysisStore)

//获取数据
const showGoodCategoryCount = computed(() => {
	return goodCategory.value.map((item) => {
		return {
			name: item.name,
			value: item.goodsCount
		}
	})
})

const showGoodRoseData = computed(() => {
	return roseData.value.map((item) => {
		return {
			name: item.name,
			value: item.goodsCount
		}
	})
})
</script>

<style scoped>
.el-row {
	margin-bottom: 10px;
}

.echarts {
	height: 200px;
}
</style>
