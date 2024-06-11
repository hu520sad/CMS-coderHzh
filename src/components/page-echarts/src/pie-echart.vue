<script setup lang="ts">
import baseEcharts from './base-echarts.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'

interface IEchartValueType {
	value: number
	name: string
}

interface IProps {
	pieData: IEchartValueType[]
}

const prop = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
	return {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'horizontal',
			left: 'left'
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '50%',
				bottom: '-10%',
				data: prop.pieData,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	}
})
</script>

<template>
	<div class="pie-echart">
		<baseEcharts :option="option"></baseEcharts>
	</div>
</template>

<style lang="less" scoped></style>
