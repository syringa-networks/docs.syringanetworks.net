<template>
	<svg :fill="footer.svgFill" :viewBox="footer.svgViewBox">
		<path v-for="path in footer.svg" :key="path" :d="path" />
	</svg>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState(['footer'])
};
</script>
