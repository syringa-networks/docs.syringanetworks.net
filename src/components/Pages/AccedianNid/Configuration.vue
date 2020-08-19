<template>
	<div>
		<h3>Accedian NID Configuration - 1G Box</h3>
		<div class="inputFlex">
			<div>
				<h6>Source Interface</h6>
				<input v-model="sourceInterface" />
			</div>
			<div>
				<h6>Destination IP</h6>
				<input v-model="destinationIP" />
			</div>
		</div>
		<pre>
      <code>
testing code and <span>{{ sourceInterface }}</span>
and some <span>{{ destinationIP }}</span>
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const sourceInterface = 'Gi0/0/0';
		const destinationIP = '1.1.1.1';

		return { sourceInterface, destinationIP };
	}
};
</script>
