<template>
	<div>
		<div :class="$style.inputFlex">
			<h3 :class="$style.h3">IOS-XR CUSTOM Policies</h3>
			<div>
				<h6 :class="$style.h6">INBOUND Policy-Map Name</h6>
				<input
					:class="$style.input"
					v-model="customInboundPolicy"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">INBOUND Marking</h6>
				<input
					:class="$style.input"
					v-model="customInboundPolicyMarking"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">INBOUND Policing</h6>
				<input
					:class="$style.input"
					v-model="customInboundPolicyPolicing"
				/>
				<select
					:class="$style.select"
					v-model="customPolicingThroughput"
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
				<h6 :class="$style.h6">OUTBOUND Policy-Map</h6>
				<input
					:class="$style.input"
					v-model="customOutboundPolicy"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">OUTBOUND Queuing</h6>
				<input
					:class="$style.input"
					v-model="customOutboundPolicyQueuing"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">OUTBOUND Shaping</h6>
				<input
					:class="$style.input"
					v-model="customOutboundPolicyShaping"
				/>
				<select
					:class="$style.select"
					v-model="customShapingThroughput"
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
  policy-map <span>{{ customInboundPolicy }}</span>
   class class-default
    service-policy <span>{{ customInboundPolicyMarking }}</span>
    police rate <span>{{ customInboundPolicyPolicing }} {{ customPolicingThroughput }}</span> burst <span>{{ customBcCalculation }}</span> bytes 
    ! 
   ! 
   end-policy-map
  !
  policy-map <span>{{ customInboundPolicyMarking }}</span>
   class <span class="blue">CUST_Q4</span>
    set traffic-class 4
    set mpls experimental imposition 4
   ! 
   class <span class="green">CUST_Q3</span>
   set traffic-class 3
    set mpls experimental imposition 3
   ! 
   class <span class="purple">CUST_Q2</span>
   set traffic-class 2
    set mpls experimental imposition 2
   ! 
   class class-default
    set traffic-class 1
    set mpls experimental imposition 1
   ! 
   end-policy-map
  !
  class-map match-all <span class="blue">CUST_Q4</span>
    match dscp ef
    end-class-map
  !
  class-map match-all <span class="green">CUST_Q3</span>
    match dscp af41
    end-class-map
  !
  class-map match-all <span class="purple">CUST_Q2</span>
    match dscp af31
    end-class-map
  !

  policy-map <span>{{ customOutboundPolicy }}</span>
   class class-default
    service-policy <span>{{ customOutboundPolicyQueuing }}</span>
    shape average <span>{{ customOutboundPolicyShaping }} {{ customShapingThroughput }}</span>
  !
  policy-map <span>{{ customOutboundPolicyQueuing }}</span>
   class <span class="blue">TC4</span>
    bandwidth percent 25
   !
   class <span class="green">TC3</span>
    bandwidth percent 25
   !
   class <span class="purple">TC2</span>
    bandwidth percent 25
   !
   class class-default
    bandwidth percent 25
   !
  !
  class-map match-any <span class="blue">TC4</span>
    match traffic-class 4
    end-class-map
  !
  class-map match-any <span class="green">TC3</span>
    match traffic-class 3
    end-class-map
  !
  class-map match-any <span class="purple">TC2</span>
    match traffic-class 2
    end-class-map
  !
        </code>
		  </pre>
		</div>
		<div :class="$style.inputFlex">
			<h3 :class="$style.h3">
				IOS-XR Interface Configuration
			</h3>
			<div>
				<h6 :class="$style.h6">Interface Ingress</h6>
				<input
					:class="$style.input"
					v-model="customInboundInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">
					Interface Ingress Service Instance
				</h6>
				<input
					:class="$style.input"
					v-model="customInboundServiceInstance"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">
					Interface Ingress Service Instance VLAN
				</h6>
				<input
					:class="$style.input"
					v-model="customInboundServiceInstanceVlan"
				/>
			</div>
			<pre>
        <code>
  <span>// Customer Plugged into PE Multipoint Customer QoS //</span>
  interface <span>{{ customInboundInterface }}</span> l2transport
    description MtP Terminate on PE Customer QoS
    encapsulation dot1q <span>{{ customInboundServiceInstanceVlan }}</span>
    service-policy input <span>{{ customInboundPolicy }}</span>
    service-policy output <span>{{ customOutboundPolicy }}</span>
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

		const customBcCalculation = computed(() => {
			if (customPolicingThroughput.value === 'kbps') {
				return (
					((customInboundPolicyPolicing.value * 1000) / 8) *
					0.05
				);
			} else if (
				customPolicingThroughput.value === 'mbps'
			) {
				return (
					((customInboundPolicyPolicing.value * 1000000) /
						8) *
					0.05
				);
			} else if (
				customPolicingThroughput.value === 'gbps'
			) {
				return (
					((customInboundPolicyPolicing.value *
						1000000000) /
						8) *
					0.05
				);
			} else {
				return null;
			}
		});

		const customInboundInterface = 'TenGigE0/0/0/4.56';
		const customInboundServiceInstance = '56';
		const customInboundServiceInstanceVlan = '56';

		// CUSTOM POLICY
		const customPolicingThroughput = ref('');
		const customShapingThroughput = ref('');

		// CUSTOM INBOUND
		const customInboundPolicy = 'RATE_CID_IN';
		const customInboundPolicyMarking = 'CID_IN';
		const customInboundPolicyPolicing = ref(100);

		// CUSTOM OUTBOUND
		const customOutboundPolicy = 'RATE_CID_OUT';
		const customOutboundPolicyQueuing = 'CID_OUT';
		const customOutboundPolicyShaping = '100';

		return {
			kbps,
			mbps,
			gbps,
			customBcCalculation,

			customPolicingThroughput,
			customShapingThroughput,

			customInboundInterface,
			customInboundServiceInstance,
			customInboundServiceInstanceVlan,

			customInboundPolicy,
			customInboundPolicyMarking,
			customInboundPolicyPolicing,
			customOutboundPolicy,
			customOutboundPolicyQueuing,
			customOutboundPolicyShaping
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
