<template>
	<div>
		<div class="inputFlex">
			<h3>IOS-XE CUSTOM Policies</h3>
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
					<option>{{ kilobits }}: kbps</option>
					<option>{{ megabits }}: mbps</option>
					<option>{{ gigabits }}: gbps</option>
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
					<option>{{ kilobits }}: kbps</option>
					<option>{{ megabits }}: mbps</option>
					<option>{{ gigabits }}: gbps</option>
				</select>
			</div>
			<pre>
        <code>
  policy-map <span>{{ customInboundPolicy }}</span>
   class class-default
    police cir <span>{{ customInboundPolicyPolicing }} {{ customPolicingThroughput[0] }}</span> bc <span>{{ customBcCalculation }}</span>
    service-policy <span>{{ customInboundPolicyMarking }}</span>
  !
  policy-map <span>{{ customInboundPolicyMarking }}</span>
   class <span class="blue">CID_Q4</span>
    set qos-group 4
    set mpls experimental imposition 4
   !
   class <span class="green">CID_Q3</span>
    set qos-group 3
    set mpls experimental imposition 3
   !
   class <span class="purple">CID_Q2</span>
    set qos-group 2
    set mpls experimental imposition 2
   !
   class class-default
    set qos-group 1
    set mpls experimental imposition 1
   !
  !
  class-map match-all <span class="blue">CID_Q4</span>
    match dscp ef 
  !
  class-map match-all <span class="green">CID_Q3</span>
    match dscp af41 
  !
  class-map match-all <span class="purple">CID_Q2</span>
    match dscp af31 
  !

  policy-map <span>{{ customOutboundPolicy }}</span>
   class class-default
    shape average <span>{{ customOutboundPolicyShaping }} {{ customShapingThroughput[0] }}</span>   
    service-policy <span>{{ customOutboundPolicyQueuing }}</span>
  !
  policy-map <span>{{ customOutboundPolicyQueuing }}</span>
   class <span class="blue">Q4</span>
    bandwidth percent 25
   !
   class <span class="green">Q3</span>
    bandwidth percent 25
   !
   class <span class="purple">Q2</span>
    bandwidth percent 25
   !
   class class-default
    bandwidth percent 25
   !
  !
  class-map match-any <span class="blue">Q4</span>
    match qos-group 4
  !
  class-map match-any <span class="green">Q3</span>
    match qos-group 3
  !
  class-map match-any <span class="purple">Q2</span>
    match qos-group 2
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
				<input v-model="customInboundInterface" />
			</div>
			<div>
				<h6>Service Instance</h6>
				<input v-model="customInboundServiceInstance" />
			</div>
			<div>
				<h6>VLAN/Bridge Domain</h6>
				<input v-model="customInboundServiceInstanceVlan" />
			</div>
			<pre>
        <code>
  interface <span>{{ customInboundInterface }}</span>
    mtu 9216
    no ip address
    load-interval 30
    negotiation auto
    !
    
    <span>// Customer Plugged into PE Multipoint Customer QoS //</span>
    service instance <span>{{ customInboundServiceInstance }}</span> ethernet
      description MtP Terminate on PE Customer QoS
      encapsulation dot1q <span>{{ customInboundServiceInstanceVlan }}</span>
      service-policy input <span>{{ customInboundPolicy }}</span>
      service-policy output <span>{{ customOutboundPolicy }}</span>
      bridge-domain <span>{{ customInboundServiceInstanceVlan }}</span>
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

		const customBcCalculation = computed(() => {
			if (customPolicingThroughput.value[0] === 'k') {
				return ((customInboundPolicyPolicing.value * 1000) / 8) * 0.05;
			} else if (customPolicingThroughput.value[0] === 'm') {
				return ((customInboundPolicyPolicing.value * 1000000) / 8) * 0.05;
			} else if (customPolicingThroughput.value[0] === 'g') {
				return ((customInboundPolicyPolicing.value * 1000000000) / 8) * 0.05;
			} else {
				return null;
			}
		});
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

		const customInboundInterface = 'GigabitEthernet0/0/1';
		const customInboundServiceInstance = '56';
		const customInboundServiceInstanceVlan = '56';
		return {
			kilobits,
			megabits,
			gigabits,
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
.listDiv {
  color: var(--color-dark);
  border: solid 0.2rem var(--color-dark);
  padding: 3rem;
  margin-bottom: 3rem;
}
