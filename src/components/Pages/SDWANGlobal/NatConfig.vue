<template>
	<div>
		<h3>NAT Configuration</h3>
		<pre>
      <code>
ip nat inside source route-map NAT-BACKUP-ISP interface Cellular0/1/0 vrf CUST overload
ip nat inside source route-map NAT-PRIMARY-ISP interface GigabitEthernet0/0/0 vrf CUST overload
!
ip access-list extended NAT-BACKUP-ISP
  permit ip any any
ip access-list extended NAT-PRIMARY-ISP
  permit ip any any
!
route-map NAT-PRIMARY-ISP permit 10
  match ip address NAT-PRIMARY-ISP
  match interface GigabitEthernet0/0/0
!
route-map NAT-BACKUP-ISP permit 10
  match ip address NAT-BACKUP-ISP
  match interface Cellular0/1/0
!
      </code>
    </pre>
	</div>
</template>
