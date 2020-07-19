<template>
	<div>
		<div class="inputFlex">
			<h3>IOS-XE Standard Policies</h3>
			<div>
				<h6>INBOUND Policy-Map Name</h6>
				<input v-model="standardInboundPolicy" />
			</div>
			<div>
				<h6>INBOUND Policer Rate</h6>
				<input v-model="standardInboundPolicyPolicing" />
				<select v-model="standardPolicingThroughput">
					<option disabled value="">Policing Throughput</option>
					<option>{{ kilobits }}: kbps</option>
					<option>{{ megabits }}: mbps</option>
					<option>{{ gigabits }}: gbps</option>
				</select>
			</div>
			<div>
				<h6>
					INBOUND QoS Group/EXP Bit
				</h6>
				<input v-model="standardOutboundPolicyGroupExp" />
			</div>
			<div>
				<h6>OUTBOUND Policy-Map Name</h6>
				<input v-model="standardOutboundPolicy" />
			</div>
			<div>
				<h6>OUTBOUND Shaper</h6>
				<input v-model="standardOutboundPolicyShaping" />
				<select v-model="standardShapingThroughput">
					<option disabled value="">Shaping Throughput</option>
					<option>{{ kilobits }}: kbps</option>
					<option>{{ megabits }}: mbps</option>
					<option>{{ gigabits }}: gbps</option>
				</select>
			</div>
			<pre>
        <code>
  policy-map <span>{{ standardInboundPolicy }}</span>
   class class-default
    police cir <span>{{ standardInboundPolicyPolicing }} {{ standardPolicingThroughput[0] }}</span> bc <span>{{ standardBcCalclulation }}</span>
    conform-action set-qos-transmit <span>{{ standardOutboundPolicyGroupExp }}</span>
    conform-action set-mpls-exp-imposition-transmit <span>{{ standardOutboundPolicyGroupExp }}</span>
  !
  policy-map <span>{{ standardOutboundPolicy }}</span>
   class class-default
    shape average <span>{{ standardOutboundPolicyShaping }} {{ standardShapingThroughput[0] }}</span>   
  !
        </code>
      </pre>
		</div>
		<div class="inputFlex">
			<h3>
				IOS-XE Interface Configuration
			</h3>
			<div>
				<h6>Interface</h6>
				<input v-model="standardInboundInterface" />
			</div>
			<div>
				<h6>Service Instance</h6>
				<input v-model="standardInboundServiceInstance" />
			</div>
			<div>
				<h6>VLAN/Bridge Domain</h6>
				<input v-model="standardInboundServiceInstanceVlan" />
			</div>
			<pre>
        <code>
  interface <span>{{ standardInboundInterface }}</span>
    mtu 9216
    no ip address
    load-interval 30
    negotiation auto
    !
    <span>// Customer Plugged into PE ptp xconnect to another location //</span>
    service instance <span>{{ standardInboundServiceInstance }}</span> ethernet
      description PtP Terminate on PE
      encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
      service-policy input <span>{{ standardInboundPolicy }}</span>
      xconnect 10.255.254.3 <span>{{ standardInboundServiceInstanceVlan }}</span> encapsulation mpls
    !
    
    <span>// Customer Plugged into PE Multipoint Connection //</span>
    service instance <span>{{ standardInboundServiceInstance }}</span> ethernet
      description MtP Terminate on PE
      encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
      service-policy input <span>{{ standardInboundPolicy }}</span>
      service-policy output <span>{{ standardOutboundPolicy }}</span>
      bridge-domain <span>{{ standardInboundServiceInstanceVlan }}</span>
    !
    
    <span>// Customer Plugged into L2 device which connects to PE //</span>
    service instance <span>{{ standardInboundServiceInstance }}</span> ethernet
      description MtP Terminate on L2 Device
      encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
      service-policy output <span>{{ standardOutboundPolicy }}</span>
      bridge-domain <span>{{ standardInboundServiceInstanceVlan }}</span>
    !
        </code>
      </pre>
		</div>
	</div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
	setup() {
		const kilobits = ref('k');
		const megabits = ref('m');
		const gigabits = ref('g');

		const standardBcCalclulation = computed(() => {
			if (standardPolicingThroughput.value[0] === 'k') {
				return ((standardInboundPolicyPolicing.value * 1000) / 8) * 0.05;
			} else if (standardPolicingThroughput.value[0] === 'm') {
				return ((standardInboundPolicyPolicing.value * 1000000) / 8) * 0.05;
			} else if (standardPolicingThroughput.value[0] === 'g') {
				return ((standardInboundPolicyPolicing.value * 1000000000) / 8) * 0.05;
			} else {
				return null;
			}
		});
		// STANDARD POLICY
		const standardPolicingThroughput = ref('');
		const standardShapingThroughput = ref('');

		// STANDARD INBOUND
		const standardInboundPolicy = 'RATE_ENT_IN';
		const standardInboundPolicyPolicing = ref(100);
		const standardInboundInterface = 'GigabitEthernet0/0/1';
		const standardInboundServiceInstance = '56';
		const standardInboundServiceInstanceVlan = '56';

		// STANDARD OUTBOUND
		const standardOutboundPolicy = 'RATE_ENT_OUT';
		const standardOutboundPolicyShaping = '100';
		const standardOutboundPolicyGroupExp = '5';

		return {
			kilobits,
			megabits,
			gigabits,
			standardBcCalclulation,

			standardPolicingThroughput,
			standardShapingThroughput,

			standardInboundPolicy,
			standardInboundPolicyPolicing,
			standardInboundInterface,
			standardInboundServiceInstance,
			standardInboundServiceInstanceVlan,
			standardOutboundPolicy,
			standardOutboundPolicyShaping,
			standardOutboundPolicyGroupExp
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
