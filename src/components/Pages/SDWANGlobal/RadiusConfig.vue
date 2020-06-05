<template>
	<div>
		<h3>Radius Configuration</h3>
		<pre>
      <code>
  <span>// Enable AAA</span>
  aaa new-model
  !
  aaa authentication login default group radius local
  aaa authorization exec default group radius local 
  aaa authorization network default local 
  !
  aaa session-id common
  !
  interface lo0
    vrf forwarding SYG
  !
  ip radius source-interface Loopback0 vrf SYG
  !
  radius-server retry method reorder
  radius-server retransmit 1
  radius-server timeout 1
  radius-server key 7 09424F1A1A04054653
  !
  radius server RADIUS
    address ipv4 192.168.80.132 auth-port 1645 acct-port 1646
  !
      </code>
    </pre>
	</div>
</template>
