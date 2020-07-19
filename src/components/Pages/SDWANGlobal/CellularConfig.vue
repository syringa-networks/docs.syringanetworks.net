<template>
	<div>
		<h3>Cellular Interface</h3>
		<pre>
      <code>
<span>// Cellular Profile (optional)</span>
cellular 0/1/0 lte profile create 3 ***apn***
!

<span>// Cellular Controller</span>
controller Cellular 0/1/0
  lte modem link-recovery disable 
!

<span>// Cellular Script</span>  
chat-script lte "" "AT!CALL1" TIMEOUT 20 "OK"
!

<span>// Dialer List</span>
access-list 1 permit any
dialer watch-list 1 ip 5.6.7.8 0.0.0.0
dialer watch-list 1 delay route-check initial 60
dialer watch-list 1 delay connect 1
dialer-list 1 protocol ip permit
dialer-list 1 protocol ipv6 permit
!

<span>// Cellular Interface</span>
interface Cellular 0/1/0
  description DIST to External vrf BACKUP-ISP
  vrf forwarding BACKUP-ISP
  ip address negotiated
  ip nat outside
  dialer in-band
  dialer idle-timeout 0
  dialer watch-group 1
  dialer-group 1
  ipv6 enable
  pulse-time 1
  no shutdown
!

<span>// Default Route</span>
ip route vrf BACKUP-ISP 0.0.0.0 0.0.0.0 Cellular0/1/0 20
      </code>
    </pre>
	</div>
</template>
