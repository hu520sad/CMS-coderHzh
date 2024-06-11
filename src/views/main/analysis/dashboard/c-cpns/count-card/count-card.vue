<script setup lang="ts">
import { CountUp } from 'countup.js';
import {onMounted, ref} from 'vue'

interface IProps{
	subtitle?:string,
	tips?:string
	number1?:number
	number2?:number
	title?:string,
	amount?:string
}
const props=withDefaults(defineProps<IProps>(),{
	title:"商品",
	tips:"所有商品的总销量",
	subtitle:'商品种类',
	number1:123,
	number2:12134
})

//创建实例对象
const countRef1=ref<HTMLElement>()
const countRef2=ref<HTMLElement>()
const countOption={
	prefix:props.amount==='saleroom' ? '￥':""
}
onMounted(()=>{
	const countup1=new CountUp(countRef1.value!,props.number1,countOption)
	const countup2=new CountUp(countRef2.value!,props.number2,countOption)
countup1.start()
countup2.start()
})


</script>

<template>
	<div class="countCard">
		<div class="header">
			<span>{{ title }}</span>
			<el-tooltip
        effect="dark"
        :content="tips"
		placement="top"
      >
        <el-icon size="large"><Warning /></el-icon>
      		</el-tooltip>
		</div>
		<div class="content">

			<span class="count" ref="countRef1">{{number1}}</span>
		</div>
		<div class="footer">
			<span>{{ subtitle }}</span>
			<span class="sumCount" ref="countRef2">{{number2}}</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
.countCard{
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: start;
	padding: 30px 0;
	padding-left: 24px;
	.header{
		width:95%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		color: #aaa4a4;

	}
	.content{
		font-size:24px;
		font-weight: 500;
		margin:10px 0;

	}

	.footer{

		color: rgb(52, 47, 47);
		font-size: 14px;
		padding-top:6px ;
		.sumCount{
			margin-left: 10px;
		}
	}

}

</style>
