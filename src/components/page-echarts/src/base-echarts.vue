<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
	option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
	const echartInstance = echarts.init(echartRef.value, 'light', { renderer: 'canvas' })

	watchEffect(() => echartInstance.setOption(props.option))
})
</script>

<template>
	<div>
		<div class="echarts" ref="echartRef"></div>
	</div>
</template>

<style lang="less" scoped>
.echarts {
	height: 300px;
}
</style>
