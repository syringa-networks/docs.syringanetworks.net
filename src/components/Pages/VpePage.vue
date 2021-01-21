<template>
	<main id="content">
		<page-header>
			<template slot="title">Azure/AWS VPE Configuration</template>
			<template slot="subtitle">
				How to configure the CSRv routers in Azure and AWS.
			</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Licensing">
				<h3 class="h3">CSR Licensing</h3>
				<pre>
          <code>
license smart enable
!
call-home
 vrf OUTSIDE
 exit
!
ip http client source-interface gigabitEthernet1
!
license smart register idtoken <span>***</span>
!
platform hardware throughput level MB <span>***</span>
!
show lic status
show license all
!
wr
reload
          </code>
        </pre>
			</tab>
			<tab name="VRF">
				<h3 class="h3">VRF Configuration</h3>
				<pre>
          <code>
vrf definition SYG
 rd 15305:5<span>x</span>00199
 route-target both 15305:99
 address-family ipv4
 exit-address-family
!
vrf definition SIMPLOT
 rd 15305:5<span>x</span>001136
 route-target both 15305:1000136
 address-family ipv4
 exit-address-family
!
ip vrf OUTSIDE
 description Global SDWAN - All Tunnel Interfaces
          </code>
        </pre>
			</tab>
			<tab name="Interface">
				<h3 class="h3">Interface Configuration</h3>
				<pre>
          <code>
interface gigabitEthernet1
 desc WAN Interface vrf OUTSIDE
 ip vrf forwarding OUTSIDE
 ip address dhcp
!
interface Loopback0
 description Global Router-ID
 ip address 10.16.128.<span>x</span> 255.255.255.255
          </code>
        </pre>
			</tab>
			<tab name="Prefix Filter">
				<h3 class="h3">Filter Out the Privates</h3>
				<pre>
          <code>
ip prefix-list SIMPLOT_PRIVATE seq 5 permit 10.0.0.0/8 le 32
ip prefix-list SIMPLOT_PRIVATE seq 10 permit 172.16.0.0/12 le 32
ip prefix-list SIMPLOT_PRIVATE seq 15 permit 192.168.0.0/16 le 32
          </code>
        </pre>
			</tab>
			<tab name="Routing">
				<h3 class="h3">OSPF/MPLS/BGP Configuration</h3>
				<pre>
          <code>
router ospf 8075
 router-id 10.16.128.<span>x</span>
 network 10.80.75.0 0.0.0.255 area 0
 mpls ldp autoconfig
 exit
!
interface Loopback0
 ip ospf 8075 area 0
!
mpls label protocol ldp
mpls ldp explicit-null
mpls ldp router-id Loopback0
no mpls ip propagate-ttl forwarded
!
router bgp 15305
 bgp router-id interface Loopback0
 bgp log-neighbor-changes
 !
 bgp listen range 10.255.22.x/28 peer-group SIMPLOT-136
 bgp listen range 10.255.22.x/28 peer-group SIMPLOT-1360
 bgp listen range 10.30.0.x/24 peer-group SYG-98
 bgp listen range 10.40.0.x/24 peer-group SYG-998
 !
 address-family ipv4 vrf SYG
  redistribute connected
  neighbor SYG-98 peer-group
  neighbor SYG-98 remote-as 65501
  neighbor SYG-98 send-community extended
  neighbor SYG-98 as-override
  neighbor SYG-98 soft-reconfiguration inbound
  neighbor SYG-998 peer-group
  neighbor SYG-998 remote-as 65501
  neighbor SYG-998 send-community extended
  neighbor SYG-998 as-override
  neighbor SYG-998 soft-reconfiguration inbound
  exit
  !
 address-family ipv4 vrf SIMPLOT
  redistribute connected
  neighbor SIMPLOT-136 peer-group
  neighbor SIMPLOT-136 remote-as 65501
  neighbor SIMPLOT-136 send-community extended
  neighbor SIMPLOT-136 as-override
  neighbor SIMPLOT-136 soft-reconfiguration inbound
  neighbor SIMPLOT-136 prefix-list SIMPLOT_PRIVATE out
  neighbor SIMPLOT-1360 peer-group
  neighbor SIMPLOT-1360 remote-as 65501
  neighbor SIMPLOT-1360 send-community extended
  neighbor SIMPLOT-1360 as-override
  neighbor SIMPLOT-1360 soft-reconfiguration inbound
  neighbor SIMPLOT-1360 prefix-list SIMPLOT_PRIVATE out
  exit
  !
          </code>
        </pre>
			</tab>
			<tab name="Crypto">
				<h3 class="h3">Crypto PKI / ISAKMP / IPSec</h3>
				<pre>
          <code>
crypto pki trustpoint cert-ca
 enrollment url http://67.215.44.6:80
 serial-number
 vrf OUTSIDE
 revocation-check none
 rsakeypair cert-ca
 auto-enroll 90
 exit
!
crypto pki authenticate cert-ca
  --> yes
crypto pki enroll cert-ca
<span>yfW?BWEmvc@^9w9D</span>
  --> yes
<span>oLOw8RI3rLIZ</span>
!
crypto isakmp policy 1
 encr aes 256
 hash sha256
 group 21
!
crypto isakmp profile isaprof
 ca trust-point cert-ca
 match identity address 0.0.0.0 OUTSIDE
 initiate mode aggressive
!
crypto ipsec transform-set SD-WAN esp-aes 256 esp-sha-hmac
 mode transport
!
crypto ipsec profile DMVPN-PKI-IPSEC-PROFILE
 set transform-set SD-WAN
 set pfs group21
 set isakmp-profile isaprof
          </code>
        </pre>
			</tab>
			<tab name="Tunnels">
				<h3 class="h3">Tunnel Configuration</h3>
				<pre>
          <code>
interface Tunnel8075
 description SD-WAN Global Connection
 ip address 10.80.75.<span>x</span> 255.255.255.0
 ip mtu 1400
 ip nhrp authentication SD-WAN
 ip nhrp network-id 8075
 ip nhrp nhs 10.80.75.1 nbma 66.232.64.83 multicast <span>(ATM)</span>
 ip nhrp nhs 10.80.75.2 nbma 66.232.64.82 multicast <span>(TDM)</span>
 ip nhrp nhs 10.80.75.3 nbma 52.175.208.65 multicast <span>(US West)</span>
 ip nhrp nhs 10.80.75.4 nbma 40.115.141.181 multicast <span>(Japan East)</span>
 ip nhrp nhs 10.80.75.5 nbma 13.67.93.41 multicast <span>(Southeast Asia)</span>
 ip nhrp nhs 10.80.75.6 nbma 65.52.175.133 multicast <span>(East Asia)</span>
 no ip nhrp shortcut
 ip tcp adjust-mss 1360
 ip ospf network point-to-multipoint
 ip ospf 8075 area 0
 mpls ip
 mpls mtu 1400
 tunnel source GigabitEthernet1
 tunnel mode gre multipoint
 tunnel key 8075
 tunnel vrf OUTSIDE
 tunnel protection ipsec profile DMVPN-PKI-IPSEC-PROFILE shared

interface Tunnel98
 description MGMT to SD-WAN vrf SYG
 vrf forwarding SYG
 ip address 10.30.0.<span>x</span> 255.255.255.0
 ip mtu 1400
 ip nhrp authentication SYG
 ip nhrp network-id 98
 ip nhrp map multicast dynamic
 ip nhrp redirect
 ip tcp adjust-mss 1360
 tunnel source GigabitEthernet1
 tunnel mode gre multipoint
 tunnel key 98
 tunnel vrf OUTSIDE
 tunnel protection ipsec profile DMVPN-PKI-IPSEC-PROFILE shared

interface Tunnel998
 description MGMT to SD-WAN vrf SYG
 vrf forwarding SYG
 ip address 10.40.0.<span>x</span> 255.255.255.240
 ip mtu 1400
 ip nhrp authentication SYG
 ip nhrp network-id 998
 ip nhrp map multicast dynamic
 ip nhrp redirect
 ip tcp adjust-mss 1360
 tunnel source GigabitEthernet1
 tunnel mode gre multipoint
 tunnel key 998
 tunnel vrf OUTSIDE
 tunnel protection ipsec profile DMVPN-PKI-IPSEC-PROFILE shared

interface Tunnel136
 description DIST to SD-WAN vrf SIMPLOT
 vrf forwarding SIMPLOT
 ip address 10.255.22.<span>x</span> 255.255.255.240
 ip mtu 1400
 ip nhrp authentication SIMPLOT
 ip nhrp network-id 136
 ip nhrp map multicast dynamic
 ip nhrp redirect
 ip tcp adjust-mss 1360
 tunnel source GigabitEthernet1
 tunnel mode gre multipoint
 tunnel key 136
 tunnel vrf OUTSIDE
 tunnel protection ipsec profile DMVPN-PKI-IPSEC-PROFILE shared

interface Tunnel1360
 description DIST to SD-WAN vrf SIMPLOT
 vrf forwarding SIMPLOT
 ip address 10.255.22.<span>x</span> 255.255.255.240
 ip mtu 1400
 ip nhrp authentication SIMPLOT
 ip nhrp network-id 1360
 ip nhrp map multicast dynamic
 ip nhrp redirect
 ip tcp adjust-mss 1360
 tunnel source GigabitEthernet1
 tunnel mode gre multipoint
 tunnel key 1360
 tunnel vrf OUTSIDE
 tunnel protection ipsec profile DMVPN-PKI-IPSEC-PROFILE shared
        </code>
      </pre>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';

export default {
	name: 'AzurePage',
	components: {
		PageHeader
	}
};
</script>
