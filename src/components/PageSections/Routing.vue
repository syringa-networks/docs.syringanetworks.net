<template>
	<div>
		<h3>
			Static Route Configuration
		</h3>
		<div class="inputFlex">
			<div>
				<p>
					You shouldn't need to set an AD on the secondary default route unless you want to. We're making sure the
					default route via ISP1 is being used in the BGP config, with redistribute static metric 150000 set on
					address-family ipv4 vrf ISP2.
				</p>
				<h6>Default Route Next Hop</h6>
				<input v-model="nextHop" />
			</div>
			<div>
				<h6>Cellular Interface</h6>
				<input v-model="cellularInterface" />
			</div>
		</div>
		<pre>
      <code>
ip route vrf ISP2 66.232.64.82 255.255.255.255 <span>{{ cellularInterface }}</span>
ip route vrf ISP2 66.232.64.83 255.255.255.255 <span>{{ cellularInterface }}</span>
ip route vrf ISP2 67.215.44.4 255.255.255.255 <span>{{ cellularInterface }}</span>
!
ip route vrf ISP1 0.0.0.0 0.0.0.0 <span>{{ nextHop }}</span>
ip route vrf ISP2 0.0.0.0 0.0.0.0 <span>{{ cellularInterface }}</span>
!
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const nextHop = '67.61.171.165';
		const cellularInterface = 'Cellular0/2/0';

		return { nextHop, cellularInterface };
	}
};
</script>
