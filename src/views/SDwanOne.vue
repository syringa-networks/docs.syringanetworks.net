<template>
	<div class="site-wrapper">
		<Header />
		<Page />
	</div>
</template>

<script>
import Header from '@/components/PageCommon/Header.vue';
import Page from '@/components/Pages/SdwanOnePage.vue';

export default {
	components: {
		Header,
		Page
	}
};
</script>
