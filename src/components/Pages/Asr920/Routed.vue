<template>
	<div>
		<div>
			<h3>
				Do this first:
			</h3>
			<pre>
        <code>
  !
  crypto key generate rsa mod 2048
  !
        </code>
      </pre>
		</div>
		<!-- QUESTIONS -->
		<!-- HANDOFF REQUIREMENT -->
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">
					What type of handoff is this?
				</h6>
				<select
					:class="$style.select"
					v-model="handoff.selectedHandoff"
				>
					<option
						:value="{ id: handoff.id, name: handoff.name }"
						v-for="handoff in handoffChoice"
						:key="handoff.id"
						>{{ handoff.name }}</option
					>
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
				<select
					:class="$style.select"
					v-model="ups.selectedUPS"
				>
					<option
						:value="{ id: ups.id, name: ups.name }"
						v-for="ups in upsChoice"
						:key="ups.id"
						>{{ ups.name }}</option
					>
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
				<select
					:class="$style.select"
					v-model="cpe.selectedCPE"
				>
					<option
						:value="{ id: cpe.id, name: cpe.name }"
						v-for="cpe in cpeChoice"
						:key="cpe.id"
						>{{ cpe.name }}</option
					>
				</select>
			</div>
		</div>
		<!-- END CPE REQUIREMENT -->

		<!-- VOICE REQUIREMENT -->
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Does it include Voice?</h6>
				<select
					:class="$style.select"
					v-model="voice.selectedVoice"
				>
					<option
						:value="{ id: voice.id, name: voice.name }"
						v-for="voice in voiceChoice"
						:key="voice.id"
						>{{ voice.name }}</option
					>
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
				<input
					:class="$style.input"
					v-model="upsHostname"
				/>
			</div>
			<!-- END UPS v-if -->

			<!-- CPE v-if -->
			<div v-if="cpe.selectedCPE.name === 'Yes'">
				<h6 :class="$style.h6">CPE Hostname</h6>
				<input
					:class="$style.input"
					v-model="cpeHostname"
				/>
			</div>
			<div
				v-if="
					cpe.selectedCPE.name === 'Yes' ||
						ups.selectedUPS.name === 'Yes'
				"
			>
				<h6 :class="$style.h6">UPS/CPE MGMT Gateway</h6>
				<input
					:class="$style.input"
					v-model="mgmtUpsGateway"
				/>
			</div>
			<div
				v-if="
					cpe.selectedCPE.name === 'Yes' ||
						ups.selectedUPS.name === 'Yes'
				"
			>
				<h6 :class="$style.h6">
					UPS/CPE MGMT Subnet Mask - /28 or /24
				</h6>
				<input
					:class="$style.input"
					v-model="mgmtUpsSubnetMask"
				/>
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
				<input
					:class="$style.input"
					v-model="policyMapName"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">INBOUND Policer Rate</h6>
				<input
					:class="$style.input"
					v-model="inboundPolicy"
				/>
				<select :class="$style.select" v-model="throughput">
					<option disabled value=""
						>Policing Throughput</option
					>
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
				<input
					:class="$style.input"
					v-model="input.vmodel"
				/>
			</div>
			<!-- End v-for Loop -->
		</div>
		<!-- END INFORMATION -->
		<pre>
      <code>
  service timestamps debug datetime msec localtime show-timezone
  service timestamps log datetime msec localtime show-timezone
  service password-encryption
  no service dhcp
  service unsupported-transceiver
  no platform punt-keepalive disable-kernel-core
  platform bfd-debug-trace 1
  platform xconnect load-balance-hash-algo mac-ip-instanceid
  platform tcam-parity-error enable
  platform tcam-threshold alarm-frequency 1
  platform shell
  boot-start-marker
  boot-end-marker
  logging buffered 512000
  no logging console
  !
  hostname <span>{{ hostName }}</span>
  !
  aaa new-model
  !
  aaa authentication login default group radius local
  aaa authorization exec default group radius local 
  !
  aaa session-id common
  clock timezone MST -7 0
  clock summer-time MDT recurring
  facility-alarm critical exceed-action shutdown
  cef table output-chain build favor convergence-speed
  !
  no ip domain lookup
  ip domain name syringanetworks.net
  ip multicast-routing distributed
  !
  login on-success log
  ipv6 unicast-routing
  ipv6 multicast rpf use-bgp
  !
  mpls label protocol ldp
  no mpls ip propagate-ttl forwarded
  mpls ldp explicit-null
  !
  multilink bundle-name authenticated
  xconnect logging pseudowire status
  !
  memory free low-watermark processor 5420
  file prompt quiet
  !
  redundancy
  bfd slow-timers 12000
  !
  transceiver type all
   monitoring
  cdp run
  !
  ip forward-protocol nd
  !
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
  enable secret <span>{{ secret }}</span>
  !
  username trouble privilege 15 secret <span>{{ troublePassword }}</span>
  !
  policy-map <span>{{ policyMapName }}</span>
   class class-default
    police cir <span>{{ inboundPolicy }} {{ throughput[0] }}</span> bc <span>{{ bcCalculation }}</span>
    conform-action transmit 
    exceed-action drop 
  !
  interface Loopback0
   description DIST Loopback0
   ip address <span>{{ loopbackIP }}</span> 255.255.255.255
   ip pim sparse-mode
   load-interval 30
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
  interface TenGigabitEthernet0/0/4
   description DIST to <span>{{ maintenanceSpan }}</span>
   mtu 9202
   ip address <span>{{ isisIPOne }}</span> 255.255.255.254
   no ip redirects
   ip router isis 
   ip pim sparse-mode
   load-interval 30
   carrier-delay msec 0
   cdp enable
   mpls ip
   bfd interval 100 min_rx 100 multiplier 3
   isis circuit-type level-2-only
   isis network point-to-point 
   isis csnp-interval 10
   isis bfd
  !
  interface TenGigabitEthernet0/0/5
   description DIST to <span>{{ maintenanceSpan }}</span>
   mtu 9202
   ip address <span>{{ isisIPTwo }}</span> 255.255.255.254
   no ip redirects
   ip router isis 
   ip pim sparse-mode
   load-interval 30
   carrier-delay msec 0
   cdp enable
   mpls ip
   bfd interval 100 min_rx 100 multiplier 3
   isis circuit-type level-2-only
   isis network point-to-point 
   isis csnp-interval 10
   isis bfd
  !
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
  router isis
   net 49.0001.0101.<span>{{ isisNetworkID }}</span>.00
   is-type level-2-only
   advertise passive-only
   metric-style wide level-2
   fast-flood 10
   set-overload-bit on-startup 180
   max-lsp-lifetime 65535
   lsp-refresh-interval 65000
   spf-interval 5 1 50
   prc-interval 5 1 50
   lsp-gen-interval 5 1 50
   no hello padding
   log-adjacency-changes all
   passive-interface Loopback0
   bfd all-interfaces
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
  ip bgp-community new-format
  ip ftp source-interface Loopback0
  no ip http server
  no ip http secure-server
  ip tftp source-interface Loopback0
  ip pim ssm range PIM-SSM
  ip ssh source-interface Loopback0
  ip ssh version 2
  !
  snmp-server community OcmeQTo2 RO ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server community S1lFLzMi RW ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server location <span>{{ zLocationAddress }}</span> [<span>{{ latitude }}</span>, <span>{{ longitude }}</span>]
  snmp-server contact nsc@syringanetworks.net
  snmp-server chassis-id <span>{{ hostName }}</span>
  snmp-server host 192.168.80.16 version 2c fsWfWz27
  !
  ip access-list standard IPV4_MGMT_ACCESS
   permit 192.168.7.0 0.0.0.255
   permit 192.168.64.0 0.0.63.255
   permit 10.16.0.0 0.1.255.255
   permit 10.116.0.0 0.0.255.255
   permit 10.45.0.0 0.0.255.255
   permit 10.100.0.0 0.0.255.255
   permit 10.120.0.0 0.1.255.255
   permit 10.130.0.0 0.1.255.255
   permit 10.140.0.0 0.1.255.255
   permit 172.20.4.0 0.0.0.255
   permit 172.20.16.0 0.0.0.255
   permit 172.20.20.0 0.0.0.255
   permit 66.232.64.0 0.0.0.63
   permit 66.232.64.64 0.0.0.31
   permit 67.215.44.0 0.0.0.63
   deny   any
  !
  ip access-list standard PIM-SSM
  !
  ip radius source-interface Loopback0 
  ip sla enable reaction-alerts
  logging alarm informational
  logging trap notifications
  logging source-interface Loopback0
  logging host 192.168.80.16
  !
  mpls ldp router-id Loopback0
  !
  radius-server attribute nas-port format d
  radius-server retry method reorder
  radius-server retransmit 1
  radius-server timeout 10
  radius-server key nascar48
  !
  radius server RADIUS
   address ipv4 192.168.80.132 auth-port 1645 acct-port 1646
  !
  ipv6 access-list IPV6_MGMT_ACCESS
  permit ipv6 2605:5800::/48 any
  permit ipv6 2605:5800:1::/48 any
  deny ipv6 any any
  !
  control-plane
  !
  banner motd #
             __________________________________________________________
            |                                                          |
            |              * * *  W A R N I N G  * * *                 |
            |                                                          |
            |       This computer system is private property.          |
            |__________________________________________________________|
            |                                                          |
            | Unauthorized access to this system is a violation of the |
            | Federal Electronic Communications Privacy Act of 1986,   |
            | and may result in fines of $250,000 and/or imprisonment  |
            | under ( Title 18, USC ).  This device is subject to mon- |
            | itoring.  If you are unauthorized or do not consent to   |
            | this monitoring of usage disconnect NOW.                 |
            |__________________________________________________________|
  #
  !
  line con 0
   exec-timeout 0 0
   logging synchronous
   stopbits 1
  line aux 0
   stopbits 1
  line vty 0 4
   session-timeout 60 
   access-class IPV4_MGMT_ACCESS in
   exec-timeout 15 0
   ipv6 access-class IPV6_MGMT_ACCESS in
   transport input both
  line vty 5 15
   session-timeout 60 
   access-class IPV4_MGMT_ACCESS in
   exec-timeout 15 0
   ipv6 access-class IPV6_MGMT_ACCESS in
   transport input both
  !
  ntp source Loopback0
  ntp server 10.16.8.251
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
				return (
					((inboundPolicy.value * 1000000000) / 8) * 0.05
				);
			} else {
				return '100000';
			}
		});
		// End Policy Map

		//v-for Loop
		const customerName = 'CUSTOMER';
		const hostName = 'HOSTNAME';
		const customerVRFName = 'CUSTOMER_VRF';
		const customerRD = '14100136';
		const customerNumber = '136';
		const sygRD = '1410099';
		const secret = 'ChangeMe';
		const troublePassword = 'ChangeMeToo';
		const loopbackIP = ref('10.120.0.1');
		const custServiceInstance = '10';
		const custVlan = '10';
		const circuitID = '99/KRGS/100069//SYG';
		const serviceOrderID = '123456';
		const maintenanceSpan = 'MS-E1234';
		const isisIPOne = '10.120.128.0';
		const isisIPTwo = '10.120.128.3';
		const custBgpIP = '10.132.22.1';
		const custBgpPeerIp = '10.132.22.2';
		const custBgpMask = '255.255.255.252';
		const sygBgpPeerIp = '10.10.10.2';
		const zLocationAddress =
			'1234 Street St. Boise, ID 83704';
		const latitude = '43.6150';
		const longitude = '116.2023';

		const inputs = [
			{
				id: 0,
				name: 'Customer Name',
				vmodel: customerName
			},
			{ id: 1, name: 'Router Hostname', vmodel: hostName },
			{
				id: 2,
				name: 'Customer VRF Name',
				vmodel: customerVRFName
			},
			{ id: 3, name: 'Customer RD', vmodel: customerRD },
			{
				id: 4,
				name: 'Customer Number',
				vmodel: customerNumber
			},
			{ id: 5, name: 'SYG RD', vmodel: sygRD },
			{ id: 6, name: 'Enable Secret', vmodel: secret },
			{
				id: 7,
				name: 'Trouble Password',
				vmodel: troublePassword
			},
			{
				id: 8,
				name: 'Customer Service Instance',
				vmodel: custServiceInstance
			},
			{ id: 9, name: 'Customer VLAN', vmodel: custVlan },
			{ id: 10, name: 'Circuit ID', vmodel: circuitID },
			{
				id: 11,
				name: 'Service Order Number',
				vmodel: serviceOrderID
			},
			{
				id: 12,
				name: 'Maintenance Span',
				vmodel: maintenanceSpan
			},
			{
				id: 13,
				name: 'ISIS IP - Te0/0/4',
				vmodel: isisIPOne
			},
			{
				id: 14,
				name: 'ISIS IP - Te0/0/5',
				vmodel: isisIPTwo
			},
			{
				id: 15,
				name: 'Customer BGP LAN IP - SYG Side',
				vmodel: custBgpIP
			},
			{
				id: 16,
				name: 'Customer BGP LAN IP Subnet Mask',
				vmodel: custBgpMask
			},
			{
				id: 17,
				name: 'Customer BGP Peer IP - Cust Side',
				vmodel: custBgpPeerIp
			},
			{
				id: 18,
				name: 'SYG BGP Peer IP',
				vmodel: sygBgpPeerIp
			},
			{
				id: 19,
				name: 'Z Location Address',
				vmodel: zLocationAddress
			},
			{ id: 20, name: 'SNMP Latitude', vmodel: latitude },
			{ id: 21, name: 'SNMP Longitude', vmodel: longitude }
		];
		// End v-for Loop

		const isisNetworkID = computed(() => {
			const address = loopbackIP.value;
			const parts = address
				.split('.')
				.map(x => x.padStart(3, '0'));

			let isisNetworkId = parts.join('');
			isisNetworkId = isisNetworkId.substring(4);

			// Rejoin, split into items of 4-character long, rejoin by period
			return isisNetworkId.match(/.{4}/g).join('.');
		});

		return {
			inputs,
			customerName,
			hostName,
			customerVRFName,
			customerRD,
			customerNumber,
			sygRD,
			sygPBXRD,
			secret,
			troublePassword,
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
			maintenanceSpan,
			isisIPOne,
			isisIPTwo,
			mgmtUpsGateway,
			mgmtUpsSubnetMask,
			custBgpIP,
			custBgpPeerIp,
			custBgpMask,
			sygBgpPeerIp,
			isisNetworkID,
			zLocationAddress,
			latitude,
			longitude
		};
	},
	computed: {
		customerName() {
			return this.inputs[0].vmodel;
		},
		hostName() {
			return this.inputs[1].vmodel;
		},
		customerVRFName() {
			return this.inputs[2].vmodel;
		},
		customerRD() {
			return this.inputs[3].vmodel;
		},
		customerNumber() {
			return this.inputs[4].vmodel;
		},
		sygRD() {
			return this.inputs[5].vmodel;
		},
		secret() {
			return this.inputs[6].vmodel;
		},
		troublePassword() {
			return this.inputs[7].vmodel;
		},
		custServiceInstance() {
			return this.inputs[8].vmodel;
		},
		custVlan() {
			return this.inputs[9].vmodel;
		},
		circuitID() {
			return this.inputs[10].vmodel;
		},
		serviceOrderID() {
			return this.inputs[11].vmodel;
		},
		maintenanceSpan() {
			return this.inputs[12].vmodel;
		},
		isisIPOne() {
			return this.inputs[13].vmodel;
		},
		isisIPTwo() {
			return this.inputs[14].vmodel;
		},
		custBgpIP() {
			return this.inputs[15].vmodel;
		},
		custBgpMask() {
			return this.inputs[16].vmodel;
		},
		custBgpPeerIp() {
			return this.inputs[17].vmodel;
		},
		sygBgpPeerIp() {
			return this.inputs[18].vmodel;
		},
		zLocationAddress() {
			return this.inputs[19].vmodel;
		},
		latitude() {
			return this.inputs[20].vmodel;
		},
		longitude() {
			return this.inputs[21].vmodel;
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
