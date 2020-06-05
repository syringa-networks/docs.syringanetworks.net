<template>
	<div v-show="isActive">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Tab',
	props: {
		name: { required: true },
		selected: { default: false }
	},

	setup() {
		const isActive = false;
		return { isActive };
	},

	// Old way with Vue 2
	// data() {
	// 	return {
	// 		isActive: false
	// 	};
	// },

	mounted() {
		this.isActive = this.selected;
	}
};
</script>
