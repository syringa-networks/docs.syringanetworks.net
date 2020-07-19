<template>
	<div>
		<h3>NAT Configuration</h3>
		<div class="inputFlex">
			<div>
				<h6>Primary ISP VRF/ACL</h6>
				<input v-model="primaryIsp" />
			</div>
			<div>
				<h6>Secondary ISP VRF/ACL</h6>
				<input v-model="secondaryIsp" />
			</div>
			<div>
				<h6>Primary ISP Interface</h6>
				<input v-model="primaryIspInterface" />
			</div>
			<div>
				<h6>Secondary ISP Interface</h6>
				<input v-model="secondaryIspInterface" />
			</div>
		</div>
		<pre>
        <code>
ip nat inside source route-map <span>{{ primaryIsp }}</span> interface <span>{{ primaryIspInterface }}</span> vrf CUST overload
ip nat inside source route-map <span>{{ secondaryIsp }}</span> interface <span>{{ secondaryIspInterface }}</span> vrf CUST overload
!
ip access-list extended <span>{{ primaryIsp }}</span>
 permit ip any any
!
ip access-list extended <span>{{ secondaryIsp }}</span>
 permit ip any any
!
route-map <span>{{ primaryIsp }}</span> permit 10
 match ip address <span>{{ primaryIsp }}</span>
 match interface <span>{{ primaryIspInterface }}</span>
!
route-map <span>{{ secondaryIsp }}</span> permit 10
 match ip address <span>{{ secondaryIsp }}</span>
 match interface <span>{{ secondaryIspInterface }}</span>
!
        </code>
      </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const primaryIsp = 'ISP1';
		const secondaryIsp = 'ISP2';
		const primaryIspInterface = 'GigabitEthernet0/0/0';
		const secondaryIspInterface = 'Cellular0/2/0';

		return {
			primaryIsp,
			secondaryIsp,
			primaryIspInterface,
			secondaryIspInterface
		};
	}
};
</script>
