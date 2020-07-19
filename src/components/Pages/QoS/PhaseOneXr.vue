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
		<div class="inputFlex">
			<h3>IOS-XR CUSTOM Policies</h3>
			<div>
				<h6>INBOUND Policy-Map Name</h6>
				<input v-model="customInboundPolicy" />
			</div>
			<div>
				<h6>INBOUND Marking</h6>
				<input v-model="customInboundPolicyMarking" />
			</div>
			<div>
				<h6>INBOUND Policing</h6>
				<input v-model="customInboundPolicyPolicing" />
				<select v-model="customPolicingThroughput">
					<option disabled value="">Policing Throughput</option>
					<option>{{ kbps }}</option>
					<option>{{ mbps }}</option>
					<option>{{ gbps }}</option>
				</select>
			</div>
			<div>
				<h6>OUTBOUND Policy-Map</h6>
				<input v-model="customOutboundPolicy" />
			</div>
			<div>
				<h6>OUTBOUND Queuing</h6>
				<input v-model="customOutboundPolicyQueuing" />
			</div>
			<div>
				<h6>OUTBOUND Shaping</h6>
				<input v-model="customOutboundPolicyShaping" />
				<select v-model="customShapingThroughput">
					<option disabled value="">Shaping Throughput</option>
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
		<div class="inputFlex">
			<h3>
				IOS-XR Interface Configuration
			</h3>
			<div>
				<h6>Interface Ingress</h6>
				<input v-model="standardInboundInterface" />
			</div>
			<div>
				<h6>
					Interface Ingress Service Instance
				</h6>
				<input v-model="standardInboundServiceInstance" />
			</div>
			<div>
				<h6>
					Interface Ingress Service Instance VLAN
				</h6>
				<input v-model="standardInboundServiceInstanceVlan" />
			</div>
			<pre>
        <code>
  <span>// Customer Plugged into PE ptp //</span>
  interface <span>{{ standardInboundInterface }}</span> l2transport
    description PtP Terminate on PE
    encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
    service-policy input <span>{{ standardInboundPolicy }}</span>
  !
  
  <span>// Customer Plugged into PE Multipoint Connection //</span>
  interface <span>{{ standardInboundInterface }}</span> l2transport
    description MtP Terminate on PE
    encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
    service-policy input <span>{{ standardInboundPolicy }}</span>
    service-policy output <span>{{ standardOutboundPolicy }}</span>
  !
  
  <span>// Customer Plugged into L2 device which connects to PE //</span>
  interface <span>{{ standardInboundInterface }}</span> l2transport
    description MtP Terminate on L2 Device
    encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
    service-policy output <span>{{ standardOutboundPolicy }}</span>
  !
  
  <span>// Customer Plugged into PE Multipoint Customer QoS //</span>
  interface <span>{{ standardInboundInterface }}</span> l2transport
    description MtP Terminate on PE Customer QoS
    encapsulation dot1q <span>{{ standardInboundServiceInstanceVlan }}</span>
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

		const customBcCalculation = computed(() => {
			if (customPolicingThroughput.value === 'kbps') {
				return ((customInboundPolicyPolicing.value * 1000) / 8) * 0.05;
			} else if (customPolicingThroughput.value === 'mbps') {
				return ((customInboundPolicyPolicing.value * 1000000) / 8) * 0.05;
			} else if (customPolicingThroughput.value === 'gbps') {
				return ((customInboundPolicyPolicing.value * 1000000000) / 8) * 0.05;
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
			standardBcCalclulation,
			customBcCalculation,

			standardPolicingThroughput,
			standardShapingThroughput,
			customPolicingThroughput,
			customShapingThroughput,

			standardInboundPolicy,
			standardInboundPolicyPolicing,
			standardInboundInterface,
			standardInboundServiceInstance,
			standardInboundServiceInstanceVlan,
			standardOutboundPolicy,
			standardOutboundPolicyShaping,
			standardOutboundPolicyGroupExp,

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
.listDiv {
  color: var(--color-dark);
  border: solid 0.2rem var(--color-dark);
  padding: 3rem;
  margin-bottom: 3rem;
}
</style>
