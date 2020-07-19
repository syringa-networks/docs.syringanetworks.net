<template>
	<div>
		<h2>Phase 2 Configuration - CORE Router Queuing</h2>
		<div :class="$style.listDiv">
			<h3>Ingress - Marking</h3>
			<ul>
				<li v-for="item in ingress" :key="item.id">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div :class="$style.listDiv">
			<h3>Egress - Queuing Based on Markings</h3>
			<ul>
				<li v-for="item in egress" :key="item.id">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<phase-two-xe></phase-two-xe>
		<phase-two-xr></phase-two-xr>
	</div>
</template>

<script>
import PhaseTwoXe from './PhaseTwoXe';
import PhaseTwoXr from './PhaseTwoXr';

export default {
	setup() {
		const ingress = [{ name: 'Set QoS Group or Traffic Class' }, { name: 'Set EXP' }];
		const egress = [
			{ name: 'DIST and CORE Ports' },
			{
				name: 'Match QoS Group or Traffic Class to identify traffic'
			},
			{
				name: 'Queue traffic appropriately'
			}
		];

		return {
			ingress,
			egress
		};
	},
	components: {
		PhaseTwoXe,
		PhaseTwoXr
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
