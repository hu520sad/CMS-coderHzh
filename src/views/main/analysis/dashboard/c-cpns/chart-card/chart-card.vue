<script setup lang="ts">
interface IProps{
	header?:string
}

withDefaults(defineProps<IProps>(),{
	header:'分类商品梳理',

})

</script>

<template>
  <div class="card">
	<el-card  :header="header">
		<slot>默认内嵘</slot>
  	</el-card>
  </div>
</template>

<style lang="less" scoped></style>
