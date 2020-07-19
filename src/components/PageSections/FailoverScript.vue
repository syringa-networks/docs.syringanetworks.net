<template>
	<div>
		<h3>Failover Script</h3>
		<pre>
      <code>
event manager applet FAILOVER
 event syslog pattern "TRACK-6-STATE: 1 ip sla 1 reachability Up -> Down"
 action 1.0 cli command "enable"
 action 1.1 cli command "conf t"
 action 1.2 cli command "vrf definition CUST"
 action 1.3 cli command "no route-target import 1:1"
 action 1.4 cli command "route-target import 1:2"
 action 1.5 cli command "interface GigabitEthernet0/0/0"
 action 1.6 cli command "no ip nat outside"
 action 1.7 cli command "do clear ip nat translation *"
 action 1.8 cli command "no ip nat inside source route-map ISP1 interface GigabitEthernet0/0/0 vrf CUST overload"
 action 1.9 cli command "interface Cellular0/2/0"
 action 2.0 cli command "ip nat outside"
 action 2.1 cli command "ip nat inside source route-map ISP2 interface Cellular0/2/0 vrf CUST overload"
 action 2.2 exit
event manager applet FAILBACK
 event syslog pattern "TRACK-6-STATE: 1 ip sla 1 reachability Down -> Up"
 action 1.0 cli command "enable"
 action 1.1 cli command "conf t"
 action 1.2 cli command "vrf definition CUST"
 action 1.3 cli command "no route-target import 1:2"
 action 1.4 cli command "route-target import 1:1"
 action 1.5 cli command "interface Cellular0/2/0"
 action 1.6 cli command "no ip nat outside"
 action 1.7 cli command "do clear ip nat translation *"
 action 1.8 cli command "no ip nat inside source route-map ISP2 interface Cellular0/2/0 vrf CUST overload"
 action 1.9 cli command "interface GigabitEthernet0/0/0"
 action 2.0 cli command "ip nat outside"
 action 2.1 cli command "ip nat inside source route-map ISP1 interface GigabitEthernet0/0/0 vrf CUST overload"
 action 2.2 exit
      </code>
    </pre>
	</div>
</template>
