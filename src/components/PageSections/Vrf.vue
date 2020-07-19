<template>
	<div>
		<h3>VRF Config</h3>
		<pre>
      <code>
vrf definition ISP1
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
vrf definition ISP2
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
vrf definition CUST
 rd 2:1
 route-target export 2:1
 route-target import 2:1
 route-target import 1:1
 route-target import 1:2
 !
 address-family ipv4
 exit-address-family
 !
 address-family ipv6
 exit-address-family
!
vrf definition SYG
 rd 3:1
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
