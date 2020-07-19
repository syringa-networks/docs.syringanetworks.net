<template>
	<div>
		<h3>Tunnel Interfaces</h3>
		<pre>
      <code>
  <span>// Primary Azure SYG VRF</span>
interface Tunnel98
  description MGMT to SD-WAN vrf SYG Primary ISP
  vrf forwarding SYG
  ip address 10.30.0.<span>12</span> 255.255.255.240
  no ip redirects
  ip mtu 1400
  ip nhrp authentication SYG
  ip nhrp network-id 98
  ip nhrp nhs 10.30.0.<span>1</span> nbma <span>52</span>.<span>175</span>.<span>208</span>.<span>65</span> multicast
  ip nhrp shortcut
  ip tcp adjust-mss 1360
  tunnel source GigabitEthernet0/0/0
  tunnel mode gre multipoint
  tunnel key 98
  tunnel vrf PRIMARY-ISP
  tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
!

<span>// Backup Azure SYG VRF</span>
interface Tunnel998
  description MGMT to SD-WAN_VPE vrf SYG Backup ISP
  vrf forwarding SYG
  ip address 10.40.0.<span>12</span> 255.255.255.240
  no ip redirects
  ip mtu 1400
  ip nhrp authentication SYG
  ip nhrp network-id 998
  ip nhrp nhs 10.40.0.<span>1</span> nbma <span>52</span>.<span>175</span>.<span>208</span>.<span>65</span> multicast
  ip nhrp shortcut
  ip tcp adjust-mss 1360
  tunnel source Cellular0/1/0
  tunnel mode gre multipoint
  tunnel key 998
  tunnel vrf BACKUP-ISP
  tunnel protection ipsec profile BACKUP-IPSEC-PROFILE shared
!

<span>// Primary ATM/TDM SYG VRF</span>
interface Tunnel99
  description MGMT to SD-WAN_TDM/ATM vrf SYG Primary ISP
  vrf forwarding SYG
  ip address 10.16.192.<span>12</span> 255.255.248.0
  no ip redirects
  ip mtu 1400
  ip nhrp authentication VPN
  ip nhrp network-id 99
  ip nhrp nhs 10.16.192.1 nbma 66.232.64.83 multicast
  ip nhrp nhs 10.16.192.2 nbma 66.232.64.82 multicast
  ip nhrp shortcut
  ip tcp adjust-mss 1360
  tunnel source GigabitEthernet0/0/0
  tunnel mode gre multipoint
  tunnel key 99
  tunnel vrf PRIMARY-ISP
  tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
!

<span>// Backup ATM/TDM SYG VRF</span>
interface Tunnel999
  description MGMT to SD-WAN vrf SYG Backup ISP
  vrf forwarding SYG
  ip address 10.16.201.<span>12</span> 255.255.248.0
  no ip redirects
  ip mtu 1400
  ip nhrp authentication VPN
  ip nhrp network-id 999
  ip nhrp nhs 10.16.200.1 nbma 66.232.64.83 multicast
  ip nhrp nhs 10.16.200.2 nbma 66.232.64.82 multicast
  ip nhrp shortcut
  ip tcp adjust-mss 1360
  tunnel source Cellular0/1/0
  tunnel mode gre multipoint
  tunnel key 999
  tunnel vrf BACKUP-ISP
  tunnel protection ipsec profile BACKUP-IPSEC-PROFILE shared
!

<span>// Primary Azure CUST VRF</span>
interface Tunnel136
  description CUST to SD-WAN vrf CUST Primary ISP
  vrf forwarding CUST
  ip address 10.255.22.<span>60</span> 255.255.255.240
  no ip redirects
  ip mtu 1400
  ip nhrp authentication SIMPLOT
  ip nhrp network-id 136
  ip nhrp nhs 10.255.22.<span>49</span> nbma <span>65</span>.<span>52</span>.<span>175</span>.<span>133</span> multicast
  ip nhrp shortcut
  ip tcp adjust-mss 1360
  tunnel source GigabitEthernet0/0/0
  tunnel mode gre multipoint
  tunnel key 136
  tunnel vrf PRIMARY-ISP
  tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
!

<span>// Backup Azure CUST VRF</span>
interface Tunnel1360
  description CUST to SD-WAN vrf CUST Backup ISP
  vrf forwarding CUST
  ip address 10.255.22.<span>76</span> 255.255.255.240
  no ip redirects
  ip mtu 1400
  ip nhrp authentication SIMPLOT
  ip nhrp network-id 1360
  ip nhrp nhs 10.255.22.<span>65</span> nbma <span>65</span>.<span>52</span>.<span>175</span>.<span>133</span> multicast
  ip nhrp shortcut
  ip tcp adjust-mss 1360
  tunnel source Cellular0/1/0
  tunnel mode gre multipoint
  tunnel key 1360
  tunnel vrf BACKUP-ISP
  tunnel protection ipsec profile BACKUP-IPSEC-PROFILE shared
!
      </code>
    </pre>
	</div>
</template>
