<template>
	<div class="site-wrapper">
		<Header />
		<Page />
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/PageCommon/Header.vue';
import Page from '@/components/Pages/Asr920Page.vue';
import Footer from '@/components/PageCommon/Footer.vue';

export default {
	components: {
		Header,
		Page,
		Footer
	}
};
</script>
