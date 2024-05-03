<template>
	<div class="role">
		<pageSearch :search-config="searchConfig" />
	</div>
</template>

<script setup lang="ts" name="role">
import searchConfig from './config/searcg.config';
import pageSearch from '@/components/page-search/page-search.vue';
</script>

<style scoped></style>
