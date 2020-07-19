<template>
	<div>
		<h3>
			Phase 1 Configuration - MPLS Routers
		</h3>
		<div :class="$style.listDiv">
			<h3>Ingress - Marking</h3>
			<ul>
				<li v-for="item in ingress" :key="item.id">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div :class="$style.listDiv">
			<h3>Egress - Shaping/Queuing</h3>
			<ul>
				<li v-for="item in egress" :key="item.id">
					{{ item.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	setup() {
		const ingress = [{ name: 'Set QoS Group or Traffic Class' }, { name: 'Set EXP' }, { name: 'Police if necessary' }];
		const egress = [{ name: 'Shaping' }, { name: 'Queuing' }];

		return {
			ingress,
			egress
		};
	}
};
</script>

<style lang="stylus" module>
.listDiv {
  color: var(--color-dark);
  border: solid 0.2rem var(--color-dark);
  padding: 3rem;
  margin-bottom: 3rem;
}
</style>
