<template>
	<div>
		<h3>Dialer Interface (PPPoE) Configuration</h3>
		<div class="inputFlex">
			<div>
				<h6>PPPoE Username</h6>
				<input v-model="dialerUsername" />
			</div>
			<div>
				<h6>PPPoE Password</h6>
				<input v-model="dialerPassword" />
			</div>
		</div>
		<pre>
			<code>
no ip sla 1
!
no event manager applet FAILOVER
!
no event manager applet FAILBACK
!
no ip nat inside source route-map ISP1 interface GigabitEthernet0/0/0 vrf CUST overload
			</code>
		</pre>
		<pre>
        <code>
vpdn enable
!
vpdn-group 2
 request-dialin
  protocol pppoe
!
crypto isakmp profile PRIMARY-ISAKMP-PROFILE
 local-address Dialer2
!
interface Tunnel69
 tunnel source Dialer2
!
interface Tunnel99
 tunnel source Dialer2
!
interface Tunnel136
 tunnel source Dialer2
!
interface GigabitEthernet0/0/0
 no vrf forwarding
 no ip address
 no ip nat outside
 pppoe enable group global
 pppoe-client dial-pool-number 2
!
interface Dialer2
 vrf forwarding ISP1
 ip address negotiated
 ip nat outside
 encapsulation ppp
 dialer pool 2
 dialer-group 2
 ppp authentication chap pap callin
 ppp chap hostname <span>{{ dialerUsername }}</span>
 ppp chap password <span>{{ dialerPassword }}</span>
 ppp pap sent-username <span>{{ dialerUsername }}</span> password <span>{{ dialerPassword }}</span>
!
ip nat inside source route-map ISP1 interface Dialer2 vrf CUST overload
!
ip sla 1
 icmp-echo 66.232.64.82 source-interface Dialer2
 vrf ISP1
 threshold 200
 timeout 500
 frequency 1
ip sla schedule 1 life forever start-time now
!
dialer-list 2 protocol ip permit
dialer-list 2 protocol ipv6 permit
!
route-map ISP1 permit 10
 no match interface GigabitEthernet0/0/0
 match interface Dialer2
!
event manager applet FAILOVER
 event syslog pattern "TRACK-6-STATE: 1 ip sla 1 reachability Up -> Down"
 action 1.0 cli command "enable"
 action 1.1 cli command "conf t"
 action 1.2 cli command "vrf definition CUST"
 action 1.3 cli command "no route-target import 1:1"
 action 1.4 cli command "route-target import 1:2"
 action 1.5 cli command "interface Dialer2"
 action 1.6 cli command "no ip nat outside"
 action 1.7 cli command "do clear ip nat translation *"
 action 1.8 cli command "no ip nat inside source route-map ISP1 interface Dialer2 vrf CUST overload"
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
 action 1.9 cli command "interface Dialer2"
 action 2.0 cli command "ip nat outside"
 action 2.1 cli command "ip nat inside source route-map ISP1 interface Dialer2 vrf CUST overload"
 action 2.2 exit
!
        </code>
      </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const dialerUsername = 'username';
		const dialerPassword = 'password';
		const primaryIspInterface = 'GigabitEthernet0/0/0';
		const secondaryIspInterface = 'Cellular0/2/0';

		return {
			dialerUsername,
			dialerPassword,
			primaryIspInterface,
			secondaryIspInterface
		};
	}
};
</script>
