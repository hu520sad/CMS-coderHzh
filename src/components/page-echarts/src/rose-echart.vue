<script setup lang="ts">
import { computed } from 'vue'
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IProp {
	roseData: any[]
}

const prop = defineProps<IProp>()

const option = computed<EChartsOption>(() => {
	return {
		legend: {
			top: 'bottom'
		},
		tooltip: {
			trigger: 'item'
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: [50, 160],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8
				},
				data: prop.roseData
			}
		]
	}
})
</script>

<template>
	<div class="rose-echart">
		<baseEcharts :option></baseEcharts>
	</div>
</template>

<style lang="less" scoped></style>
