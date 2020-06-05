<template>
	<div>
		<h3>Setup VRFs</h3>
		<pre>
      <code>
  <span>// Primary Device</span>

  <span>// Primary ISP</span>
  vrf definition PRIMARY-ISP
    description Primary ISP
    rd 1:1
    route-target export 1:1
    route-target import 1:1
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !

  <span>// Backup ISP</span>
  vrf definition BACKUP-ISP
    description BACKUP ISP
    rd 1:2
    route-target export 1:2
    route-target import 1:2
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !

  <span>// CUST</span>
  vrf definition CUST
    description CUST VRF
    rd 2:1
    route-target export 2:1
    route-target import 2:1
    route-target import 1:2
    route-target import 1:1
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !   
  
  <span>// SYG</span>
  vrf definition SYG
    description SYG MGMT
    rd 3:1
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !

  <span>// Backup Device</span>

  <span>// Primary ISP</span>
  vrf definition PRIMARY-ISP
    description Primary ISP
    rd 1:4
    route-target export 1:4
    route-target import 1:4
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !

  <span>// Backup ISP</span>
  vrf definition BACKUP-ISP
    description BACKUP ISP
    rd 1:3
    route-target export 1:3
    route-target import 1:3
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !

  <span>// CUST</span>
  vrf definition CUST
    description CUST VRF
    rd 2:2
    route-target export 2:2
    route-target import 2:2
    route-target import 1:3
    route-target import 1:4
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !   
  
  <span>// SYG</span>
  vrf definition SYG
    description SYG MGMT
    rd 3:2
    !
    address-family ipv4
    exit-address-family
    !
    address-family ipv6
    exit-address-family
  !
      </code>
    </pre>
	</div>
</template>
