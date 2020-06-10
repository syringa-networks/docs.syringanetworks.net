<template>
	<div>
		<!-- QUESTIONS -->
		<!-- HANDOFF REQUIREMENT -->
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">
					What type of handoff is this?
				</h6>
				<select :class="$style.select" v-model="handoff.selectedHandoff">
					<option :value="{ id: handoff.id, name: handoff.name }" v-for="handoff in handoffChoice" :key="handoff.id">{{
						handoff.name
					}}</option>
				</select>
			</div>
		</div>
		<!-- END HANDOFF REQUIREMENT -->

		<!-- UPS REQUIREMENT -->
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">
					Does this site include a UPS?
				</h6>
				<select :class="$style.select" v-model="ups.selectedUPS">
					<option :value="{ id: ups.id, name: ups.name }" v-for="ups in upsChoice" :key="ups.id">{{ ups.name }}</option>
				</select>
			</div>
		</div>
		<!-- END UPS REQUIREMENT -->

		<!-- CPE REQUIREMENT -->
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">
					Does this site include a CPE?
				</h6>
				<select :class="$style.select" v-model="cpe.selectedCPE">
					<option :value="{ id: cpe.id, name: cpe.name }" v-for="cpe in cpeChoice" :key="cpe.id">{{ cpe.name }}</option>
				</select>
			</div>
		</div>
		<!-- END CPE REQUIREMENT -->

		<!-- VOICE REQUIREMENT -->
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Does this site include Voice?</h6>
				<select :class="$style.select" v-model="voice.selectedVoice">
					<option :value="{ id: voice.id, name: voice.name }" v-for="voice in voiceChoice" :key="voice.id">{{
						voice.name
					}}</option>
				</select>
			</div>
		</div>
		<!-- END VOICE REQUIREMENT -->
		<!-- END QUESTIONS -->

		<!-- INFORMATION -->
		<div :class="$style.inputFlex">
			<!-- UPS v-if -->
			<div v-if="ups.selectedUPS.name === 'Yes'">
				<h6 :class="$style.h6">
					UPS IP - 10.121, 10.131, 10.141
				</h6>
				<input :class="$style.input" v-model="upsIP" />
			</div>
			<div v-if="ups.selectedUPS.name === 'Yes'">
				<h6 :class="$style.h6">UPS Hostname</h6>
				<input :class="$style.input" v-model="upsHostname" />
			</div>
			<!-- END UPS v-if -->

			<!-- CPE v-if -->
			<div v-if="cpe.selectedCPE.name === 'Yes'">
				<h6 :class="$style.h6">CPE Hostname</h6>
				<input :class="$style.input" v-model="cpeHostname" />
			</div>
			<div v-if="cpe.selectedCPE.name === 'Yes' || ups.selectedUPS.name === 'Yes'">
				<h6 :class="$style.h6">UPS/CPE MGMT Gateway</h6>
				<input :class="$style.input" v-model="mgmtUpsGateway" />
			</div>
			<div v-if="cpe.selectedCPE.name === 'Yes' || ups.selectedUPS.name === 'Yes'">
				<h6 :class="$style.h6">
					UPS/CPE MGMT Subnet Mask - /28 or /24
				</h6>
				<input :class="$style.input" v-model="mgmtUpsSubnetMask" />
			</div>
			<!-- END CPE v-if -->

			<!-- VOICE v-if -->
			<div v-if="voice.selectedVoice.name === 'Yes'">
				<h6 :class="$style.h6">SYG PBX RD</h6>
				<input :class="$style.input" v-model="sygPBXRD" />
			</div>
			<!-- END VOICE v-if -->

			<div>
				<h6 :class="$style.h6">Inbound Policy Map Name</h6>
				<input :class="$style.input" v-model="policyMapName" />
			</div>
			<div>
				<h6 :class="$style.h6">INBOUND Policer Rate</h6>
				<input :class="$style.input" v-model="inboundPolicy" />
				<select :class="$style.select" v-model="throughput">
					<option disabled value="">Policing Throughput</option>
					<option>{{ kilobits }}: kbps</option>
					<option>{{ megabits }}: mbps</option>
					<option>{{ gigabits }}: gbps</option>
				</select>
			</div>
			<div>
				<h6 :class="$style.h6">
					Loopback0 IP - 10.120, 10.130, 10.140
				</h6>
				<input :class="$style.input" v-model="loopbackIP" />
			</div>
			<!-- v-for Loop -->
			<div v-for="input in inputs" :key="input.id">
				<h6 :class="$style.h6">{{ input.name }}</h6>
				<input :class="$style.input" v-model="input.vmodel" />
			</div>
			<!-- End v-for Loop -->
		</div>
		<!-- END INFORMATION -->
		<pre>
      <code>
  vrf definition <span>{{ customerVRFName }}</span>
   description <span>{{ customerVRFName }}</span> VRF
   rd 15305:<span>{{ customerRD }}</span>
  !
  address-family ipv4
   route-target both 15305:<span>{{ customerNumber }}</span>
   exit-address-family
  !
  address-family ipv6
   exit-address-family
  !
  vrf definition Mgmt-intf
  !
  address-family ipv4
   exit-address-family
  !
  address-family ipv6
   exit-address-family
  !
  vrf definition SYG
   description SYG Internal Network
   rd 15305:<span>{{ sygRD }}</span>
  !
  address-family ipv4
   route-target both 15305:99
   exit-address-family
  !
  address-family ipv6
   exit-address-family
  !<template v-if="voice.selectedVoice.name === 'Yes'">
  vrf definition SYG_PBX
   description Syringa Networks Voice PBX Customers
   rd 15305:<span>{{ sygPBXRD }}</span>
  !
  address-family ipv4
   route-target both 15305:97
   exit-address-family
  !</template>
  policy-map <span>{{ policyMapName }}</span>
   class class-default
    police cir <span>{{ inboundPolicy }} {{ throughput[0] }}</span> bc <span>{{ bcCalculation }}</span>
    conform-action transmit 
    exceed-action drop
  !<template v-if="ups.selectedUPS.name === 'Yes'">
  interface GigabitEthernet0/0/0
   description MGMT to <span>{{ upsHostname }}</span> - <span>{{ upsIP}}</span>
   mtu 9216
   no ip address
   media-type rj45
   negotiation auto
   service instance 69 ethernet
    description MGMT to UPS
    encapsulation untagged
    bridge-domain 69
    !
  !</template><template v-if="ups.selectedUPS.name === 'No'">
  interface GigabitEthernet0/0/0
   description UNUSED
   mtu 9216
   no ip address
   media-type rj45
   negotiation auto
   shutdown
  !</template><template v-if="cpe.selectedCPE.name === 'Yes'">
  interface GigabitEthernet0/0/1
   description DIST to <span>{{ cpeHostname }}</span>
   mtu 9180
   no ip address
   media-type rj45
   negotiation auto
   no keepalive
   service instance 69 ethernet
    description MGMT to <span>{{ cpeHostname }}</span>
    encapsulation dot1q 69
    rewrite ingress tag pop 1 symmetric
    bridge-domain 69
   !
   service instance <span>{{ custServiceInstance }}</span> ethernet
    description CUST <span>{{ circuitID }}</span> SO-<span>{{ serviceOrderID }}</span> <span>{{ customerName }}</span>
    encapsulation dot1q <span>{{ custVlan }}</span>
    rewrite ingress tag pop 1 symmetric
    service-policy input <span>{{ policyMapName }}</span> 
    bridge-domain <span>{{ custVlan }}</span>
   !
  !</template><template v-if="cpe.selectedCPE.name === 'No'">
  interface GigabitEthernet0/0/1
   description CUST <span>{{ circuitID }}</span> SO-<span>{{ serviceOrderID }}</span> <span>{{ customerName }}</span>
   mtu 9180
   no ip address
   media-type rj45
   negotiation auto
   no keepalive
   !
   service instance <span>{{ custServiceInstance }}</span> ethernet
    description CUST <span>{{ circuitID }}</span> SO-<span>{{ serviceOrderID }}</span> <span>{{ customerName }}</span>
    encapsulation dot1q <span>{{ custVlan }}</span>
    rewrite ingress tag pop 1 symmetric
    service-policy input <span>{{ policyMapName }}</span> 
    bridge-domain <span>{{ custVlan }}</span>
   !
  !</template>
  interface GigabitEthernet0
   vrf forwarding Mgmt-intf
   ip address 192.168.1.1 255.255.255.0
   shutdown
   negotiation auto
  !<template v-if="cpe.selectedCPE.name === 'Yes' || ups.selectedUPS.name === 'Yes'">
  interface BDI69
   description MGMT
   vrf forwarding SYG
   ip address <span>{{ mgmtUpsGateway }}</span> <span>{{ mgmtUpsSubnetMask }}</span>
  !</template>
  interface BDI<span>{{ custVlan }}</span>
   description DIST <span>{{ circuitID }}</span> SO-<span>{{ serviceOrderID }}</span> <span>{{ customerName }}</span>
   vrf forwarding <span>{{ customerVRFName }}</span>
   ip address <span>{{ custBgpIP }}</span> <span>{{ custBgpMask }}</span>
  !
  router bgp 15305
   bgp router-id <span>{{ loopbackIP }}</span>
   bgp log-neighbor-changes
   no bgp default ipv4-unicast
   timers bgp 10 30
   !
   address-family vpnv4
    neighbor 10.16.128.9 activate
    neighbor 10.16.128.9 send-community extended
    neighbor 10.16.128.19 activate
    neighbor 10.16.128.19 send-community extended
   exit-address-family
   !
   address-family ipv4 mdt
    no bgp nexthop trigger enable
    neighbor 10.16.128.9 activate
    neighbor 10.16.128.9 send-community extended
    neighbor 10.16.128.19 activate
    neighbor 10.16.128.19 send-community extended
   exit-address-family
   !
   address-family l2vpn vpls
    neighbor 10.16.128.9 activate
    neighbor 10.16.128.9 send-community extended
    neighbor 10.16.128.19 activate
    neighbor 10.16.128.19 send-community extended
   exit-address-family
   !
   address-family ipv4 vrf <span>{{ customerVRFName }}</span>
    redistribute connected
    redistribute static
    neighbor <span>{{ custBgpPeerIp }}</span> remote-as 65501
    neighbor <span>{{ custBgpPeerIp }}</span> activate
    neighbor <span>{{ custBgpPeerIp }}</span> as-override
    neighbor <span>{{ custBgpPeerIp }}</span> soft-reconfiguration inbound
   exit-address-family
   !
   address-family ipv4 vrf SYG
    redistribute connected
    neighbor <span>{{ sygBgpPeerIp }}</span> remote-as 65501
    neighbor <span>{{ sygBgpPeerIp }}</span> activate
    neighbor <span>{{ sygBgpPeerIp }}</span> as-override
    neighbor <span>{{ sygBgpPeerIp }}</span> soft-reconfiguration inbound
   exit-address-family
   !
   address-family ipv6 vrf SYG
    redistribute connected
   exit-address-family
   !<template v-if="voice.selectedVoice.name === 'Yes'">
   address-family ipv4 vrf SYG_PBX
    redistribute connected
    redistribute static
   exit-address-family
   !</template>
  !
      </code>
    </pre>
	</div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
	data() {
		return {
			// Handoff
			handoff: {
				selectedHandoff: {
					id: 1,
					name: 'Internet'
				}
			},

			handoffChoice: [
				{ id: 1, name: 'Internet' },
				{ id: 2, name: 'L3VPN' },
				{ id: 3, name: 'L2VPN' },
				{ id: 4, name: 'VPLS' },
				{ id: 5, name: 'DIST' }
			],
			// END Handoff

			// UPS
			ups: {
				selectedUPS: {
					id: 1,
					name: 'Yes'
				}
			},

			upsChoice: [
				{ id: 1, name: 'Yes' },
				{ id: 2, name: 'No' }
			],
			// END UPS

			// CPE
			cpe: {
				selectedCPE: {
					id: 1,
					name: 'Yes'
				}
			},

			cpeChoice: [
				{ id: 1, name: 'Yes' },
				{ id: 2, name: 'No' }
			],
			// END CPE

			// Voice
			voice: {
				selectedVoice: {
					id: 1,
					name: 'Yes'
				}
			},

			voiceChoice: [
				{ id: 1, name: 'Yes' },
				{ id: 2, name: 'No' }
			]
			// END Voice
		};
	},
	setup() {
		// v-if hidden/shown
		const sygPBXRD = '1410097';
		const upsIP = '10.121.0.2';
		const upsHostname = 'UPS Hostname';
		const cpeHostname = 'CPE Hostname';
		const mgmtUpsGateway = '10.121.0.1';
		const mgmtUpsSubnetMask = '255.255.255.240';
		// end v-if hidden/shown

		// Policy Map
		const policyMapName = '100M_IN';
		const kilobits = ref('k');
		const megabits = ref('m');
		const gigabits = ref('g');
		const throughput = ref('');
		const inboundPolicy = ref(100);

		const bcCalculation = computed(() => {
			if (throughput.value[0] === 'k') {
				return ((inboundPolicy.value * 1000) / 8) * 0.05;
			} else if (throughput.value[0] === 'm') {
				return ((inboundPolicy.value * 1000000) / 8) * 0.05;
			} else if (throughput.value[0] === 'g') {
				return ((inboundPolicy.value * 1000000000) / 8) * 0.05;
			} else {
				return '100000';
			}
		});
		// End Policy Map

		//v-for Loop
		const customerName = 'CUSTOMER';
		const customerVRFName = 'CUSTOMER_VRF';
		const customerRD = '14100136';
		const customerNumber = '136';
		const loopbackIP = ref('10.120.0.1');
		const sygRD = '1410099';
		const custServiceInstance = '10';
		const custVlan = '10';
		const circuitID = '99/KRGS/100069//SYG';
		const serviceOrderID = '123456';
		const custBgpIP = '10.132.22.1';
		const custBgpPeerIp = '10.132.22.2';
		const custBgpMask = '255.255.255.252';
		const sygBgpPeerIp = '10.10.10.2';

		const inputs = [
			{
				id: 0,
				name: 'Customer Name',
				vmodel: customerName
			},
			{
				id: 1,
				name: 'Customer VRF Name',
				vmodel: customerVRFName
			},
			{ id: 2, name: 'Customer RD', vmodel: customerRD },
			{
				id: 3,
				name: 'Customer Number',
				vmodel: customerNumber
			},
			{ id: 4, name: 'SYG RD', vmodel: sygRD },
			{
				id: 5,
				name: 'Customer Service Instance',
				vmodel: custServiceInstance
			},
			{ id: 6, name: 'Customer VLAN', vmodel: custVlan },
			{ id: 7, name: 'Circuit ID', vmodel: circuitID },
			{
				id: 8,
				name: 'Service Order Number',
				vmodel: serviceOrderID
			},
			{
				id: 9,
				name: 'Customer BGP LAN IP - SYG Side',
				vmodel: custBgpIP
			},
			{
				id: 10,
				name: 'Customer BGP LAN IP Subnet Mask',
				vmodel: custBgpMask
			},
			{
				id: 11,
				name: 'Customer BGP Peer IP - Cust Side',
				vmodel: custBgpPeerIp
			},
			{
				id: 12,
				name: 'SYG BGP Peer IP',
				vmodel: sygBgpPeerIp
			}
		];
		// End v-for Loop

		return {
			inputs,
			customerName,
			customerVRFName,
			customerRD,
			customerNumber,
			sygRD,
			sygPBXRD,
			policyMapName,
			kilobits,
			megabits,
			gigabits,
			throughput,
			inboundPolicy,
			bcCalculation,
			loopbackIP,
			upsIP,
			upsHostname,
			cpeHostname,
			custServiceInstance,
			custVlan,
			circuitID,
			serviceOrderID,
			mgmtUpsGateway,
			mgmtUpsSubnetMask,
			custBgpIP,
			custBgpPeerIp,
			custBgpMask,
			sygBgpPeerIp
		};
	},
	computed: {
		customerName() {
			return this.inputs[0].vmodel;
		},
		customerVRFName() {
			return this.inputs[1].vmodel;
		},
		customerRD() {
			return this.inputs[2].vmodel;
		},
		customerNumber() {
			return this.inputs[3].vmodel;
		},
		sygRD() {
			return this.inputs[4].vmodel;
		},
		custServiceInstance() {
			return this.inputs[5].vmodel;
		},
		custVlan() {
			return this.inputs[6].vmodel;
		},
		circuitID() {
			return this.inputs[7].vmodel;
		},
		serviceOrderID() {
			return this.inputs[8].vmodel;
		},
		custBgpIP() {
			return this.inputs[9].vmodel;
		},
		custBgpMask() {
			return this.inputs[10].vmodel;
		},
		custBgpPeerIp() {
			return this.inputs[11].vmodel;
		},
		sygBgpPeerIp() {
			return this.inputs[12].vmodel;
		}
	}
};
</script>

<style lang="stylus" module>
.h3 {
  padding: 4rem;
  margin-top: -3rem;
  color: var(--color-white);
  background-image: var(--gradient-rainbow);
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

  input, select {
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
  appearance: none;
  background: url('~@/assets/img/ArrowDown.svg') 92% / 8% no-repeat;
  color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-orange-5);
  padding: 1rem;
  padding-right: 6rem;

  &:focus, &:active {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}
</style>
