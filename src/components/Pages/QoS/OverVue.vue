<template>
	<div>
		<h3>QoS Overview</h3>
		<p>
			We are upgrading to more and more 100G links both in
			the CORE and backhaul from remote PoPs.
		</p>
		<p>
			QoS will allow us to make better use of these more
			expensive 100G links, by combining services (Carrier,
			Voice, Enterprise, Internet, etc) on these links.
		</p>
		<p>
			In the past we have thrown bandwidth and dedicated
			links at the issue, VZW Overlay. This was quicker and
			simpler to accomplish at the expense of cost.
		</p>
		<p>
			Finally with the QoS design it should give us a way to
			help mitigate DDoS attacks.
		</p>
		<qos-precedence></qos-precedence>
		<h3>QoS Implementation</h3>
		<ul :class="$style.ul">
			<li v-for="item in implementation" :key="item.id">
				{{ item.name }}
			</li>
		</ul>
		<h3>Hardware Limitations</h3>
		<ul :class="$style.ul">
			<li v-for="item in limitation" :key="item.id">
				{{ item.name }}
			</li>
		</ul>
		<h3>QoS Level Description</h3>
		<ul :class="$style.ul">
			<li v-for="item in description" :key="item.id">
				{{ item.name }}
			</li>
		</ul>
		<h3>QoS Strategy</h3>
		<ul :class="$style.ul">
			<li v-for="item in strategy" :key="item.id">
				{{ item.name }}
			</li>
		</ul>
		<h3>QoS Bandwidth Assumptions</h3>
		<ul :class="$style.ul">
			<li v-for="item in bandwidth" :key="item.id">
				{{ item.name }}
			</li>
		</ul>
		<div>
			<h3>Graphical View</h3>
			<table-asr></table-asr>
		</div>
	</div>
</template>

<script>
import QosPrecedence from './QosPrecedence';
import TableAsr from './TableAsr';

export default {
	components: {
		QosPrecedence,
		TableAsr
	},
	setup() {
		const implementation = [
			{
				name:
					'Mark all customer traffic on the ingress PE Router with EXP bits'
			},
			{
				name: 'Add Queueing to MPLS links'
			},
			{
				name: 'Access Rings'
			},
			{
				name:
					'Go back to PE routers and create the appropriate COS to EXP and EXP to COS maps'
			}
		];
		const limitation = [
			{
				name: '3400 - Limited to 4 total output queues'
			},
			{
				name: "3400 - Can't police the priority queue"
			},
			{
				name:
					'3400/901 - Recommend not using in blended rings (Carrier and Enterprise)'
			},
			{
				name: '901 - Limited to 6 total output queues'
			},
			{
				name: '901 - Limited to only 1 priority queue'
			},
			{
				name:
					'920/3600/903 - Limited to 2 priority queues (new code on the 920s enables 7 Priority Queues)'
			},
			{
				name:
					'5500 (HQoS Enabled) - Limited to 4 priority queues'
			}
		];
		const description = [
			{
				name:
					'6 and 7 - Network control traffic is Routing protocols, BFD, REP, etc. If these go down all customers and the device could go down'
			},
			{
				name:
					'5 - Carrier and Voice traffic is any customer we define as a carrier, mostly cell backhaul, and our own Voice customers'
			},
			{
				name:
					'4 - Enterprise Realtime Data is customer Voice, video conferencing, etc (EF, CS5, AF41, CS4)'
			},
			{
				name:
					'3 - Enterprise Critical Data is customer traffic deemed mission critical (CS6, CS2, CS3, DSCP 25, AF31)'
			},
			{
				name:
					'2 - Enterprise Transactional and Bulk Data is customer traffic that needs priority over best effort  (AF21,AF11, etc)'
			},
			{
				name:
					"1 - Enterprise Best Effort is customer traffic that doesn't need any special priority over other traffic (BE)"
			},
			{
				name:
					'0 - Internet Customers and Enterprise Scavenger Class'
			}
		];
		const strategy = [
			{
				name:
					'EXP bits will be used on MPLS links to mark, classify and queue traffic'
			},
			{
				name:
					'COS bits will be used on layer 2 access rings to mark, classify, and queue traffic'
			},
			{
				name:
					'On devices that have both MPLS and Access links there will be policys to map from COS to EXP and EXP to COS. This will be a direct mapping (ie COS 1 to EXP 1, COS 5 to EXP 5, EXP 4 to COS 4, etc)'
			},
			{
				name:
					'Provisioning will be required to mark traffic appropriately as it comes into the network. They will also be required to configure the appropriate policing, shaping and queuing policies at each end point of the circuit.'
			}
		];
		const bandwidth = [
			{
				name:
					'Guarantee 10% of interface bandwidth for Network control traffic. This could be lowered to probably 5% if needed. Not a lot of bandwidth needed, but if this takes hits everything else could go down'
			},
			{
				name:
					"Carrier and SYG Voice goes in priority queue level 2 if available. If not prioritize at least 40% of the interface bandwidth for this traffic. Equipment that can't do 2 levels of priority queueing are not recommended for mixed rings"
			},
			{
				name:
					'Enterprise Realtime Data traffic should get priority queue level 3 if available. If not available bandwidth needs should be small for this queue. Reserve 10-20% of interface bandwidth'
			},
			{
				name:
					'Enterprise Critical Data traffic should get prioriy queue level 4 if available. If not available bandwidth needs should be small as well. Reserve 15-30% of interface bandwidth'
			},
			{
				name:
					'Enterprise Transactional and Bulk Data  traffic should get priory queue level 5 if available. If not available bandwidth needs will be moderate to high and bursty traffic flows. Reserve 30%+ of interface bandwidth'
			},
			{
				name:
					'Enterprise Best Effort traffic should get priority level 6 if available. If not available bandwidth needs could be moderate to high as well as bursty traffic flows. Reserve 30%+ of interface bandwidth'
			},
			{
				name:
					'Internet and Enterprise Scavenger Class will get priority level 7 if available. If not available bandwidth will be bursty and subject to possible DDoS. Reserve 1% of interface bandwidth'
			}
		];

		return {
			implementation,
			limitation,
			description,
			strategy,
			bandwidth
		};
	}
};
</script>

<style lang="stylus" module>
.ul {
  list-style: square;
  margin-left: 4rem;
  margin-bottom: 3rem;

  li {
    color: var(--color-dark-2);
  }
}
</style>
