<template>
	<div id="app" v-bind:class="{ 'theme-dark': nightMode }">
		<input type="checkbox" id="theme-toggle" v-model="nightMode" />
		<label for="theme-toggle"><span></span></label>

		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
export default {
	watch: {
		nightMode() {
			localStorage.setItem('nightMode', JSON.stringify(this.nightMode));
		}
	},
	data() {
		return {
			nightMode: localStorage.getItem('nightMode') || false
		};
	}
};
</script>
