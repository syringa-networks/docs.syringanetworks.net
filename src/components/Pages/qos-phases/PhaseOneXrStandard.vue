<template>
	<div>
		<div class="inputFlex">
			<h3>IOS-XR Standard Policies</h3>
			<div>
				<h6>INBOUND Policy-Map Name</h6>
				<input v-model="standardInboundPolicy" />
			</div>
			<div>
				<h6>INBOUND Policer Rate</h6>
				<input v-model="standardInboundPolicyPolicing" />
				<select v-model="standardPolicingThroughput">
					<option disabled value="">Policing Throughput</option>
					<option>{{ kbps }}</option>
					<option>{{ mbps }}</option>
					<option>{{ gbps }}</option>
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
					<option>{{ kbps }}</option>
					<option>{{ mbps }}</option>
					<option>{{ gbps }}</option>
				</select>
			</div>
			<pre>
        <code>
  policy-map <span>{{ standardInboundPolicy }}</span>
   class class-default
    police rate <span>{{ standardInboundPolicyPolicing }} {{ standardPolicingThroughput }}</span> burst <span>{{ standardBcCalclulation }}</span> bytes 
    ! 
    set traffic-class <span>{{ standardOutboundPolicyGroupExp }}</span>
    set mpls experimental imposition <span>{{ standardOutboundPolicyGroupExp }}</span>
   ! 
   end-policy-map
  !
  policy-map <span>{{ standardOutboundPolicy }}</span>
   class class-default
    shape average <span>{{ standardOutboundPolicyShaping }} {{ standardShapingThroughput }}</span>
   ! 
   end-policy-map
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
		const kbps = ref('kbps');
		const mbps = ref('mbps');
		const gbps = ref('gbps');

		const standardBcCalclulation = computed(() => {
			if (standardPolicingThroughput.value === 'kbps') {
				return ((standardInboundPolicyPolicing.value * 1000) / 8) * 0.05;
			} else if (standardPolicingThroughput.value === 'mbps') {
				return ((standardInboundPolicyPolicing.value * 1000000) / 8) * 0.05;
			} else if (standardPolicingThroughput.value === 'gbps') {
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
		const standardInboundInterface = 'TenGigE0/0/0/4.56';
		const standardInboundServiceInstance = '56';
		const standardInboundServiceInstanceVlan = '56';

		// STANDARD OUTBOUND
		const standardOutboundPolicy = 'RATE_ENT_OUT';
		const standardOutboundPolicyShaping = '100';
		const standardOutboundPolicyGroupExp = '5';

		return {
			kbps,
			mbps,
			gbps,
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
