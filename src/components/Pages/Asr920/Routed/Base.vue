<template>
	<div>
		<h3>920 Base: Routed</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6>How Many Ports are on the 920?</h6>
				<select v-model="port.selectedPort">
					<option :value="{ id: port.id, name: port.name }" v-for="port in portChoice" :key="port.id">
						{{ port.name }}
					</option>
				</select>
			</div>
		</div>

		<!-- v-for Loop -->
		<div :class="$style.inputFlex">
			<div>
				<h6>
					Lo0 IP Address - 10.120, 10.130, 10.140
				</h6>
				<input v-model="loopbackIP" />
			</div>
			<div v-for="input in inputs" :key="input.id">
				<h6>{{ input.name }}</h6>
				<input v-model="input.vmodel" />
			</div>
		</div>
		<!-- End v-for Loop -->
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
enable secret <span>{{ secret }}</span>
!
username trouble privilege 15 secret <span>{{ troublePassword }}</span>
!
interface Loopback0
 description DIST Loopback0
 ip address <span>{{ loopbackIP }}</span> 255.255.255.255
 ip pim sparse-mode
 load-interval 30
!<template v-if="port.selectedPort.name === '4-Port'">
interface TenGigabitEthernet0/0/4</template><template v-if="port.selectedPort.name === '12-Port'">
interface TenGigabitEthernet0/0/10</template><template v-if="port.selectedPort.name === '24-Port'">
interface TenGigabitEthernet0/0/26</template>
 description DIST to <span>{{ maintenanceSpan }}</span> <span>{{ isisDescriptionLow }}</span>
 mtu 9202
 ip address <span>{{ isisIpLow }}</span> 255.255.255.254
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
!<template v-if="port.selectedPort.name === '4-Port'">
interface TenGigabitEthernet0/0/5</template><template v-if="port.selectedPort.name === '12-Port'">
interface TenGigabitEthernet0/0/11</template><template v-if="port.selectedPort.name === '24-Port'">
interface TenGigabitEthernet0/0/27</template>
 description DIST to <span>{{ maintenanceSpan }}</span> <span>{{ isisDescriptionHigh }}</span>
 mtu 9202
 ip address <span>{{ isisIpHigh }}</span> 255.255.255.254
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
			// Ports
			port: {
				selectedPort: {
					id: 1,
					name: '4-Port'
				}
			},

			portChoice: [
				{ id: 1, name: '4-Port' },
				{ id: 2, name: '12-Port' },
				{ id: 3, name: '24-Port' }
			]
			// End Ports
		};
	},

	setup() {
		const hostName = 'HOSTNAME';
		const secret = 'ChangeMe';
		const troublePassword = 'ChangeMeToo';
		const loopbackIP = ref('10.120.0.1');
		const maintenanceSpan = 'MS-E1234';
		const isisIpLow = '10.120.128.0';
		const isisDescriptionLow = 'BOI-DEV-P-1 Te0/0/4';
		const isisIpHigh = '10.120.128.3';
		const isisDescriptionHigh = 'BOI-DEV-P-2 Te0/0/5';
		const zLocationAddress = '1234 Street St. Boise, ID 83704';
		const latitude = '43.6150';
		const longitude = '116.2023';

		const inputs = [
			{ id: 0, name: 'Router Hostname', vmodel: hostName },
			{ id: 1, name: 'Enable Secret', vmodel: secret },
			{
				id: 2,
				name: 'Trouble Password',
				vmodel: troublePassword
			},
			{
				id: 3,
				name: 'Maintenance Span',
				vmodel: maintenanceSpan
			},
			{
				id: 4,
				name: 'ISIS IP Address - Low Port',
				vmodel: isisIpLow
			},
			{
				id: 5,
				name: 'ISIS Interface Description - Low Port',
				vmodel: isisDescriptionLow
			},
			{
				id: 6,
				name: 'ISIS IP Address - High Port',
				vmodel: isisIpHigh
			},
			{
				id: 7,
				name: 'ISIS Interface Description - High Port',
				vmodel: isisDescriptionHigh
			},
			{
				id: 8,
				name: 'Z Location Address',
				vmodel: zLocationAddress
			},
			{ id: 9, name: 'SNMP Latitude', vmodel: latitude },
			{ id: 10, name: 'SNMP Longitude', vmodel: longitude }
		];

		// ISIS Network ID Calculation
		const isisNetworkID = computed(() => {
			const address = loopbackIP.value;
			const parts = address.split('.').map(x => x.padStart(3, '0'));

			let isisNetworkId = parts.join('');
			isisNetworkId = isisNetworkId.substring(4);

			// Rejoin, split into items of 4-character long, rejoin by period
			return isisNetworkId.match(/.{4}/g).join('.');
		});

		return {
			inputs,
			hostName,
			secret,
			troublePassword,
			loopbackIP,
			maintenanceSpan,
			isisIpLow,
			isisDescriptionLow,
			isisIpHigh,
			isisDescriptionHigh,
			zLocationAddress,
			latitude,
			longitude,
			isisNetworkID
		};
	},

	computed: {
		hostName() {
			return this.inputs[0].vmodel;
		},
		secret() {
			return this.inputs[1].vmodel;
		},
		troublePassword() {
			return this.inputs[2].vmodel;
		},
		maintenanceSpan() {
			return this.inputs[3].vmodel;
		},
		isisIpLow() {
			return this.inputs[4].vmodel;
		},
		isisDescriptionLow() {
			return this.inputs[5].vmodel;
		},
		isisIpHigh() {
			return this.inputs[6].vmodel;
		},
		isisDescriptionHigh() {
			return this.inputs[7].vmodel;
		},
		zLocationAddress() {
			return this.inputs[8].vmodel;
		},
		latitude() {
			return this.inputs[9].vmodel;
		},
		longitude() {
			return this.inputs[10].vmodel;
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
}
</style>
