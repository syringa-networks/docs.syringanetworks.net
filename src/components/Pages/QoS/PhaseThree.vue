<template>
	<div>
		<h3>Phase 3 Configuration - L2 Devices</h3>
		<div :class="$style.listDiv">
			<h3>Ingress - Matching</h3>
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
		<div class="inputFlex">
			<div>
				<h6>Policy-Map Ingress</h6>
				<input v-model="inboundPolicy" />
			</div>
			<div>
				<h6>Policy-Map Egress</h6>
				<input v-model="outboundPolicy" />
			</div>
		</div>
		<pre>
      <code>
  ios-xe
      </code>
		</pre>
		<pre>
      <code>
  ios-xr
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const inboundPolicy = '99KRGSxxxxxx_100M_IN';
		const outboundPolicy = '99KRGSxxxxxx_100M_OUT';
		const ingress = [{ name: 'Match DSCP' }, { name: 'Set CoS' }, { name: 'Set QoS Group' }, { name: 'Policing' }];
		const egress = [{ name: 'Match VLAN' }, { name: 'Match EXP' }, { name: 'Set CoS' }];

		return {
			inboundPolicy,
			outboundPolicy,
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
