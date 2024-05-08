<template>
	<div class="menu">
		<pageContent :contentConfig="contentConfig" />
	</div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue';
import usePageModal from '@/hooks/usePageModal';
import contentConfig from './config/content.config';

</script>

<style scoped></style>
