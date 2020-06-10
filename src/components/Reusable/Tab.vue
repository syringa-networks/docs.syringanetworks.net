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

	mounted() {
		this.isActive = this.selected;
	}
};
</script>
