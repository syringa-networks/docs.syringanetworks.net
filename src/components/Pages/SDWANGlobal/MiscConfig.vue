<template>
	<div>
		<h3>Misc. Configuration</h3>
		<pre>
      <code>
  service timestamps debug datetime msec
  service timestamps log datetime msec
  !
  clock timezone MST -7 0
  clock summer-time MDT recurring
  !
  username trouble privilege 15 secret T01ltoil
  !
  ip ssh rsa keypair-name cert-ssh
  crypto key gen rsa label cert-ssh
  ip ssh version 2
  !
  ip forward-protocol nd
  no ip http server
  ip http authentication local
  no ip http secure-server
  !
  snmp-server community OcmeQTo2 RO ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server community S1lFLzMi RW ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server location Shanghai [31.2304, 121.4737]
  snmp-server contact noc@syringanetworks.net
  !
  ip access-list standard IPV4_MGMT_ACCESS
    permit 192.168.7.0 0.0.0.255
    permit 192.168.64.0 0.0.63.255
    permit 10.16.0.0 0.1.255.255
    permit 10.45.0.0 0.0.255.255
    permit 172.20.4.0 0.0.0.255
    permit 172.20.16.0 0.0.0.255
    permit 172.20.20.0 0.0.0.255
    permit 66.232.64.0 0.0.0.63
    permit 66.232.64.64 0.0.0.31
    permit 67.215.44.0 0.0.0.63
    deny   any
  !
  line con 0
    exec-timeout 0 0
    stopbits 1
  line aux 0
    stopbits 1
  line vty 0 4
    session-timeout 60 
    access-class IPV4_MGMT_ACCESS in vrf-also
    exec-timeout 15 0
    privilege level 15
    transport input ssh
  line vty 5 15
    session-timeout 60 
    access-class IPV4_MGMT_ACCESS in vrf-also
    exec-timeout 15 0
    privilege level 15
    transport input ssh
  !
  ntp source Loopback0
  ntp server vrf SYG 10.16.8.251
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
      </code>
    </pre>
	</div>
</template>
