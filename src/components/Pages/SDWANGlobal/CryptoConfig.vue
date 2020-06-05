<template>
	<div>
		<h3>Crypto Configuration</h3>
		<pre>
      <code>
  <span>// Crypto PKI</span>
  crypto pki trustpoint cert-ca
    enrollment url http://67.215.44.6:80
    serial-number
    vrf PRIMARY-ISP
    revocation-check none
    rsakeypair cert-ca
    auto-enroll 90
  !
  crypto pki authenticate cert-ca
  <span>--> yes</span>
  crypto pki enroll cert-ca
  <span>yfW?BWEmvc@^9w9D</span>
  <span>oLOw8RI3rLIZ</span>
  
  <span>// Phase I Policy</span>
  crypto isakmp policy 1
    encr aes 256
    hash sha256
    group 21
  !
  <span>// ISAKMP Profiles</span>
  crypto isakmp profile PRIMARY-ISAKMP-PROFILE
    match identity address 0.0.0.0 PRIMARY-ISP
    initiate mode aggressive
    local-address GigabitEthernet0/0/0
  !
  crypto isakmp profile BACKUP-ISAKMP-PROFILE
    match identity address 0.0.0.0 BACKUP-ISP
    initiate mode aggressive
    local-address Cellular0/1/0
  !
  <span>// Phase II Transform</span>
  crypto ipsec transform-set SD-WAN-TRANSFORM esp-aes 256 esp-sha-hmac 
    mode transport
  !

  <span>// IPSec Profiles</span>
  crypto ipsec profile BACKUP-IPSEC-PROFILE
    set transform-set SD-WAN-TRANSFORM 
    set pfs group21
    set isakmp-profile BACKUP-ISAKMP-PROFILE
  !
  crypto ipsec profile PRIMARY-IPSEC-PROFILE
    set transform-set SD-WAN-TRANSFORM 
    set pfs group21
    set isakmp-profile PRIMARY-ISAKMP-PROFILE
  !
      </code>
    </pre>
	</div>
</template>
