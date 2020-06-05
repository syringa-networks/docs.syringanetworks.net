<template>
	<div>
		<div :class="$style.inputFlex">
			<h3 :class="$style.h3">IOS-XR Standard Policies</h3>
			<div>
				<h6 :class="$style.h6">INBOUND Policy-Map Name</h6>
				<input
					:class="$style.input"
					v-model="standardInboundPolicy"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">INBOUND Policer Rate</h6>
				<input
					:class="$style.input"
					v-model="standardInboundPolicyPolicing"
				/>
				<select
					:class="$style.select"
					v-model="standardPolicingThroughput"
				>
					<option disabled value=""
						>Policing Throughput</option
					>
					<option>{{ kbps }}</option>
					<option>{{ mbps }}</option>
					<option>{{ gbps }}</option>
				</select>
			</div>
			<div>
				<h6 :class="$style.h6">
					INBOUND QoS Group/EXP Bit
				</h6>
				<input
					:class="$style.input"
					v-model="standardOutboundPolicyGroupExp"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">OUTBOUND Policy-Map Name</h6>
				<input
					:class="$style.input"
					v-model="standardOutboundPolicy"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">OUTBOUND Shaper</h6>
				<input
					:class="$style.input"
					v-model="standardOutboundPolicyShaping"
				/>
				<select
					:class="$style.select"
					v-model="standardShapingThroughput"
				>
					<option disabled value=""
						>Shaping Throughput</option
					>
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
				return (
					((standardInboundPolicyPolicing.value * 1000) /
						8) *
					0.05
				);
			} else if (
				standardPolicingThroughput.value === 'mbps'
			) {
				return (
					((standardInboundPolicyPolicing.value * 1000000) /
						8) *
					0.05
				);
			} else if (
				standardPolicingThroughput.value === 'gbps'
			) {
				return (
					((standardInboundPolicyPolicing.value *
						1000000000) /
						8) *
					0.05
				);
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
.h3 {
  padding: 4rem;
  margin-left: -4rem;
  margin-right: -4rem;
  margin-top: -3rem;
  color: var(--color-white);
  background-color: var(--color-orange-5);
}

.listDiv {
  color: var(--color-dark-1);
  border: solid 0.2rem var(--color-dark-1);
  padding: 3rem;
  margin-bottom: 3rem;
}

.inputFlex {
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  border: 2px solid var(--color-orange-5);
  margin-bottom: 2rem;

  div {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .h6 {
    font-family: 'Source Code Pro';
    text-transform: none;
    color: var(--color-orange-5);
    font-weight: 400;
    letter-spacing: 0.25px;
    font-size: 16px;
  }

  input {
    width: 35%;
  }
}

.input {
  color: rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  border: 1px solid var(--color-orange-5);
  padding: 1rem;
  margin-bottom: 1rem;

  &:focus {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}

.select {
  color: rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  border: 1px solid var(--color-orange-5);
  margin-left: 1rem;

  &:focus {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}
</style>
