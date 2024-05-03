<script setup lang="ts"></script>

<template>
	<div class="phone">
		<el-tab-pane label="手机登录" name="手机">
			<template #label>
				<el-icon class="label">
					<Iphone />
				</el-icon>
				<div>手机登录</div>
			</template>
			<el-form label-width="62">
				<el-form-item label="手机">
					<el-input />
				</el-form-item>
				<el-form-item label="验证码">
					<el-input />
				</el-form-item>
			</el-form>
		</el-tab-pane>
	</div>
</template>

<style lang="less" scoped>
.label {
	margin-right: 5px;
}
</style>
