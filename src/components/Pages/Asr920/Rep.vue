<template>
	<div>
		<div :class="$style.inputFlex">
			<div>
				<h6>Customer Name</h6>
				<input v-model="customerName" />
			</div>
			<div>
				<h6>Router Hostname</h6>
				<input v-model="hostName" />
			</div>

			<div>
				<h6>Enable Secret</h6>
				<input v-model="secret" />
			</div>
			<div>
				<h6>Trouble Password</h6>
				<input v-model="troublePassword" />
			</div>
			<div>
				<h6>Management BDI</h6>
				<input v-model="mgmtBDI" />
			</div>
			<div>
				<h6>Management IP Address</h6>
				<input v-model="mgmtIP" />
			</div>
			<div>
				<h6>Management Subnet Mask</h6>
				<input v-model="mgmtSubnetMask" />
			</div>
			<div>
				<h6>Management Gateway IP</h6>
				<input v-model="mgmtGatewayIP" />
			</div>
			<div>
				<h6>Policy Map Name</h6>
				<input v-model="policyMapName" />
			</div>
			<div>
				<h6>INBOUND Policer Rate</h6>
				<input v-model="inboundPolicy" />
				<select v-model="throughput">
					<option disabled value="">Policing Throughput</option>
					<option>{{ kilobits }}: kbps</option>
					<option>{{ megabits }}: mbps</option>
					<option>{{ gigabits }}: gbps</option>
				</select>
			</div>
			<div>
				<h6>REP Segment ID</h6>
				<input v-model="repSegmentID" />
			</div>
			<div>
				<h6>REP Bridge Domain</h6>
				<input v-model="repBridgeDomain" />
			</div>
			<div>
				<h6>All VLANs on REP Ring</h6>
				<input v-model="repVlans" />
			</div>
			<div>
				<h6>UPS IP</h6>
				<input v-model="upsIP" />
			</div>
			<div>
				<h6>CPE Hostname</h6>
				<input v-model="cpeHostname" />
			</div>
			<div>
				<h6>Customer VLAN</h6>
				<input v-model="custVlan" />
			</div>
			<div>
				<h6>Circuit ID</h6>
				<input v-model="circuitID" />
			</div>
			<div>
				<h6>Service Order Number</h6>
				<input v-model="serviceOrderID" />
			</div>
			<div>
				<h6>Maintenance Span</h6>
				<input v-model="maintenanceSpan" />
			</div>
			<div>
				<h6>Z Location Address</h6>
				<input v-model="zLocationAddress" />
			</div>
			<div>
				<h6>Latitude</h6>
				<input v-model="lat" />
			</div>
			<div>
				<h6>Longitude</h6>
				<input v-model="long" />
			</div>
		</div>
		<pre>
      <code>
  no service pad
  service timestamps debug datetime msec localtime show-timezone
  service timestamps log datetime msec localtime show-timezone
  service password-encryption
  service pt-vty-logging
  no service dhcp
  service unsupported-transceiver
  no platform punt-keepalive disable-kernel-core
  platform xconnect load-balance-hash-algo mac-ip-instanceid
  platform tcam-parity-error enable
  platform tcam-threshold alarm-frequency 1
  platform shell
  !
  hostname <span>{{ hostName }}</span>
  !
  logging buffered 512000
  enable secret <span>{{ secret }}</span>
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
  no ip source-route
  !
  ip domain name syringanetworks.net
  !
  no ip igmp snooping
  udld recovery
  !
  udld recovery interval 600
  !
  multilink bundle-name authenticated
  !
  license accept end user agreement
  license boot level metroaccess
  !
  username trouble privilege 15 secret <span>{{ troublePassword }}</span>
  !
  redundancy
  bridge-domain <span>{{ mgmtBDI }}</span>
  !
  transceiver type all
   monitoring
  cdp run
  !
  policy-map {{ policyMapName }}
   class class-default
    police cir <span>{{ inboundPolicy }} {{ throughput[0] }}</span> bc <span>{{ bcCalculation }}</span>
    conform-action transmit 
    exceed-action drop 
  !
  interface GigabitEthernet0/0/0
   description MGMT to UPS - <span>{{ upsIP}}</span>
   mtu 9216
   no ip address
   media-type rj45
   negotiation auto
   storm-control broadcast level 5.00
   service instance 4000 ethernet
    description MGMT to UPS - <span>{{ upsIP}}</span>
    encapsulation untagged
    bridge-domain <span>{{ mgmtBDI }}</span>
    !
  !
  interface GigabitEthernet0/0/1
   description DIST to <span>{{ cpeHostname }}</span>
   mtu 9216
   no ip address
   logging event link-status
   load-interval 30
   media-type rj45
   negotiation auto
   service instance <span>{{ custVlan }}</span> ethernet
    description CUST <span>{{ circuitID }}</span> SO-<span>{{ serviceOrderID }}</span> <span>{{ customerName }}</span>
    encapsulation default
    service-policy input <span>{{ policyMapName }}</span>
    bridge-domain <span>{{ custVlan }}</span>
   !
   service instance <span>{{ mgmtBDI }}</span> ethernet
    description MGMT to <span>{{ cpeHostname }}</span>
    encapsulation dot1q <span>{{ mgmtBDI }}</span>
    rewrite ingress tag pop 1 symmetric
    bridge-domain <span>{{ mgmtBDI }}</span>
   !
  !
  interface TenGigabitEthernet0/0/4
   description DIST to <span>{{ maintenanceSpan }}</span>
   mtu 9216
   no ip address
   load-interval 30
   cdp enable
   udld port aggressive
   rep segment <span>{{ repSegmentID }}</span>
   service instance 1 ethernet
    encapsulation untagged
    l2protocol peer cdp udld
    bridge-domain <span>{{ repBridgeDomain }}</span>
   !
   service instance trunk 2 ethernet
    encapsulation dot1q <span>{{ repVlans }}</span>
    rewrite ingress tag pop 1 symmetric
    bridge-domain from-encapsulation
   !
  !
  interface TenGigabitEthernet0/0/5
   description DIST to <span>{{ maintenanceSpan }}</span>
   mtu 9216
   no ip address
   load-interval 30
   cdp enable
   udld port aggressive
   rep segment <span>{{ repSegmentID }}</span>
   service instance 1 ethernet
    encapsulation untagged
    l2protocol peer cdp udld
    bridge-domain <span>{{ repBridgeDomain }}</span>
   !
   service instance trunk 2 ethernet
    encapsulation dot1q <span>{{ repVlans }}</span>
    rewrite ingress tag pop 1 symmetric
    bridge-domain from-encapsulation
   !
  ! 
  interface BDI<span>{{ mgmtBDI }}</span>
   description MGMT
   ip address <span>{{ mgmtIP }}</span> <span>{{ mgmtSubnetMask }}</span>
  !
  interface GigabitEthernet0
   vrf forwarding Mgmt-intf
   ip address 192.168.1.1 255.255.255.0
   shutdown
   negotiation auto
  !
  ip route 0.0.0.0 0.0.0.0 <span>{{ mgmtGatewayIP }}</span>
  !
  ip forward-protocol nd
  no ip http server
  no ip http secure-server
  ip tftp source-interface BDI<span>{{ mgmtBDI }}</span>
  ip ssh version 2
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
  logging trap notifications
  logging host 192.168.80.16
  !
  snmp-server community OcmeQTo2 RO ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server community S1lFLzMi RW ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server trap timeout 1
  snmp-server queue-length 500
  snmp-server location <span>{{ zLocationAddress }}</span> [<span>{{ lat }}</span>, <span>{{ long }}</span>]
  snmp-server contact nsc@syringanetworks.net
  snmp-server chassis-id <span>{{ hostName }}</span>
  snmp-server ip precedence 6
  snmp-server host 192.168.80.16 version 2c fsWfWz27
  snmp-server manager
  snmp ifmib ifalias long
  snmp ifmib ifindex persist
  snmp mib persist cbqos
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
  ntp server 10.16.8.251
  !
      </code>
    </pre>
	</div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
	setup() {
		const customerName = 'CustomerName';
		const hostName = 'Hostname';

		const secret = 'ChangeMe';
		const troublePassword = 'ChangeMeToo';
		const mgmtBDI = 4094;
		const mgmtIP = 'Idaho - 10.121.0.0, Utah - 10.131.0.0, Wash - 10.141.0.0';
		const mgmtSubnetMask = '255.255.255.0';
		const mgmtGatewayIP = 'Example: 10.121.0.1';

		// REP
		const repSegmentID = 7;
		const repBridgeDomain = 24;
		const repVlans = '10, 11, 12';

		// Policy Map
		const policyMapName = 'PolicyMapName';
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

		const upsIP = '10.16.x.x';
		const cpeHostname = 'CPE Hostname';
		const custVlan = 10;
		const circuitID = '99/KRGS/100069//SYG';
		const serviceOrderID = 123456;
		const maintenanceSpan = 'MS-E1234';

		const zLocationAddress = '1234 Street St. Boise, ID 83704';
		const lat = '43.6150';
		const long = '116.2023';

		return {
			customerName,
			hostName,

			secret,
			troublePassword,
			mgmtBDI,
			mgmtIP,
			mgmtSubnetMask,
			mgmtGatewayIP,

			repSegmentID,
			repBridgeDomain,
			repVlans,

			policyMapName,
			kilobits,
			megabits,
			gigabits,
			throughput,
			inboundPolicy,
			bcCalculation,

			upsIP,
			cpeHostname,
			custVlan,
			circuitID,
			serviceOrderID,
			maintenanceSpan,

			zLocationAddress,
			lat,
			long
		};
	}
};
</script>

<style lang="stylus" module>
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
}
</style>
